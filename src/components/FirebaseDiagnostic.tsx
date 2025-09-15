import React, { useState } from 'react';
import { NewsService } from '../services/newsService';

interface DiagnosticResult {
  test: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export default function FirebaseDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);
    
    const newResults: DiagnosticResult[] = [];

    // Teste 1: Verificar ambiente
    newResults.push({
      test: 'Ambiente',
      status: 'success',
      message: `NODE_ENV: ${process.env.NODE_ENV}`,
      details: {
        userAgent: navigator.userAgent,
        location: window.location.href,
        protocol: window.location.protocol
      }
    });

    // Teste 2: Verificar configuração do Firebase
    try {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAmqbgBfed343gFcdXyFWbhzSv_3OoOPKg",
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "tecsoft-7cf2d.firebaseapp.com",
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "tecsoft-7cf2d",
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "tecsoft-7cf2d.appspot.com",
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "671203567540",
        appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:671203567540:web:tecsoft-app"
      };

      newResults.push({
        test: 'Configuração Firebase',
        status: 'success',
        message: 'Configuração carregada com sucesso',
        details: firebaseConfig
      });
    } catch (error) {
      newResults.push({
        test: 'Configuração Firebase',
        status: 'error',
        message: `Erro ao carregar configuração: ${error}`,
        details: error
      });
    }

    // Teste 3: Testar conexão com Firebase
    try {
      const connectionResult = await NewsService.testConnection();
      newResults.push({
        test: 'Conexão Firebase',
        status: connectionResult ? 'success' : 'error',
        message: connectionResult ? 'Conexão bem-sucedida' : 'Falha na conexão',
        details: { result: connectionResult }
      });
    } catch (error) {
      newResults.push({
        test: 'Conexão Firebase',
        status: 'error',
        message: `Erro na conexão: ${error}`,
        details: error
      });
    }

    // Teste 4: Testar carregamento de notícias
    try {
      const news = await NewsService.getLatestNews(1);
      newResults.push({
        test: 'Carregamento Notícias',
        status: 'success',
        message: `${news.length} notícia(s) carregada(s)`,
        details: news.map(n => ({ id: n.id, title: n.title, isPublished: n.isPublished }))
      });
    } catch (error) {
      newResults.push({
        test: 'Carregamento Notícias',
        status: 'error',
        message: `Erro ao carregar notícias: ${error}`,
        details: error
      });
    }

    setResults(newResults);
    setIsRunning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🔧 Diagnóstico do Firebase
      </h2>
      
      <div className="mb-6">
        <button
          onClick={runDiagnostics}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isRunning
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRunning ? 'Executando diagnósticos...' : 'Executar Diagnósticos'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Resultados:</h3>
          {results.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg">{getStatusIcon(result.status)}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                  {result.test}
                </span>
              </div>
              <p className="text-gray-700 mb-2">{result.message}</p>
              {result.details && (
                <details className="text-sm text-gray-600">
                  <summary className="cursor-pointer hover:text-gray-800">Ver detalhes</summary>
                  <pre className="mt-2 p-3 bg-gray-50 rounded text-xs overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Dicas para resolver problemas:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Verifique se as regras do Firestore estão implantadas corretamente</li>
          <li>• Confirme se o domínio está autorizado no Firebase Console</li>
          <li>• Verifique se não há bloqueios de CORS</li>
          <li>• Confirme se as variáveis de ambiente estão configuradas no Amplify</li>
        </ul>
      </div>
    </div>
  );
}
