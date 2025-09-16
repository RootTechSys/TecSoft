import React, { useState } from 'react';
import { NewsService } from '../services/newsService';
import { PartnerService } from '../services/partnerService';

const FirebaseDiagnostic: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runDiagnostic = async () => {
    setIsRunning(true);
    setResults([]);
    
    addResult('🔍 Iniciando diagnóstico do Firebase...');
    
    try {
      // Teste 1: Conexão com Firebase
      addResult('📡 Testando conexão com Firebase...');
      const connectionTest = await NewsService.testConnection();
      addResult(connectionTest ? '✅ Conexão com Firebase: OK' : '❌ Conexão com Firebase: FALHOU');
      
      // Teste 2: Buscar notícias
      addResult('📰 Testando busca de notícias...');
      const news = await NewsService.getLatestNews(5);
      addResult(`📰 Notícias encontradas: ${news.length}`);
      
      if (news.length > 0) {
        news.forEach((item, index) => {
          addResult(`  ${index + 1}. ${item.title} (ID: ${item.id}) - Publicada: ${item.isPublished ? 'SIM' : 'NÃO'}`);
        });
        
        // Verificar se são dados mock
        const isMockData = news.some(item => item.id.startsWith('mock-'));
        addResult(isMockData ? '⚠️ Usando dados MOCK (problema de conexão)' : '✅ Dados do Firebase carregados');
      } else {
        addResult('⚠️ Nenhuma notícia encontrada');
      }
      
      // Teste 3: Buscar todas as notícias (debug)
      addResult('🔍 Testando busca completa de notícias...');
      const allNews = await NewsService.getAllNewsForDebug(10);
      addResult(`🔍 Total de notícias (incluindo rascunhos): ${allNews.length}`);
      
      const publishedCount = allNews.filter(n => n.isPublished).length;
      const draftCount = allNews.length - publishedCount;
      addResult(`📊 Publicadas: ${publishedCount}, Rascunhos: ${draftCount}`);
      
      // Teste 4: Buscar parceiros
      addResult('🤝 Testando busca de parceiros...');
      const partners = await PartnerService.getActivePartners();
      addResult(`🤝 Parceiros ativos encontrados: ${partners.length}`);
      
      if (partners.length > 0) {
        partners.forEach((partner, index) => {
          addResult(`  ${index + 1}. ${partner.name} (Ordem: ${partner.order})`);
        });
      }
      
      // Teste 5: Verificar configuração do Firebase
      addResult('⚙️ Verificando configuração do Firebase...');
      const firebaseConfig = {
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'tecsoft-7cf2d',
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'tecsoft-7cf2d.firebaseapp.com'
      };
      addResult(`⚙️ Project ID: ${firebaseConfig.projectId}`);
      addResult(`⚙️ Auth Domain: ${firebaseConfig.authDomain}`);
      
      addResult('✅ Diagnóstico concluído com sucesso!');
      
    } catch (error) {
      addResult(`❌ Erro durante diagnóstico: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      console.error('Erro no diagnóstico:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        🔧 Diagnóstico do Firebase
      </h2>
      
      <p className="text-gray-600 mb-6">
        Este diagnóstico testa a conexão com o Firebase e verifica se os dados estão sendo carregados corretamente.
      </p>
      
      <button
        onClick={runDiagnostic}
        disabled={isRunning}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isRunning
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isRunning ? '🔄 Executando...' : '🚀 Executar Diagnóstico'}
      </button>
      
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Resultados:</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {results.join('\n')}
            </pre>
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Possíveis Soluções:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Se aparecer "dados MOCK", verifique as regras do Firestore</li>
          <li>• Se não encontrar notícias, crie algumas no painel admin</li>
          <li>• Se houver erro de permissão, verifique se está logado</li>
          <li>• Se houver erro de rede, verifique sua conexão com a internet</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseDiagnostic;