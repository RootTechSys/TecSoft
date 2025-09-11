const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmqbgBfed343gFcdXyFWbhzSv_3OoOPKg",
  authDomain: "tecsoft-7cf2d.firebaseapp.com",
  projectId: "tecsoft-7cf2d",
  storageBucket: "tecsoft-7cf2d.appspot.com",
  messagingSenderId: "671203567540",
  appId: "1:671203567540:web:tecsoft-app"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAndPopulateData() {
  try {
    console.log('🔍 Verificando dados existentes no Firestore...');

    // Verificar notícias
    const newsSnapshot = await getDocs(collection(db, 'news'));
    console.log(`📰 Notícias encontradas: ${newsSnapshot.size}`);

    // Verificar parceiros
    const partnersSnapshot = await getDocs(collection(db, 'partners'));
    console.log(`🤝 Parceiros encontrados: ${partnersSnapshot.size}`);

    if (newsSnapshot.size === 0) {
      console.log('📝 Criando notícias de exemplo...');
      await createSampleNews();
    }

    if (partnersSnapshot.size === 0) {
      console.log('🤝 Criando parceiros de exemplo...');
      await createSamplePartners();
    }

    console.log('✅ Verificação e população concluídas!');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

async function createSampleNews() {
  const sampleNews = [
    {
      title: "TECSOFT inaugura novo centro de inovação tecnológica",
      briefDescription: "O Centro de Tecnologia e Software de Brasília expande suas instalações com foco em pesquisa e desenvolvimento.",
      content: "A TECSOFT anunciou hoje a inauguração de seu novo centro de inovação tecnológica, localizado no coração de Brasília. O espaço de 2.000m² foi projetado para abrigar laboratórios de última geração, salas de reunião colaborativas e espaços de coworking para startups.\n\nO novo centro representa um investimento de R$ 5 milhões e está equipado com:\n- Laboratórios de inteligência artificial\n- Espaços para desenvolvimento de software\n- Salas de treinamento e capacitação\n- Área de networking e eventos\n\n'Esta inauguração marca um novo capítulo na história da TECSOFT', declarou o diretor executivo. 'Estamos comprometidos em promover a inovação tecnológica em Brasília e em todo o Distrito Federal.'",
      theme: "Inovação",
      coverImage: "/placeholder-news.jpg",
      authors: ["Equipe TECSOFT"],
      publicationDate: new Date(),
      isPublished: true,
      order: 1
    },
    {
      title: "Parceria estratégica com universidades locais",
      briefDescription: "TECSOFT firma acordo de cooperação com principais instituições de ensino superior de Brasília.",
      content: "A TECSOFT estabeleceu parcerias estratégicas com as principais universidades de Brasília, incluindo UnB, UCB e UDF. O acordo prevê:\n\n- Programas de estágio para estudantes\n- Projetos de pesquisa conjuntos\n- Capacitação de professores\n- Desenvolvimento de currículos atualizados\n\n'Esta parceria fortalece o ecossistema de inovação da região', destacou o coordenador de parcerias. 'Juntos, podemos formar profissionais mais preparados para o mercado de tecnologia.'",
      theme: "Educação",
      coverImage: "/placeholder-news.jpg",
      authors: ["Departamento de Parcerias"],
      publicationDate: new Date(Date.now() - 86400000), // 1 dia atrás
      isPublished: true,
      order: 2
    },
    {
      title: "Novo programa de capacitação em IA",
      briefDescription: "TECSOFT lança curso especializado em inteligência artificial para profissionais da região.",
      content: "A TECSOFT está lançando um programa inovador de capacitação em inteligência artificial. O curso, com duração de 6 meses, aborda:\n\n- Fundamentos de machine learning\n- Aplicações práticas de IA\n- Ética em inteligência artificial\n- Projetos práticos e cases reais\n\nAs inscrições estão abertas e o curso terá início em março. 'Queremos preparar Brasília para o futuro da tecnologia', afirmou o coordenador do programa.",
      theme: "Capacitação",
      coverImage: "/placeholder-news.jpg",
      authors: ["Equipe de Capacitação"],
      publicationDate: new Date(Date.now() - 172800000), // 2 dias atrás
      isPublished: true,
      order: 3
    }
  ];

  for (const news of sampleNews) {
    await addDoc(collection(db, 'news'), news);
    console.log(`✅ Notícia criada: ${news.title}`);
  }
}

async function createSamplePartners() {
  const samplePartners = [
    {
      name: "Microsoft Brasil",
      logo: "/placeholder-news.jpg",
      website: "https://microsoft.com.br",
      description: "Líder mundial em tecnologia e inovação",
      isActive: true,
      order: 1
    },
    {
      name: "Google Cloud",
      logo: "/placeholder-news.jpg",
      website: "https://cloud.google.com",
      description: "Soluções em nuvem e inteligência artificial",
      isActive: true,
      order: 2
    },
    {
      name: "Amazon Web Services",
      logo: "/placeholder-news.jpg",
      website: "https://aws.amazon.com",
      description: "Infraestrutura de nuvem líder mundial",
      isActive: true,
      order: 3
    },
    {
      name: "IBM Brasil",
      logo: "/placeholder-news.jpg",
      website: "https://ibm.com.br",
      description: "Soluções empresariais e inovação",
      isActive: true,
      order: 4
    },
    {
      name: "Oracle Brasil",
      logo: "/placeholder-news.jpg",
      website: "https://oracle.com.br",
      description: "Bancos de dados e soluções corporativas",
      isActive: true,
      order: 5
    },
    {
      name: "Salesforce Brasil",
      logo: "/placeholder-news.jpg",
      website: "https://salesforce.com.br",
      description: "CRM e soluções de vendas",
      isActive: true,
      order: 6
    }
  ];

  for (const partner of samplePartners) {
    await addDoc(collection(db, 'partners'), partner);
    console.log(`✅ Parceiro criado: ${partner.name}`);
  }
}

checkAndPopulateData();
