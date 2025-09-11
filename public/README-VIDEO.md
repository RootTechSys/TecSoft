# 🎥 Implementação do Vídeo - Nossa Visão

## 📁 Arquivos de Vídeo Necessários

Para implementar o vídeo na seção "Nossa Visão", você precisa adicionar os seguintes arquivos na pasta `public/`:

### **1. Vídeo Principal (MP4)**
- **Arquivo:** `tecsoft-vision.mp4`
- **Formato:** MP4 (H.264)
- **Resolução:** 1920x1080 (Full HD) ou 1280x720 (HD)
- **Duração:** 30-60 segundos recomendado
- **Tamanho:** Máximo 10MB para carregamento rápido

### **2. Vídeo Alternativo (WebM)**
- **Arquivo:** `tecsoft-vision.webm`
- **Formato:** WebM (VP9)
- **Resolução:** Mesma do MP4
- **Duração:** Mesma do MP4
- **Tamanho:** Máximo 8MB

### **3. Imagem de Capa (Opcional)**
- **Arquivo:** `placeholder-video.jpg`
- **Formato:** JPG ou PNG
- **Resolução:** 1920x1080
- **Tamanho:** Máximo 500KB

## 🎯 Conteúdo Recomendado para o Vídeo

### **Temas Sugeridos:**
- **Visão da TECSOFT** - Apresentação da missão e valores
- **Tecnologia em Brasília** - Mostrar o ecossistema tech da capital
- **Inovação e Crescimento** - Destaque para o futuro do setor
- **Profissionais e Empresas** - Comunidade TECSOFT em ação

### **Elementos Visuais:**
- **Logo TECSOFT** - Branding consistente
- **Cores da marca** - Verde Oliva, Azul Estratégico, Dourado
- **Gráficos animados** - Estatísticas e crescimento
- **Depoimentos** - Associados e parceiros
- **Cenas de trabalho** - Desenvolvimento e inovação

## ⚙️ Configurações Técnicas

### **Atributos do Vídeo:**
```html
<video
  autoPlay          <!-- Reproduz automaticamente -->
  muted             <!-- Sem som (necessário para autoplay) -->
  loop              <!-- Reproduz em loop -->
  playsInline       <!-- Reproduz inline em dispositivos móveis -->
  poster            <!-- Imagem de capa -->
>
```

### **Formatos Suportados:**
- **MP4 (H.264)** - Compatibilidade máxima
- **WebM (VP9)** - Melhor compressão
- **Fallback** - Texto para navegadores antigos

## 🚀 Como Implementar

### **1. Adicione os arquivos de vídeo:**
```bash
# Copie seus vídeos para a pasta public/
cp seu-video.mp4 public/tecsoft-vision.mp4
cp seu-video.webm public/tecsoft-vision.webm
```

### **2. Personalize o conteúdo:**
- Edite o texto da descrição se necessário
- Ajuste as tags técnicas conforme sua estratégia
- Modifique as cores se precisar de ajustes

### **3. Teste em diferentes dispositivos:**
- Desktop (Chrome, Firefox, Safari)
- Mobile (iOS, Android)
- Verifique o carregamento e performance

## 💡 Dicas de Otimização

### **Performance:**
- **Compressão:** Use ferramentas como HandBrake ou FFmpeg
- **Resolução:** 720p é suficiente para web
- **Duração:** Mantenha entre 30-60 segundos
- **Tamanho:** Máximo 10MB para carregamento rápido

### **Acessibilidade:**
- **Legendas:** Considere adicionar legendas em português
- **Controles:** O vídeo tem controles visuais intuitivos
- **Fallback:** Texto alternativo para navegadores sem suporte

### **SEO:**
- **Título descritivo** - "Nossa Visão TECSOFT"
- **Meta descrição** - Inclua palavras-chave relevantes
- **Schema markup** - Para rich snippets

## 🔧 Personalizações Disponíveis

### **Cores e Estilos:**
- **Background:** `from-secondary-600 to-secondary-700`
- **Badges:** `bg-accent-500/20`
- **Texto:** `text-white` e `text-white/90`

### **Animações:**
- **Hover effects** no botão de play
- **Fade in** ao entrar na viewport
- **Scale effects** nos elementos interativos

### **Responsividade:**
- **Aspect ratio:** `aspect-video` (16:9)
- **Mobile first** design
- **Touch friendly** controls

## 📞 Suporte

Se precisar de ajuda com:
- **Conversão de vídeo** para os formatos corretos
- **Otimização** de performance
- **Personalização** de cores e estilos
- **Implementação** de funcionalidades adicionais

Entre em contato com a equipe de desenvolvimento!

