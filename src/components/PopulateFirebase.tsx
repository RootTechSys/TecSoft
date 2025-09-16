import React, { useState } from 'react';
import { populateFirebase } from '../utils/populateFirebase';

const PopulateFirebase: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handlePopulate = async () => {
    setIsRunning(true);
    setResult(null);
    
    try {
      const result = await populateFirebase();
      setResult(result);
    } catch (error) {
      setResult({
        success: false,
        message: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        🚀 Popular Firebase com Dados de Exemplo
      </h2>
      
      <p className="text-gray-600 mb-6">
        Se as collections do Firebase estão vazias, você pode usar este botão para criar dados de exemplo.
        Isso irá criar notícias e parceiros de teste para você ver o site funcionando.
      </p>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Importante:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Você precisa estar logado como administrador</li>
          <li>• Este processo só cria dados se as collections estiverem vazias</li>
          <li>• Os dados criados são apenas para demonstração</li>
        </ul>
      </div>
      
      <button
        onClick={handlePopulate}
        disabled={isRunning}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isRunning
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {isRunning ? '🔄 Populando...' : '🚀 Popular Firebase'}
      </button>
      
      {result && (
        <div className={`mt-6 p-4 rounded-lg ${
          result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            result.success ? 'text-green-800' : 'text-red-800'
          }`}>
            {result.success ? '✅ Sucesso!' : '❌ Erro'}
          </h4>
          <p className={`text-sm ${
            result.success ? 'text-green-700' : 'text-red-700'
          }`}>
            {result.message}
          </p>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Alternativas:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Acesse /admin para criar notícias e parceiros manualmente</li>
          <li>• Use o Firebase Console para adicionar dados diretamente</li>
          <li>• Verifique se você está logado como administrador</li>
        </ul>
      </div>
    </div>
  );
};

export default PopulateFirebase;
