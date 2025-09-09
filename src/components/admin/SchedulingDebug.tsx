import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { schedulingService } from '../../services/schedulingService';

const SchedulingDebug: React.FC = () => {
  const [status, setStatus] = useState({ isRunning: false, scheduledCount: 0 });
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Atualiza o status a cada 5 segundos
    const interval = setInterval(() => {
      const currentStatus = schedulingService.getStatus();
      setStatus(currentStatus);
    }, 5000);

    // Captura logs do console
    const originalLog = console.log;
    console.log = (...args) => {
      originalLog(...args);
      if (args[0] && typeof args[0] === 'string' && 
          (args[0].includes('agendamento') || args[0].includes('notícia') || args[0].includes('publicar'))) {
        setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${args.join(' ')}`]);
      }
    };

    return () => {
      clearInterval(interval);
      console.log = originalLog;
    };
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  const forceCheck = async () => {
    console.log('Verificação manual solicitada...');
    try {
      await schedulingService.forceCheck();
      const status = schedulingService.getStatus();
      console.log('Status após verificação:', status);
    } catch (error) {
      console.error('Erro na verificação forçada:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-graphite">
          🔧 Debug do Sistema de Agendamento
        </h3>
        <div className="flex gap-2">
          <button
            onClick={forceCheck}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Verificar Agora
          </button>
          <button
            onClick={clearLogs}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Limpar Logs
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${status.isRunning ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm font-medium text-graphite">
              Status: {status.isRunning ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <span className="text-sm font-medium text-graphite">
            Notícias Agendadas: {status.scheduledCount}
          </span>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h4 className="text-white text-sm font-medium mb-2">Logs do Sistema:</h4>
        <div className="text-xs text-green-400 font-mono max-h-40 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-gray-400">Nenhum log disponível...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Instruções */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Como testar:</h4>
        <ol className="text-xs text-blue-700 space-y-1">
          <li>1. Crie uma notícia com data 1-2 minutos no futuro</li>
          <li>2. Desmarque "Publicar imediatamente"</li>
          <li>3. Salve a notícia</li>
          <li>4. Observe os logs aqui e no console do navegador</li>
          <li>5. Aguarde o horário agendado</li>
        </ol>
      </div>
    </motion.div>
  );
};

export default SchedulingDebug;
