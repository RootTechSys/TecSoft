const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmqbgBfed343gFcdXyFWbhzSv_3OoOPKg",
  authDomain: "tecsoft-7cf2d.firebaseapp.com",
  projectId: "tecsoft-7cf2d",
  storageBucket: "tecsoft-7cf2d.appspot.com",
  messagingSenderId: "671203567540",
  appId: "1:671203567540:web:tecsoft-app"
};

console.log('🔍 TESTE DE CONEXÃO FIREBASE - TECSOFT');
console.log('======================================\n');

async function testFirebaseConnection() {
  try {
    // Inicializar Firebase
    console.log('1️⃣ Inicializando Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('✅ Firebase inicializado\n');

    // Teste 1: Conexão com notícias
    console.log('2️⃣ Testando conexão com notícias...');
    const newsRef = collection(db, 'news');
    const newsSnapshot = await getDocs(newsRef);
    console.log(`✅ Notícias encontradas: ${newsSnapshot.size}`);
    
    if (newsSnapshot.size > 0) {
      newsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   📰 ${data.title} (${data.isPublished ? 'Publicada' : 'Rascunho'})`);
      });
    } else {
      console.log('   ⚠️ Nenhuma notícia encontrada no Firebase');
    }
    console.log('');

    // Teste 2: Conexão com parceiros
    console.log('3️⃣ Testando conexão com parceiros...');
    const partnersRef = collection(db, 'partners');
    const partnersSnapshot = await getDocs(partnersRef);
    console.log(`✅ Parceiros encontrados: ${partnersSnapshot.size}`);
    
    if (partnersSnapshot.size > 0) {
      partnersSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   🤝 ${data.name} (${data.isActive ? 'Ativo' : 'Inativo'})`);
      });
    } else {
      console.log('   ⚠️ Nenhum parceiro encontrado no Firebase');
    }
    console.log('');

    // Resumo
    console.log('📊 RESUMO DO TESTE');
    console.log('==================');
    console.log(`✅ Conexão: OK`);
    console.log(`📰 Notícias: ${newsSnapshot.size} itens`);
    console.log(`🤝 Parceiros: ${partnersSnapshot.size} itens`);
    console.log(`🔧 Projeto: ${firebaseConfig.projectId}`);
    
    if (newsSnapshot.size === 0 && partnersSnapshot.size === 0) {
      console.log('\n⚠️ ATENÇÃO: Nenhum dado encontrado no Firebase');
      console.log('💡 Isso pode explicar por que as seções dinâmicas não funcionam');
      console.log('🔧 Solução: Adicionar dados de teste ou verificar as regras do Firestore');
    }

  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    console.log('\n🔧 POSSÍVEIS CAUSAS:');
    console.log('1. Credenciais incorretas');
    console.log('2. Projeto não existe ou sem permissão');
    console.log('3. Regras do Firestore muito restritivas');
    console.log('4. Problema de rede');
  }
}

// Executar teste
testFirebaseConnection();