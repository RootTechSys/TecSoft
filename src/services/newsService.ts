import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { News, NewsFormData, NewsFilters } from '../types/news';

const COLLECTION_NAME = 'news';

export class NewsService {
  // Dados mock para teste
  static async getMockNews(): Promise<News[]> {
    return [
      {
        id: 'mock-1',
        title: 'TECSOFT lança programa de incubação para startups',
        coverImage: 'https://via.placeholder.com/400x200/8A8D55/FFFFFF?text=Startup+Incubation',
        briefDescription: 'Iniciativa visa apoiar empreendedores do setor de software em Brasília',
        content: 'Conteúdo completo da notícia sobre o programa de incubação...',
        authors: ['Equipe TECSOFT'],
        theme: 'Inovação',
        publicationDate: new Date('2024-12-15'),
        isPublished: true,
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2024-12-15')
      },
      {
        id: 'mock-2',
        title: 'Workshop gratuito sobre desenvolvimento mobile',
        coverImage: 'https://via.placeholder.com/400x200/1E3A5F/FFFFFF?text=Mobile+Workshop',
        briefDescription: 'Evento será realizado no próximo sábado com especialistas da área',
        content: 'Conteúdo completo sobre o workshop de desenvolvimento mobile...',
        authors: ['Equipe TECSOFT'],
        theme: 'Eventos',
        publicationDate: new Date('2024-12-12'),
        isPublished: true,
        createdAt: new Date('2024-12-12'),
        updatedAt: new Date('2024-12-12')
      },
      {
        id: 'mock-3',
        title: 'Parceria com universidades fortalece capacitação',
        coverImage: 'https://via.placeholder.com/400x200/E6B33D/FFFFFF?text=Academic+Partnership',
        briefDescription: 'Acordos garantem acesso a laboratórios e recursos educacionais',
        content: 'Conteúdo completo sobre as parcerias acadêmicas...',
        authors: ['Equipe TECSOFT'],
        theme: 'Parcerias',
        publicationDate: new Date('2024-12-10'),
        isPublished: true,
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-10')
      }
    ];
  }

  // Teste de conexão com Firebase
  static async testConnection(): Promise<boolean> {
    try {
      console.log('NewsService.testConnection: Testando conexão...');
      
      // Teste 1: Verificar se o app está inicializado
      console.log('Firebase app config:', { projectId: 'tecsoft-7cf2d', authDomain: 'tecsoft-7cf2d.firebaseapp.com' });
      
      // Teste 2: Tentar acessar a collection de notícias
      const newsCollection = collection(db, COLLECTION_NAME);
      console.log('Collection de notícias acessada');
      
      // Teste 3: Tentar executar uma query simples
      const startTime = Date.now();
      const querySnapshot = await getDocs(newsCollection);
      const endTime = Date.now();
      
      console.log(`Query executada em ${endTime - startTime}ms`);
      console.log(`Documentos encontrados: ${querySnapshot.size}`);
      
      // Teste 4: Verificar se consegue ler dados
      if (querySnapshot.size > 0) {
        const firstDoc = querySnapshot.docs[0];
        console.log('Primeiro documento:', firstDoc.data());
      }
      
      return true;
    } catch (error) {
      console.error('NewsService.testConnection: Erro detalhado:', error);
      
      // Verificar tipo específico de erro
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      
      return false;
    }
  }

