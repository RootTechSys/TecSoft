import React from 'react';
import { ExclamationTriangleIcon, CogIcon } from '@heroicons/react/24/outline';

interface FirebasePermissionWarningProps {
  onDismiss?: () => void;
}

export default function FirebasePermissionWarning({ onDismiss }: FirebasePermissionWarningProps) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            🚨 Problema de Permissão Detectado
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              As notícias não estão carregando devido a problemas de permissão no Firebase.
              Exibindo dados de exemplo temporariamente.
            </p>
            <div className="mt-3">
              <h4 className="font-medium text-yellow-800 mb-2">🔧 Como resolver:</h4>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Acesse o <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
                <li>Selecione o projeto "tecsoft-7cf2d"</li>
                <li>Vá para <strong>Firestore Database</strong> → <strong>Rules</strong></li>
                <li>Cole as regras do arquivo <code className="bg-yellow-100 px-1 rounded">firestore-rules-correct.txt</code></li>
                <li>Clique em <strong>"Publish"</strong> para implantar</li>
                <li>Aguarde alguns minutos e recarregue a página</li>
              </ol>
            </div>
            <div className="mt-3 flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <CogIcon className="w-3 h-3 mr-1" />
                Recarregar Página
              </button>
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Dispensar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

