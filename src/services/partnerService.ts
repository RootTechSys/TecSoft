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
import { Partner, PartnerFormData, PartnerFilters } from '../types/partner';

const COLLECTION_NAME = 'partners';

export class PartnerService {
  // Dados mock para teste
  private static mockPartners: Partner[] = [
    {
      id: '1',
      name: 'Universidade de Brasília',
      logoUrl: 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=UnB',
      websiteUrl: 'https://www.unb.br',
      order: 1,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'SEBRAE-DF',
      logoUrl: 'https://via.placeholder.com/150x80/059669/FFFFFF?text=SEBRAE',
      websiteUrl: 'https://www.sebrae.com.br',
      order: 2,
      isActive: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: '3',
      name: 'SENAI-DF',
      logoUrl: 'https://via.placeholder.com/150x80/DC2626/FFFFFF?text=SENAI',
      websiteUrl: 'https://www.senai.org.br',
      order: 3,
      isActive: true,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    },
    {
      id: '4',
      name: 'Prefeitura de Brasília',
      logoUrl: 'https://via.placeholder.com/150x80/7C3AED/FFFFFF?text=PREFEITURA',
      websiteUrl: 'https://www.brasilia.df.gov.br',
      order: 4,
      isActive: true,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    },
    {
      id: '5',
      name: 'Governo do Distrito Federal',
      logoUrl: 'https://via.placeholder.com/150x80/EA580C/FFFFFF?text=GDF',
      websiteUrl: 'https://www.df.gov.br',
      order: 5,
      isActive: true,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '6',
      name: 'Associação Brasileira de Software',
      logoUrl: 'https://via.placeholder.com/150x80/0891B2/FFFFFF?text=ABES',
      websiteUrl: 'https://www.abes.org.br',
      order: 6,
      isActive: true,
      createdAt: new Date('2024-01-06'),
      updatedAt: new Date('2024-01-06')
    }
  ];

  static async getAllPartners(): Promise<Partner[]> {
    try {
      console.log('PartnerService.getAllPartners: Iniciando busca de parceiros...');
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        console.log('PartnerService.getAllPartners: Usuário não autenticado, retornando dados mock');
        return this.mockPartners;
      }

      const partnersRef = collection(db, COLLECTION_NAME);
      const q = query(partnersRef, orderBy('order', 'asc'));
      
      console.log('PartnerService.getAllPartners: Executando query no Firestore...');
      const querySnapshot = await getDocs(q);
      
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

      console.log(`PartnerService.getAllPartners: ${partners.length} parceiros encontrados`);
      console.log('Ordens dos parceiros:', partners.map(p => ({ name: p.name, order: p.order })));
      
      // Verificar se há conflitos de ordem
      const orders = partners.map(p => p.order);
      const uniqueOrders = Array.from(new Set(orders));
      if (orders.length !== uniqueOrders.length) {
        console.warn('Conflitos de ordem detectados! Corrigindo automaticamente...');
        await this.fixOrderConflicts(partners);
        // Recarregar após correção
        return this.getAllPartners();
      }
      
      return partners;
    } catch (error) {
      console.error('PartnerService.getAllPartners: Erro ao buscar parceiros:', error);
      console.log('PartnerService.getAllPartners: Retornando dados mock devido ao erro');
      return this.mockPartners;
    }
  }

  static async fixOrderConflicts(partners: Partner[]): Promise<void> {
    try {
      console.log('Corrigindo conflitos de ordem...');
      
      // Ordenar por ordem atual e reatribuir ordens sequenciais
      const sortedPartners = [...partners].sort((a, b) => a.order - b.order);
      
      const updates = sortedPartners.map((partner, index) => ({
        id: partner.id,
        order: index + 1
      }));
      
      console.log('Novas ordens:', updates);
      
      for (const { id, order } of updates) {
        await updateDoc(doc(db, COLLECTION_NAME, id), {
          order,
          updatedAt: serverTimestamp()
        });
      }
      
      console.log('Conflitos de ordem corrigidos!');
    } catch (error) {
      console.error('Erro ao corrigir conflitos de ordem:', error);
    }
  }

  static async getActivePartners(): Promise<Partner[]> {
    try {
      console.log('PartnerService.getActivePartners: Buscando parceiros ativos...');
      
      const allPartners = await this.getAllPartners();
      const activePartners = allPartners.filter(partner => partner.isActive);
      
      console.log(`PartnerService.getActivePartners: ${activePartners.length} parceiros ativos encontrados`);
      return activePartners;
    } catch (error) {
      console.error('PartnerService.getActivePartners: Erro ao buscar parceiros ativos:', error);
      return this.mockPartners.filter(partner => partner.isActive);
    }
  }

  static async getNextOrder(): Promise<number> {
    try {
      const allPartners = await this.getAllPartners();
      const maxOrder = allPartners.reduce((max, partner) => Math.max(max, partner.order), 0);
      return maxOrder + 1;
    } catch (error) {
      console.error('PartnerService.getNextOrder: Erro ao obter próxima ordem:', error);
      return 1;
    }
  }

  static async createPartner(partnerData: PartnerFormData): Promise<string> {
    try {
      console.log('PartnerService.createPartner: Iniciando criação de parceiro...', partnerData);
      
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
        console.log(`Ordem automática definida: ${finalOrder}`);
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

      console.log('PartnerService.createPartner: Dados preparados para Firestore:', partner);

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...partner,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log('PartnerService.createPartner: Parceiro criado com sucesso! ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('PartnerService.createPartner: Erro detalhado:', error);
      throw new Error(`Falha ao criar parceiro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async updatePartner(id: string, partnerData: Partial<PartnerFormData>): Promise<void> {
    try {
      console.log('PartnerService.updatePartner: Iniciando atualização de parceiro...', { id, partnerData });
      
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

      console.log('PartnerService.updatePartner: Dados para atualização:', updateData);
      await updateDoc(partnerRef, updateData);
      console.log('PartnerService.updatePartner: Parceiro atualizado com sucesso!');
    } catch (error) {
      console.error('PartnerService.updatePartner: Erro detalhado:', error);
      throw new Error(`Falha ao atualizar parceiro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async deletePartner(id: string): Promise<void> {
    try {
      console.log('PartnerService.deletePartner: Iniciando exclusão de parceiro...', { id });
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      console.log('PartnerService.deletePartner: Parceiro deletado com sucesso!');
    } catch (error) {
      console.error('PartnerService.deletePartner: Erro detalhado:', error);
      throw new Error(`Falha ao deletar parceiro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async reorderPartners(partners: { id: string; order: number }[]): Promise<void> {
    try {
      console.log('PartnerService.reorderPartners: Iniciando reordenação de parceiros...', partners);
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }

      // Atualizar cada parceiro individualmente para garantir que todas as atualizações sejam aplicadas
      for (const { id, order } of partners) {
        console.log(`Atualizando parceiro ${id} para ordem ${order}`);
        
        const partnerRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(partnerRef, {
          order: order,
          updatedAt: serverTimestamp()
        });
        
        console.log(`Parceiro ${id} atualizado com sucesso para ordem ${order}`);
      }

      console.log('PartnerService.reorderPartners: Todos os parceiros reordenados com sucesso!');
    } catch (error) {
      console.error('PartnerService.reorderPartners: Erro detalhado:', error);
      throw new Error(`Falha ao reordenar parceiros: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
}

export const partnerService = new PartnerService();