  // Criar nova notícia
  static async createNews(newsData: NewsFormData): Promise<string> {
    try {
      console.log('NewsService.createNews: Iniciando criação...');
      console.log('Dados recebidos:', newsData);
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      // Verificar se o link da imagem foi fornecido
      if (!newsData.coverImageUrl || !newsData.coverImageUrl.trim()) {
        throw new Error('Link da imagem é obrigatório');
      }
      
      const coverImageUrl = newsData.coverImageUrl.trim();
      console.log('Usando link direto de imagem:', coverImageUrl);

      // Lógica simplificada: publicar imediatamente ou salvar como rascunho
      const now = new Date();
      
      console.log('Criando notícia:', {
        title: newsData.title,
        isPublished: newsData.isPublished,
        timestamp: now.toLocaleString('pt-BR')
      });
      
      const news: Omit<News, 'id'> = {
        title: newsData.title,
        coverImage: coverImageUrl,
        briefDescription: newsData.briefDescription,
        content: newsData.content,
        authors: newsData.authors,
        theme: newsData.theme,
        publicationDate: newsData.isPublished ? now : now, // Sempre usa data atual
        isPublished: newsData.isPublished,
        createdAt: now,
        updatedAt: now
      };

      console.log('Dados preparados para Firestore:', news);
      console.log('Tentando salvar no Firestore...');

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...news,
        publicationDate: Timestamp.fromDate(news.publicationDate),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log('Notícia criada com sucesso! ID:', docRef.id);
      console.log(`Notícia ${newsData.isPublished ? 'publicada imediatamente' : 'salva como rascunho'}`);

      return docRef.id;
    } catch (error) {
      console.error('NewsService.createNews: Erro detalhado:', error);
      
      // Verificar tipo específico de erro
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
        
        // Verificar se é erro de permissão
        if (error.message.includes('permission') || error.message.includes('rules')) {
          throw new Error('Erro de permissão: Verifique as regras de segurança do Firestore');
        }
        
        // Verificar se é erro de conexão
        if (error.message.includes('network') || error.message.includes('timeout')) {
          throw new Error('Erro de conexão: Verifique sua conexão com a internet');
        }
      }
      
      throw new Error(`Falha ao criar notícia: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  // Atualizar notícia
  static async updateNews(id: string, newsData: Partial<NewsFormData>): Promise<void> {
    try {
      console.log('NewsService.updateNews: Iniciando atualização...');
      
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      const newsRef = doc(db, COLLECTION_NAME, id);
      
      const updateData: any = {
        ...newsData,
        updatedAt: serverTimestamp()
      };

      // Atualizar imagem se link fornecido
      if (newsData.coverImageUrl && newsData.coverImageUrl.trim()) {
        updateData.coverImage = newsData.coverImageUrl.trim();
        console.log('Atualizando com link direto de imagem:', updateData.coverImage);
      }

      // Atualizar data de publicação se está sendo publicada
      if (newsData.isPublished) {
        updateData.publicationDate = Timestamp.fromDate(new Date());
      }

      console.log('Dados para atualização:', updateData);
      await updateDoc(newsRef, updateData);
      console.log('Notícia atualizada com sucesso!');
    } catch (error) {
      console.error('NewsService.updateNews: Erro detalhado:', error);
      throw new Error(`Falha ao atualizar notícia: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  // Deletar notícia
  static async deleteNews(id: string): Promise<void> {
    try {
      // Verificar se o usuário está autenticado
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }
      
      // Deletar documento (imagem é apenas link, não precisa deletar do storage)
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      console.log('Notícia deletada com sucesso!');
    } catch (error) {
      console.error('NewsService.deleteNews: Erro detalhado:', error);
      throw new Error(`Falha ao deletar notícia: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  // Buscar notícia por ID
  static async getNewsById(id: string): Promise<News | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        return {
          id: docSnap.id,
          title: data.title || '',
          coverImage: data.coverImage || '',
          briefDescription: data.briefDescription || '',
          content: data.content || '',
          authors: data.authors || [],
          theme: data.theme || 'Tecnologia',
          publicationDate: data.publicationDate?.toDate() || new Date(),
          scheduledDate: data.scheduledDate?.toDate(),
          isPublished: data.isPublished || false,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        };
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar notícia:', error);
      throw new Error('Falha ao buscar notícia');
    }
  }

  // Buscar todas as notícias com filtros
  static async getAllNews(filters: NewsFilters = { search: '', theme: 'all' }): Promise<News[]> {
    try {
      // Query otimizada - apenas o essencial
      let q: any = collection(db, COLLECTION_NAME);
      
      // Aplicar filtros se necessário
      if (filters.theme && filters.theme !== 'all') {
        q = query(q, where('theme', '==', filters.theme));
      }
      
      const querySnapshot = await getDocs(q);
      let news: News[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        news.push({
          id: doc.id,
          title: data.title || '',
          coverImage: data.coverImage || '',
          briefDescription: data.briefDescription || '',
          content: data.content || '',
          authors: data.authors || [],
          theme: data.theme || 'Tecnologia',
          publicationDate: data.publicationDate?.toDate() || new Date(),
          scheduledDate: data.scheduledDate?.toDate(),
          isPublished: data.isPublished || false,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        });
      });

      // Ordenar localmente para performance
      news.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());

      // Filtrar por texto se necessário
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        news = news.filter(item => 
          item.title.toLowerCase().includes(searchLower) ||
          item.authors.some(author => author.toLowerCase().includes(searchLower)) ||
          item.briefDescription.toLowerCase().includes(searchLower)
        );
      }

      return news;
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      throw error; // Re-throw para o fallback funcionar
    }
  }

  // Buscar notícias mais recentes (para home)
  static async getLatestNews(limitCount: number = 3): Promise<News[]> {
    try {
      console.log('NewsService.getLatestNews: Iniciando busca...');
      console.log('Collection:', COLLECTION_NAME);
      console.log('Limit:', limitCount);
      
      // Primeiro, tentar query simples para debug
      console.log('Tentando query simples primeiro...');
      let q: any = collection(db, COLLECTION_NAME);
      let simpleQuerySnapshot = await getDocs(q);
      console.log('Query simples executada, total de documentos:', simpleQuerySnapshot.size);
      
      // Se não há documentos, retornar array vazio
      if (simpleQuerySnapshot.size === 0) {
        console.log('Nenhum documento encontrado na collection');
        return [];
      }
      
      // Mostrar todos os documentos para debug
      simpleQuerySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        console.log('Documento completo:', doc.id, {
          title: data.title,
          isPublished: data.isPublished,
          publicationDate: data.publicationDate,
          theme: data.theme
        });
      });
      
      // Se a query complexa falhar, usar a simples e filtrar localmente
      try {
        console.log('Tentando query com filtros...');
        q = query(
          collection(db, COLLECTION_NAME),
          where('isPublished', '==', true),
          orderBy('publicationDate', 'desc'),
          limit(limitCount)
        );
        
        console.log('Query criada, executando...');
        const querySnapshot = await getDocs(q);
        console.log('Query executada, documentos encontrados:', querySnapshot.size);
        
        const news: News[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as any;
          console.log('Documento filtrado:', doc.id, data);
          news.push({
            id: doc.id,
            title: data.title || '',
            coverImage: data.coverImage || '',
            briefDescription: data.briefDescription || '',
            content: data.content || '',
            authors: data.authors || [],
            theme: data.theme || 'Tecnologia',
            publicationDate: data.publicationDate?.toDate() || new Date(),
            scheduledDate: data.scheduledDate?.toDate(),
            isPublished: data.isPublished || false,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          });
        });

        console.log('Notícias processadas:', news);
        return news;
        
      } catch (queryError) {
        console.log('Query complexa falhou, usando fallback local:', queryError);
        
        // Fallback: filtrar localmente
        const allNews: News[] = [];
        simpleQuerySnapshot.forEach((doc) => {
          const data = doc.data() as any;
          allNews.push({
            id: doc.id,
            title: data.title || '',
            coverImage: data.coverImage || '',
            briefDescription: data.briefDescription || '',
            content: data.content || '',
            authors: data.authors || [],
            theme: data.theme || 'Tecnologia',
            publicationDate: data.publicationDate?.toDate() || new Date(),
            scheduledDate: data.scheduledDate?.toDate(),
            isPublished: data.isPublished || false,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          });
        });
        
        // Filtrar e ordenar localmente
        const publishedNews = allNews
          .filter(news => news.isPublished)
          .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
          .slice(0, limitCount);
        
        console.log('Notícias processadas com fallback:', publishedNews);
        return publishedNews;
      }
      
    } catch (error) {
      console.error('NewsService.getLatestNews: Erro detalhado:', error);
      
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
        
        // Verificar se é erro de permissão
        if (error.message.includes('permission') || error.message.includes('rules')) {
          throw new Error('Erro de permissão: Verifique as regras de segurança do Firestore');
        }
        
        // Verificar se é erro de conexão
        if (error.message.includes('network') || error.message.includes('timeout')) {
          throw new Error('Erro de conexão: Verifique sua conexão com a internet');
        }
      }
      
      throw new Error(`Falha ao buscar notícias recentes: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
}
