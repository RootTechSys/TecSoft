import React from 'react';

interface AgendaNavigableProps {
  data?: unknown;
  className?: string;
}

const AgendaNavigable: React.FC<AgendaNavigableProps> = ({ data, className }) => {
  return (
    <section className={`py-20 ${className}`} data-section="agenda">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
            Agenda Navegável
          </h2>
          <p className="text-xl text-gray-300">
            Explore a programação completa com filtros inteligentes e destaques especiais
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgendaNavigable;
