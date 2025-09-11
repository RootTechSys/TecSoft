const { execSync } = require('child_process');

console.log('🔧 Verificando e implantando regras do Firestore...');

try {
  // Verificar se o Firebase CLI está instalado
  console.log('Verificando Firebase CLI...');
  execSync('firebase --version', { stdio: 'pipe' });
  console.log('✅ Firebase CLI encontrado');

  // Fazer login no Firebase (se necessário)
  console.log('Verificando autenticação...');
  try {
    execSync('firebase projects:list', { stdio: 'pipe' });
    console.log('✅ Autenticado no Firebase');
  } catch (error) {
    console.log('⚠️  Não autenticado. Execute: firebase login');
    process.exit(1);
  }

  // Implantar regras do Firestore
  console.log('Implantando regras do Firestore...');
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  console.log('✅ Regras do Firestore implantadas com sucesso!');

  // Implantar índices do Firestore
  console.log('Implantando índices do Firestore...');
  execSync('firebase deploy --only firestore:indexes', { stdio: 'inherit' });
  console.log('✅ Índices do Firestore implantados com sucesso!');

  console.log('🎉 Deploy completo! As regras agora devem permitir leitura pública.');

} catch (error) {
  console.error('❌ Erro durante o deploy:', error.message);
  console.log('\n📋 Instruções manuais:');
  console.log('1. Execute: firebase login');
  console.log('2. Execute: firebase deploy --only firestore:rules');
  console.log('3. Execute: firebase deploy --only firestore:indexes');
}
