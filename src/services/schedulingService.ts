import { doc, updateDoc, getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';

class SchedulingService {
  private static instance: SchedulingService;
  private scheduledNews: Map<string, NodeJS.Timeout> = new Map();
  private isRunning = false;
  private checkInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.startScheduler();
  }

  public static getInstance(): SchedulingService {
    if (!SchedulingService.instance) {
      SchedulingService.instance = new SchedulingService();
    }
    return SchedulingService.instance;
  }

  /**
   * Agenda uma notícia para publicação
   */
  public async scheduleNews(newsId: string, newsData: any, scheduledDate: Date): Promise<void> {
    try {
      const now = new Date();
      const timeUntilPublish = scheduledDate.getTime() - now.getTime();

      console.log(`Agendando notícia ${newsId}:`, {
        title: newsData.title,
        scheduledDate: scheduledDate.toLocaleString('pt-BR'),
        now: now.toLocaleString('pt-BR'),
        timeUntilPublish: Math.round(timeUntilPublish / 1000) + ' segundos'
      });

      // Se a data é no passado ou agora, publica imediatamente
      if (timeUntilPublish <= 0) {
        console.log(`Data no passado, publicando imediatamente: ${newsId}`);
        await this.publishNewsImmediately(newsId, newsData);
        return;
      }

      // Cancela agendamento anterior se existir
      this.cancelScheduledNews(newsId);

      // Agenda a publicação
      const timeoutId = setTimeout(async () => {
        try {
          console.log(`Timer disparado para notícia ${newsId}`);
          await this.publishNewsImmediately(newsId, newsData);
          this.scheduledNews.delete(newsId);
        } catch (error) {
          console.error(`Erro ao publicar notícia agendada ${newsId}:`, error);
        }
      }, timeUntilPublish);

      this.scheduledNews.set(newsId, timeoutId);
      
      console.log(`✅ Notícia ${newsId} agendada com sucesso para ${scheduledDate.toLocaleString('pt-BR')} (${Math.round(timeUntilPublish / 1000)}s)`);
    } catch (error) {
      console.error('Erro ao agendar notícia:', error);
      throw error;
    }
  }

  /**
   * Cancela o agendamento de uma notícia
   */
  public cancelScheduledNews(newsId: string): void {
    const timeoutId = this.scheduledNews.get(newsId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.scheduledNews.delete(newsId);
      console.log(`Agendamento da notícia ${newsId} cancelado`);
    }
  }

  /**
   * Publica uma notícia imediatamente
   */
  private async publishNewsImmediately(newsId: string, newsData: any): Promise<void> {
    try {
      console.log(`🚀 Publicando notícia ${newsId}:`, {
        title: newsData.title,
        scheduledDate: newsData.scheduledDate?.toDate()?.toLocaleString('pt-BR')
      });

      const newsRef = doc(db, 'news', newsId);
      const updateData = {
        isPublished: true,
        publicationDate: new Date(),
        updatedAt: new Date()
      };

      console.log('Dados para atualização:', updateData);
      await updateDoc(newsRef, updateData);
      
      console.log(`✅ Notícia "${newsData.title}" (${newsId}) publicada com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao publicar notícia ${newsId}:`, error);
      throw error;
    }
  }

  /**
   * Inicia o sistema de agendamento
   */
  private startScheduler(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    // Verifica notícias agendadas a cada 10 segundos (reduzido para testes)
    this.checkInterval = setInterval(async () => {
      console.log('Verificando notícias agendadas...');
      await this.checkScheduledNews();
    }, 10000);

    // Verifica imediatamente ao iniciar
    console.log('Verificação inicial de notícias agendadas...');
    this.checkScheduledNews();
    
    console.log('Sistema de agendamento iniciado');
  }

  /**
   * Para o sistema de agendamento
   */
  public stopScheduler(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    
    // Cancela todos os agendamentos
    this.scheduledNews.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.scheduledNews.clear();
    
    this.isRunning = false;
    console.log('Sistema de agendamento parado');
  }

  /**
   * Verifica notícias agendadas no banco de dados
   */
  private async checkScheduledNews(): Promise<void> {
    try {
      const now = new Date();
      console.log('Verificando notícias agendadas para:', now.toLocaleString('pt-BR'));
      
      const newsCollection = collection(db, 'news');
      
      // Busca notícias não publicadas com data de agendamento
      const q = query(
        newsCollection,
        where('isPublished', '==', false),
        where('scheduledDate', '!=', null),
        orderBy('scheduledDate', 'asc')
      );

      const querySnapshot = await getDocs(q);
      console.log(`Encontradas ${querySnapshot.size} notícias agendadas`);
      
      // Processa cada documento sequencialmente para evitar problemas de concorrência
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const scheduledDate = data.scheduledDate?.toDate();
        const newsId = docSnapshot.id;
        
        console.log(`Verificando notícia ${newsId}:`, {
          title: data.title,
          scheduledDate: scheduledDate?.toLocaleString('pt-BR'),
          isPublished: data.isPublished
        });
        
        if (scheduledDate && scheduledDate <= now) {
          // Notícia deve ser publicada agora
          console.log(`Publicando notícia ${newsId} imediatamente...`);
          await this.publishNewsImmediately(newsId, data);
        } else if (scheduledDate && scheduledDate > now) {
          // Agenda a notícia se ainda não estiver agendada
          if (!this.scheduledNews.has(newsId)) {
            console.log(`Agendando notícia ${newsId} para ${scheduledDate.toLocaleString('pt-BR')}...`);
            await this.scheduleNews(newsId, data, scheduledDate);
          } else {
            console.log(`Notícia ${newsId} já está agendada`);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar notícias agendadas:', error);
    }
  }

  /**
   * Retorna o status do sistema de agendamento
   */
  public getStatus(): { isRunning: boolean; scheduledCount: number } {
    return {
      isRunning: this.isRunning,
      scheduledCount: this.scheduledNews.size
    };
  }

  /**
   * Limpa todos os agendamentos (útil para testes)
   */
  public clearAllScheduled(): void {
    this.scheduledNews.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.scheduledNews.clear();
    console.log('Todos os agendamentos foram limpos');
  }

  /**
   * Força uma verificação imediata de notícias agendadas
   */
  public async forceCheck(): Promise<void> {
    console.log('🔍 Verificação forçada de notícias agendadas...');
    await this.checkScheduledNews();
  }
}

// Exporta uma instância singleton
export const schedulingService = SchedulingService.getInstance();

// Inicializa o serviço quando o módulo é carregado
if (typeof window !== 'undefined') {
  // Só inicializa no cliente
  console.log('Serviço de agendamento carregado');
}
