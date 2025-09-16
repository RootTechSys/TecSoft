import { NewsService } from '../services/newsService';
import { PartnerService } from '../services/partnerService';
import { NewsFormData, NewsTheme } from '../types/news';

// Dados de exemplo para popular o Firebase
const sampleNews: NewsFormData[] = [
  {
    title: 'TECSOFT lança programa de incubação para startups',
    coverImageUrl: 'https://via.placeholder.com/400x200/8A8D55/FFFFFF?text=Startup+Incubation',
    briefDescription: 'Iniciativa visa apoiar empreendedores do setor de software em Brasília',
    content: 'A TECSOFT está lançando um programa de incubação para startups de tecnologia em Brasília. O programa oferece mentoria, recursos técnicos e apoio para o desenvolvimento de soluções inovadoras.',
    authors: ['Equipe TECSOFT'],
    theme: 'Inovação' as NewsTheme,
    isPublished: true
  },
  {
    title: 'Workshop gratuito sobre desenvolvimento mobile',
    coverImageUrl: 'https://via.placeholder.com/400x200/1E3A5F/FFFFFF?text=Mobile+Workshop',
    briefDescription: 'Evento será realizado no próximo sábado com especialistas da área',
    content: 'Workshop prático sobre desenvolvimento mobile com React Native e Flutter. Inclui hands-on e networking com profissionais da área.',
    authors: ['Equipe TECSOFT'],
    theme: 'Eventos' as NewsTheme,
    isPublished: true
  },
  {
    title: 'Parceria com universidades fortalece capacitação',
    coverImageUrl: 'https://via.placeholder.com/400x200/E6B33D/FFFFFF?text=Academic+Partnership',
    briefDescription: 'Acordos garantem acesso a laboratórios e recursos educacionais',
    content: 'Nova parceria com universidades locais para oferecer cursos e capacitação em tecnologia, incluindo acesso a laboratórios e recursos educacionais.',
    authors: ['Equipe TECSOFT'],
    theme: 'Parcerias' as NewsTheme,
    isPublished: true
  }
];

const samplePartners = [
  {
    name: 'Universidade de Brasília',
    logoUrl: 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=UnB',
    websiteUrl: 'https://www.unb.br',
    order: 1,
    isActive: true
  },
  {
    name: 'SEBRAE-DF',
    logoUrl: 'https://via.placeholder.com/150x80/059669/FFFFFF?text=SEBRAE',
    websiteUrl: 'https://www.sebrae.com.br',
    order: 2,
    isActive: true
  },
  {
    name: 'SENAI-DF',
    logoUrl: 'https://via.placeholder.com/150x80/DC2626/FFFFFF?text=SENAI',
    websiteUrl: 'https://www.senai.org.br',
    order: 3,
    isActive: true
  },
  {
    name: 'Prefeitura de Brasília',
    logoUrl: 'https://via.placeholder.com/150x80/7C3AED/FFFFFF?text=PREFEITURA',
    websiteUrl: 'https://www.brasilia.df.gov.br',
    order: 4,
    isActive: true
  },
  {
    name: 'Governo do Distrito Federal',
    logoUrl: 'https://via.placeholder.com/150x80/EA580C/FFFFFF?text=GDF',
    websiteUrl: 'https://www.df.gov.br',
    order: 5,
    isActive: true
  }
];

export const populateFirebase = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🚀 Iniciando população do Firebase com dados de exemplo...');
    
    // Verificar se já existem dados
    const existingNews = await NewsService.getLatestNews(1);
    const existingPartners = await PartnerService.getActivePartners();
    
    if (existingNews.length > 0 && existingPartners.length > 0) {
      return {
        success: true,
        message: '✅ Firebase já possui dados. Não é necessário popular.'
      };
    }
    
    let newsCreated = 0;
    let partnersCreated = 0;
    
    // Criar notícias se não existirem
    if (existingNews.length === 0) {
      console.log('📰 Criando notícias de exemplo...');
      for (const newsData of sampleNews) {
        try {
          await NewsService.createNews(newsData);
          newsCreated++;
          console.log(`✅ Notícia criada: ${newsData.title}`);
        } catch (error) {
          console.error(`❌ Erro ao criar notícia: ${newsData.title}`, error);
        }
      }
    }
    
    // Criar parceiros se não existirem
    if (existingPartners.length === 0) {
      console.log('🤝 Criando parceiros de exemplo...');
      for (const partnerData of samplePartners) {
        try {
          await PartnerService.createPartner(partnerData);
          partnersCreated++;
          console.log(`✅ Parceiro criado: ${partnerData.name}`);
        } catch (error) {
          console.error(`❌ Erro ao criar parceiro: ${partnerData.name}`, error);
        }
      }
    }
    
    const message = `✅ População concluída! ${newsCreated} notícias e ${partnersCreated} parceiros criados.`;
    console.log(message);
    
    return {
      success: true,
      message
    };
    
  } catch (error) {
    const errorMessage = `❌ Erro ao popular Firebase: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
    console.error(errorMessage);
    return {
      success: false,
      message: errorMessage
    };
  }
};
