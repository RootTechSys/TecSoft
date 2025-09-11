const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, doc, setDoc } = require('firebase/firestore');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmqbgBfed343gFcdXyFWbhzSv_3OoOPKg",
  authDomain: "tecsoft-7cf2d.firebaseapp.com",
  projectId: "tecsoft-7cf2d",
  storageBucket: "tecsoft-7cf2d.appspot.com",
  messagingSenderId: "671203567540",
  appId: "1:671203567540:web:tecsoft-app"
};

console.log('🔧 Testando conexão com Firebase...');
console.log('Project ID:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  try {
    console.log('📡 Testando leitura...');
    
    // Tentar ler uma collection que sabemos que existe
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Leitura bem-sucedida! Documentos encontrados:', snapshot.size);
    
    // Tentar escrever um documento de teste
    console.log('📝 Testando escrita...');
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Teste de conexão',
      timestamp: new Date()
    });
    console.log('✅ Escrita bem-sucedida! ID do documento:', testDoc.id);
    
    // Tentar ler o documento que acabamos de criar
    console.log('🔍 Testando leitura do documento criado...');
    const newSnapshot = await getDocs(testCollection);
    console.log('✅ Leitura pós-escrita bem-sucedida! Documentos encontrados:', newSnapshot.size);
    
    console.log('🎉 Todos os testes passaram! O Firebase está funcionando corretamente.');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    console.error('Código do erro:', error.code);
    console.error('Mensagem:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔧 Possíveis soluções:');
      console.log('1. Verificar se as regras do Firestore foram implantadas corretamente');
      console.log('2. Verificar se o projeto Firebase está ativo');
      console.log('3. Verificar se a configuração do projeto está correta');
      console.log('4. Aguardar alguns minutos para as regras entrarem em vigor');
    }
  }
}

testConnection();
