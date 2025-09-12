const fs = require('fs');
const path = require('path');

// Arquivos relacionados às seções dinâmicas
const dynamicFiles = [
  'src/services/firebase.ts',
  'src/services/newsService.ts', 
  'src/services/partnerService.ts',
  'src/pages/Home.tsx',
  'src/pages/News.tsx',
  'src/pages/NewsDetail.tsx',
  'src/components/PartnerCarousel.tsx',
  'firestore.rules',
  'storage.rules'
];

console.log('🔍 ANALISANDO SEÇÕES DINÂMICAS DO TECSOFT');
console.log('==========================================\n');

// Verificar se os arquivos existem e mostrar status
dynamicFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✅ EXISTE' : '❌ NÃO ENCONTRADO';
  console.log(`${status} - ${file}`);
  
  if (exists) {
    const stats = fs.statSync(file);
    const size = (stats.size / 1024).toFixed(2);
    const modified = stats.mtime.toLocaleString('pt-BR');
    console.log(`    📊 Tamanho: ${size}KB | Modificado: ${modified}`);
  }
});

console.log('\n🔧 VERIFICANDO CONFIGURAÇÕES DO FIREBASE');
console.log('==========================================');

// Verificar configuração do Firebase
const firebaseFile = 'src/services/firebase.ts';
if (fs.existsSync(firebaseFile)) {
  const content = fs.readFileSync(firebaseFile, 'utf8');
  
  // Extrair configurações
  const projectIdMatch = content.match(/projectId:\s*["']([^"']+)["']/);
  const apiKeyMatch = content.match(/apiKey:\s*["']([^"']+)["']/);
  const authDomainMatch = content.match(/authDomain:\s*["']([^"']+)["']/);
  
  console.log(`📋 Project ID: ${projectIdMatch ? projectIdMatch[1] : 'NÃO ENCONTRADO'}`);
  console.log(`🔑 API Key: ${apiKeyMatch ? apiKeyMatch[1].substring(0, 20) + '...' : 'NÃO ENCONTRADO'}`);
  console.log(`🌐 Auth Domain: ${authDomainMatch ? authDomainMatch[1] : 'NÃO ENCONTRADO'}`);
}

console.log('\n📰 VERIFICANDO SERVIÇOS DE NOTÍCIAS');
console.log('====================================');

// Verificar NewsService
const newsServiceFile = 'src/services/newsService.ts';
if (fs.existsSync(newsServiceFile)) {
  const content = fs.readFileSync(newsServiceFile, 'utf8');
  
  // Verificar métodos principais
  const hasGetLatestNews = content.includes('getLatestNews');
  const hasGetAllNews = content.includes('getAllNews');
  const hasMockData = content.includes('getMockNews');
  const hasFirebaseQuery = content.includes('query(');
  
  console.log(`📝 getLatestNews: ${hasGetLatestNews ? '✅' : '❌'}`);
  console.log(`📝 getAllNews: ${hasGetAllNews ? '✅' : '❌'}`);
  console.log(`📝 Mock Data: ${hasMockData ? '✅' : '❌'}`);
  console.log(`📝 Firebase Query: ${hasFirebaseQuery ? '✅' : '❌'}`);
}

console.log('\n🤝 VERIFICANDO SERVIÇOS DE PARCEIROS');
console.log('=====================================');

// Verificar PartnerService
const partnerServiceFile = 'src/services/partnerService.ts';
if (fs.existsSync(partnerServiceFile)) {
  const content = fs.readFileSync(partnerServiceFile, 'utf8');
  
  const hasGetAllPartners = content.includes('getAllPartners');
  const hasGetActivePartners = content.includes('getActivePartners');
  const hasMockData = content.includes('mockPartners');
  const hasFirebaseQuery = content.includes('query(');
  
  console.log(`🤝 getAllPartners: ${hasGetAllPartners ? '✅' : '❌'}`);
  console.log(`🤝 getActivePartners: ${hasGetActivePartners ? '✅' : '❌'}`);
  console.log(`🤝 Mock Data: ${hasMockData ? '✅' : '❌'}`);
  console.log(`🤝 Firebase Query: ${hasFirebaseQuery ? '✅' : '❌'}`);
}

console.log('\n🏠 VERIFICANDO PÁGINA HOME');
console.log('==========================');

// Verificar Home.tsx
const homeFile = 'src/pages/Home.tsx';
if (fs.existsSync(homeFile)) {
  const content = fs.readFileSync(homeFile, 'utf8');
  
  const hasNewsLoading = content.includes('loadLatestNews');
  const hasPartnerLoading = content.includes('PartnerService');
  const hasErrorHandling = content.includes('setNewsError');
  const hasMockFallback = content.includes('mockNews');
  
  console.log(`📰 Carregamento de Notícias: ${hasNewsLoading ? '✅' : '❌'}`);
  console.log(`🤝 Carregamento de Parceiros: ${hasPartnerLoading ? '✅' : '❌'}`);
  console.log(`⚠️ Tratamento de Erros: ${hasErrorHandling ? '✅' : '❌'}`);
  console.log(`🔄 Fallback Mock: ${hasMockFallback ? '✅' : '❌'}`);
}

console.log('\n📋 VERIFICANDO REGRAS DO FIRESTORE');
console.log('===================================');

// Verificar firestore.rules
const rulesFile = 'firestore.rules';
if (fs.existsSync(rulesFile)) {
  const content = fs.readFileSync(rulesFile, 'utf8');
  
  const hasNewsRules = content.includes('news');
  const hasPartnersRules = content.includes('partners');
  const hasPublicRead = content.includes('allow read: if true');
  const hasAuthWrite = content.includes('request.auth != null');
  
  console.log(`📰 Regras para News: ${hasNewsRules ? '✅' : '❌'}`);
  console.log(`🤝 Regras para Partners: ${hasPartnersRules ? '✅' : '❌'}`);
  console.log(`👁️ Leitura Pública: ${hasPublicRead ? '✅' : '❌'}`);
  console.log(`🔐 Escrita Autenticada: ${hasAuthWrite ? '✅' : '❌'}`);
}

console.log('\n🎯 RESUMO DOS POSSÍVEIS CONFLITOS');
console.log('==================================');
console.log('1. Verifique se as credenciais do Firebase estão corretas');
console.log('2. Confirme se as regras do Firestore permitem leitura pública');
console.log('3. Verifique se os serviços estão usando as collections corretas');
console.log('4. Confirme se os dados mock estão funcionando como fallback');
console.log('5. Verifique se não há erros de importação ou dependências');

console.log('\n✨ Análise concluída!');
