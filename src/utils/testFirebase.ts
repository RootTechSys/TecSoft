import { NewsService } from '../services/newsService';
import { PartnerService } from '../services/partnerService';

export const testFirebaseConnection = async () => {
  console.log('🔍 Testando conexão com Firebase...');
  
  try {
    // Teste 1: Conexão com notícias
    console.log('📰 Testando carregamento de notícias...');
    const news = await NewsService.getLatestNews(3);
    console.log('✅ Notícias carregadas:', news.length, 'itens');
    
    // Teste 2: Conexão com parceiros
    console.log('🤝 Testando carregamento de parceiros...');
    const partners = await PartnerService.getAllPartners();
    console.log('✅ Parceiros carregados:', partners.length, 'itens');
    
    // Teste 3: Verificar se há dados reais do Firebase
    const hasRealNews = news.some(item => !item.id.startsWith('mock-'));
    const hasRealPartners = partners.some(item => !item.id.startsWith('mock-'));
    
    console.log('📊 Resultados:');
    console.log('- Notícias do Firebase:', hasRealNews ? '✅ Sim' : '❌ Não (usando dados mock)');
    console.log('- Parceiros do Firebase:', hasRealPartners ? '✅ Sim' : '❌ Não (usando dados mock)');
    
    return {
      success: true,
      newsCount: news.length,
      partnersCount: partners.length,
      hasRealNews,
      hasRealPartners
    };
    
  } catch (error) {
    console.error('❌ Erro no teste de conexão:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};

// Função para adicionar dados de teste ao Firebase
export const addTestDataToFirebase = async () => {
  console.log('🧪 Adicionando dados de teste ao Firebase...');
  
  try {
    // Adicionar notícia de teste
    const testNews = {
      title: 'TECSOFT - Teste de Conexão Firebase',
      coverImageUrl: '/placeholder-news.jpg',
      briefDescription: 'Esta é uma notícia de teste para verificar a conexão com o Firebase',
      content: 'Conteúdo completo da notícia de teste...',
      authors: ['Sistema TECSOFT'],
      theme: 'Tecnologia' as const,
      isPublished: true
    };
    
    const newsId = await NewsService.createNews(testNews);
    console.log('✅ Notícia de teste criada:', newsId);
    
    // Adicionar parceiro de teste
    const testPartner = {
      name: 'TECSOFT - Parceiro Teste',
      logoUrl: '/placeholder-news.svg',
      websiteUrl: 'https://www.tecsoft.org.br',
      order: 999,
      isActive: true
    };
    
    const partnerId = await PartnerService.createPartner(testPartner);
    console.log('✅ Parceiro de teste criado:', partnerId);
    
    return {
      success: true,
      newsId,
      partnerId
    };
    
  } catch (error) {
    console.error('❌ Erro ao adicionar dados de teste:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};
