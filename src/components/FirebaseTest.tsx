import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const FirebaseTest: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testFirestoreAccess = async () => {
    setIsRunning(true);
    setResults([]);
    
    addResult('🔍 Testando acesso direto ao Firestore...');
    
    try {
      // Teste 1: Tentar acessar collection de notícias
      addResult('📰 Testando collection "news"...');
      const newsCollection = collection(db, 'news');
      const newsSnapshot = await getDocs(newsCollection);
      addResult(`📰 Documentos na collection "news": ${newsSnapshot.size}`);
      
      if (newsSnapshot.size > 0) {
        let index = 0;
        newsSnapshot.forEach((doc) => {
          const data = doc.data();
          addResult(`  ${index + 1}. ID: ${doc.id}, Título: ${data.title || 'Sem título'}, Publicada: ${data.isPublished || false}`);
          index++;
        });
      } else {
        addResult('⚠️ Collection "news" está vazia!');
      }
      
      // Teste 2: Tentar acessar collection de parceiros
      addResult('🤝 Testando collection "partners"...');
      const partnersCollection = collection(db, 'partners');
      const partnersSnapshot = await getDocs(partnersCollection);
      addResult(`🤝 Documentos na collection "partners": ${partnersSnapshot.size}`);
      
      if (partnersSnapshot.size > 0) {
        let index = 0;
        partnersSnapshot.forEach((doc) => {
          const data = doc.data();
          addResult(`  ${index + 1}. ID: ${doc.id}, Nome: ${data.name || 'Sem nome'}, Ativo: ${data.isActive !== undefined ? data.isActive : 'Não definido'}`);
          index++;
        });
      } else {
        addResult('⚠️ Collection "partners" está vazia!');
      }
      
      // Teste 3: Verificar se há dados de teste
      addResult('🧪 Verificando se há dados de teste...');
      if (newsSnapshot.size === 0 && partnersSnapshot.size === 0) {
        addResult('❌ PROBLEMA IDENTIFICADO: Ambas as collections estão vazias!');
        addResult('💡 SOLUÇÃO: Você precisa criar dados no Firebase Console ou usar o painel admin');
        addResult('📝 Para criar notícias: Acesse /admin e faça login');
        addResult('📝 Para criar parceiros: Acesse /admin e faça login');
      } else {
        addResult('✅ Collections têm dados, problema pode ser na lógica de carregamento');
      }
      
      addResult('✅ Teste concluído!');
      
    } catch (error) {
      addResult(`❌ ERRO: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      
      if (error instanceof Error) {
        if (error.message.includes('permission')) {
          addResult('🚨 ERRO DE PERMISSÃO: Verifique as regras do Firestore');
          addResult('💡 As regras devem permitir leitura pública: allow read: if true');
        } else if (error.message.includes('network')) {
          addResult('🌐 ERRO DE REDE: Verifique sua conexão com a internet');
        } else if (error.message.includes('not-found')) {
          addResult('📁 ERRO: Collection não encontrada - verifique o nome da collection');
        }
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        🧪 Teste Direto do Firestore
      </h2>
      
      <p className="text-gray-600 mb-6">
        Este teste verifica diretamente se conseguimos acessar as collections do Firestore e se há dados nelas.
      </p>
      
      <button
        onClick={testFirestoreAccess}
        disabled={isRunning}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isRunning
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {isRunning ? '🔄 Testando...' : '🧪 Testar Firestore'}
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
    </div>
  );
};

export default FirebaseTest;
