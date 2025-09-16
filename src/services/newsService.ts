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
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { News, NewsFormData, NewsFilters } from '../types/news';

const COLLECTION_NAME = 'news';

export class NewsService {

  // Teste de conexão com Firebase
  static async testConnection(): Promise<boolean> {
    try {
      console.log('NewsService.testConnection: Testando conexão...');
      console.log('Environment:', process.env.NODE_ENV);
      console.log('User Agent:', navigator.userAgent);
      
      // Teste 1: Verificar se o app está inicializado
      console.log('Firebase app config:', { projectId: 'tecsoft-7cf2d', authDomain: 'tecsoft-7cf2d.firebaseapp.com' });
      
      // Teste 2: Tentar acessar a collection de notícias
      const newsCollection = collection(db, COLLECTION_NAME);
      console.log('Collection de notícias acessada');
      
      // Teste 3: Tentar executar uma query simples com timeout
      const startTime = Date.now();
      
      // Criar uma Promise com timeout para produção
      const queryPromise = getDocs(newsCollection);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Query demorou mais de 10 segundos')), 10000)
      );
      
      const querySnapshot = await Promise.race([queryPromise, timeoutPromise]) as any;
      const endTime = Date.now();
      
      console.log(`Query executada em ${endTime - startTime}ms`);
      console.log(`Documentos encontrados: ${querySnapshot.size}`);
      
      // Teste 4: Verificar se consegue ler dados
      if (querySnapshot.size > 0) {
        const firstDoc = querySnapshot.docs[0];
        console.log('Primeiro documento:', firstDoc.data());
      }
      
      console.log('NewsService.testConnection: Conexão bem-sucedida!');
      return true;
    } catch (error) {
      console.error('NewsService.testConnection: Erro detalhado:', error);
      
      // Verificar tipo específico de erro
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
        
        // Logs específicos para diferentes tipos de erro
        if (error.message.includes('permission')) {
          console.error('ERRO DE PERMISSÃO: Verifique as regras do Firestore');
        } else if (error.message.includes('network')) {
          console.error('ERRO DE REDE: Verifique a conexão com a internet');
        } else if (error.message.includes('timeout')) {
          console.error('ERRO DE TIMEOUT: Firebase demorou para responder');
        } else if (error.message.includes('cors')) {
          console.error('ERRO DE CORS: Problema de configuração de domínio');
        }
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
      console.log('NewsService.getAllNews: Tentando conectar ao Firebase...');
      
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

      console.log(`NewsService.getAllNews: ${news.length} notícias encontradas no Firebase`);
      
      // Debug: mostrar status das notícias
      const publishedCount = news.filter(n => n.isPublished).length;
      const draftCount = news.length - publishedCount;
      console.log(`NewsService.getAllNews: ${publishedCount} publicadas, ${draftCount} em rascunho`);

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
      console.error('NewsService.getAllNews: Erro ao conectar com Firebase:', error);
      
      // Verificar tipo específico de erro
      if (error instanceof Error) {
        if (error.message.includes('permission') || error.message.includes('rules')) {
          console.log('🚨 ERRO DE PERMISSÃO: Verifique as regras do Firestore');
          console.log('💡 Solução: Verifique as regras do Firestore no Firebase Console');
        } else if (error.message.includes('network') || error.message.includes('timeout')) {
          console.log('🌐 ERRO DE REDE: Verifique sua conexão com a internet');
        } else {
          console.log('❌ ERRO DESCONHECIDO:', error.message);
        }
      }
      
      // Em caso de erro, retornar array vazio
      console.log('NewsService.getAllNews: Retornando array vazio devido ao erro de conexão');
      return [];
    }
  }

  // Método de debug para mostrar todas as notícias (incluindo rascunhos)
  static async getAllNewsForDebug(limitCount: number = 3): Promise<News[]> {
    try {
      console.log('NewsService.getAllNewsForDebug: Buscando TODAS as notícias (incluindo rascunhos)...');
      
      const newsCollection = collection(db, COLLECTION_NAME);
      const querySnapshot = await getDocs(newsCollection);
      
      if (querySnapshot.size === 0) {
        console.log('Nenhum documento encontrado');
        return [];
      }
      
      const allNews: News[] = [];
      querySnapshot.forEach((doc) => {
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
      
      // Ordenar por data e retornar todas (sem filtrar por isPublished)
      const sortedNews = allNews
        .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
        .slice(0, limitCount);
      
      console.log(`NewsService.getAllNewsForDebug: Retornando ${sortedNews.length} notícias (incluindo rascunhos)`);
      return sortedNews;
      
    } catch (error) {
      console.error('NewsService.getAllNewsForDebug: Erro:', error);
      return [];
    }
  }

  // Buscar notícias mais recentes (para home)
  static async getLatestNews(limitCount: number = 3): Promise<News[]> {
    try {
      console.log('NewsService.getLatestNews: Iniciando busca...');
      console.log('Collection:', COLLECTION_NAME);
      console.log('Limit:', limitCount);
      
      // Buscar dados do Firebase
      const newsCollection = collection(db, COLLECTION_NAME);
      const querySnapshot = await getDocs(newsCollection);
      console.log('Query executada, total de documentos:', querySnapshot.size);
      
      // Se não há documentos, retornar array vazio
      if (querySnapshot.size === 0) {
        console.log('🚨 AVISO: Nenhum documento encontrado na collection "news"');
        console.log('💡 SOLUÇÃO: Crie notícias no painel admin (/admin)');
        return [];
      }
      
      // Processar documentos do Firebase
      const allNews: News[] = [];
      querySnapshot.forEach((doc) => {
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
      
      // Debug: mostrar todas as notícias encontradas
      console.log('NewsService.getLatestNews: Todas as notícias encontradas:');
      allNews.forEach((news, index) => {
        console.log(`  ${index + 1}. ID: ${news.id}`);
        console.log(`     Título: ${news.title}`);
        console.log(`     Publicada: ${news.isPublished ? 'SIM' : 'NÃO'}`);
        console.log(`     Tema: ${news.theme}`);
        console.log('');
      });
      
      // Filtrar apenas notícias publicadas e ordenar por data
      const publishedNews = allNews
        .filter(news => news.isPublished)
        .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
        .slice(0, limitCount);
      
      console.log(`NewsService.getLatestNews: ${publishedNews.length} notícias publicadas encontradas`);
      console.log(`NewsService.getLatestNews: ${allNews.length - publishedNews.length} notícias em rascunho (não exibidas no site público)`);
      
      return publishedNews;
      
    } catch (error) {
      console.error('NewsService.getLatestNews: Erro ao conectar com Firebase:', error);
      
      // Verificar tipo específico de erro
      if (error instanceof Error) {
        if (error.message.includes('permission') || error.message.includes('rules')) {
          console.log('🚨 ERRO DE PERMISSÃO: Verifique as regras do Firestore');
          console.log('💡 Solução: Verifique as regras do Firestore no Firebase Console');
        } else if (error.message.includes('network') || error.message.includes('timeout')) {
          console.log('🌐 ERRO DE REDE: Verifique sua conexão com a internet');
        } else {
          console.log('❌ ERRO DESCONHECIDO:', error.message);
        }
      }
      
      // Em caso de erro, retornar array vazio
      console.log('📰 Retornando array vazio devido ao erro de conexão');
      return [];
    }
  }
}
