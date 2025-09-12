const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 DEPLOY DAS REGRAS DO FIRESTORE - TECSOFT');
console.log('============================================\n');

try {
  // Verificar se o Firebase CLI está instalado
  console.log('1️⃣ Verificando Firebase CLI...');
  execSync('firebase --version', { stdio: 'pipe' });
  console.log('✅ Firebase CLI encontrado\n');

  // Verificar se estamos no projeto correto
  console.log('2️⃣ Verificando projeto ativo...');
  const projectInfo = execSync('firebase use', { encoding: 'utf8' });
  console.log('📋 Projeto ativo:', projectInfo.trim());
  
  if (!projectInfo.includes('tecsoft-7cf2d')) {
    console.log('⚠️ ATENÇÃO: Projeto não é tecsoft-7cf2d');
    console.log('💡 Execute: firebase use tecsoft-7cf2d');
    process.exit(1);
  }
  console.log('✅ Projeto correto\n');

  // Verificar se as regras existem
  console.log('3️⃣ Verificando arquivo de regras...');
  if (!fs.existsSync('firestore.rules')) {
    console.log('❌ Arquivo firestore.rules não encontrado');
    process.exit(1);
  }
  console.log('✅ Arquivo firestore.rules encontrado\n');

  // Fazer deploy das regras
  console.log('4️⃣ Fazendo deploy das regras...');
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  console.log('✅ Deploy concluído com sucesso!\n');

  console.log('🎉 REGRAS DO FIRESTORE ATUALIZADAS!');
  console.log('===================================');
  console.log('✅ Leitura pública para news e partners');
  console.log('✅ Escrita apenas para usuários autenticados');
  console.log('✅ Regras de segurança implementadas');

} catch (error) {
  console.error('❌ Erro durante o deploy:', error.message);
  console.log('\n🔧 SOLUÇÕES POSSÍVEIS:');
  console.log('1. Instalar Firebase CLI: npm install -g firebase-tools');
  console.log('2. Fazer login: firebase login');
  console.log('3. Selecionar projeto: firebase use tecsoft-7cf2d');
  console.log('4. Verificar permissões do projeto');
  process.exit(1);
}