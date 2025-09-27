import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';

const COLLECTION_NAME = 'documents';

export interface Document {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  category: string;
  uploadedAt: Date;
  uploadedBy: string;
  downloads: number;
}

export interface DocumentFormData {
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  category: string;
}

export class DocumentService {
  
  static async getAllDocuments(): Promise<Document[]> {
    try {
      
      const documentsRef = collection(db, COLLECTION_NAME);
      const querySnapshot = await getDocs(documentsRef);
      
      
      if (querySnapshot.size === 0) {
        return [];
      }
      
      const documents: Document[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        documents.push({
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          fileName: data.fileName || '',
          fileUrl: data.fileUrl || '',
          fileSize: data.fileSize || 0,
          category: data.category || 'Geral',
          uploadedAt: data.uploadedAt?.toDate() || new Date(),
          uploadedBy: data.uploadedBy || '',
          downloads: data.downloads || 0
        });
      });

      return documents;
    } catch (error) {
      return [];
    }
  }

  static async createDocument(documentData: DocumentFormData): Promise<string> {
    try {
      
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }

      if (!documentData.title.trim()) {
        throw new Error('Título do documento é obrigatório');
      }
      
      if (!documentData.fileUrl.trim()) {
        throw new Error('URL do arquivo é obrigatória');
      }

      const document: Omit<Document, 'id'> = {
        title: documentData.title.trim(),
        description: documentData.description?.trim() || '',
        fileName: documentData.fileName.trim(),
        fileUrl: documentData.fileUrl.trim(),
        fileSize: documentData.fileSize || 0,
        category: documentData.category || 'Geral',
        uploadedAt: new Date(),
        uploadedBy: auth.currentUser.email || 'admin',
        downloads: 0
      };


      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...document,
        uploadedAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      throw new Error(`Falha ao criar documento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async updateDocument(id: string, documentData: Partial<DocumentFormData>): Promise<void> {
    try {
      
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      const documentRef = doc(db, COLLECTION_NAME, id);
      
      const updateData: any = {
        ...documentData,
        updatedAt: serverTimestamp()
      };

      if (updateData.title) updateData.title = updateData.title.trim();
      if (updateData.description) updateData.description = updateData.description.trim();
      if (updateData.fileName) updateData.fileName = updateData.fileName.trim();
      if (updateData.fileUrl) updateData.fileUrl = updateData.fileUrl.trim();

      await updateDoc(documentRef, updateData);
    } catch (error) {
      throw new Error(`Falha ao atualizar documento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static async deleteDocument(id: string): Promise<void> {
    try {
      
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      throw new Error(`Falha ao deletar documento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
}
