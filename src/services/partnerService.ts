import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { Partner, PartnerFormData } from '../types/partner';

const COLLECTION_NAME = 'partners';

export class PartnerService {

  static async getAllPartners(): Promise<Partner[]> {
    try {
      
      const partnersRef = collection(db, COLLECTION_NAME);
      const q = query(partnersRef, orderBy('order', 'asc'));
      
      const querySnapshot = await getDocs(q);
      
      
      // Se não há documentos, retornar array vazio
      if (querySnapshot.size === 0) {
        return [];
      }
      
      const partners: Partner[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        partners.push({
          id: doc.id,
          name: data.name,
          logoUrl: data.logoUrl,
          websiteUrl: data.websiteUrl || '',
          order: data.order || 0,
          isActive: data.isActive !== undefined ? data.isActive : true,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        });
      });

      
      // Verificar se há conflitos de ordem
      const orders = partners.map(p => p.order);
      const uniqueOrders = Array.from(new Set(orders));
      if (orders.length !== uniqueOrders.length) {
        await this.fixOrderConflicts(partners);
        // Recarregar após correção
        return this.getAllPartners();
      }
      
      return partners;
    } catch (error) {
      return [];
    }
  }

  static async fixOrderConflicts(partners: Partner[]): Promise<void> {
    try {
      
      // Ordenar por ordem atual e reatribuir ordens sequenciais
      const sortedPartners = [...partners].sort((a, b) => a.order - b.order);
      
      const updates = sortedPartners.map((partner, index) => ({
        id: partner.id,
        order: index + 1
      }));
      
      
      for (const { id, order } of updates) {
        await updateDoc(doc(db, COLLECTION_NAME, id), {
          order,
          updatedAt: serverTimestamp()
        });
      }
      
    } catch (error) {
    }
  }

  static async getActivePartners(): Promise<Partner[]> {
    try {
      
      const allPartners = await this.getAllPartners();
      const activePartners = allPartners.filter(partner => partner.isActive);
      
      return activePartners;
    } catch (error) {
      return [];
    }
  }

  static async getNextOrder(): Promise<number> {
    try {
      const allPartners = await this.getAllPartners();
      const maxOrder = allPartners.reduce((max, partner) => Math.max(max, partner.order), 0);
      return maxOrder + 1;
    } catch (error) {
      return 1;
    }
  }

  static async createPartner(partnerData: PartnerFormData): Promise<string> {
    try {
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }

      // Validar dados obrigatórios
      if (!partnerData.name.trim()) {
        throw new Error('Nome do parceiro é obrigatório');
      }
      
      if (!partnerData.logoUrl.trim()) {
        throw new Error('URL da logo é obrigatória');
      }

      // Se a ordem for 0 ou não especificada, buscar a próxima ordem disponível
      let finalOrder = partnerData.order;
      if (finalOrder <= 0) {
        const allPartners = await this.getAllPartners();
        const maxOrder = allPartners.reduce((max, partner) => Math.max(max, partner.order), 0);
        finalOrder = maxOrder + 1;
      }

      const partner: Omit<Partner, 'id'> = {
        name: partnerData.name.trim(),
        logoUrl: partnerData.logoUrl.trim(),
        websiteUrl: partnerData.websiteUrl?.trim() || '',
        order: finalOrder,
        isActive: partnerData.isActive,
        createdAt: new Date(),
        updatedAt: new Date()
      };


      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...partner,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      throw new Error(`Falha ao criar parceiro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async updatePartner(id: string, partnerData: Partial<PartnerFormData>): Promise<void> {
    try {
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      const partnerRef = doc(db, COLLECTION_NAME, id);
      
      const updateData: any = {
        ...partnerData,
        updatedAt: serverTimestamp()
      };

      // Limpar campos vazios
      if (updateData.name) updateData.name = updateData.name.trim();
      if (updateData.logoUrl) updateData.logoUrl = updateData.logoUrl.trim();
      if (updateData.websiteUrl) updateData.websiteUrl = updateData.websiteUrl.trim();

      await updateDoc(partnerRef, updateData);
    } catch (error) {
      throw new Error(`Falha ao atualizar parceiro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async deletePartner(id: string): Promise<void> {
    try {
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      throw new Error(`Falha ao deletar parceiro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async reorderPartners(partners: { id: string; order: number }[]): Promise<void> {
    try {
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }

      // Atualizar cada parceiro individualmente para garantir que todas as atualizações sejam aplicadas
      for (const { id, order } of partners) {
        
        const partnerRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(partnerRef, {
          order: order,
          updatedAt: serverTimestamp()
        });
        
      }

    } catch (error) {
      throw new Error(`Falha ao reordenar parceiros: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
}

export const partnerService = new PartnerService();
