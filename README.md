# TECSOFT - Centro de Tecnologia e Software de Brasília

Landing page moderna e profissional para o Centro de Tecnologia e Software de Brasília (TECSOFT), desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 Características

- **Design Moderno**: Interface elegante e profissional com animações suaves
- **Responsivo**: Otimizado para todos os dispositivos
- **Performance**: Carregamento rápido e otimizado
- **Acessibilidade**: Desenvolvido seguindo as melhores práticas de acessibilidade
- **SEO Otimizado**: Meta tags e estrutura semântica

## 📁 Estrutura do Projeto

```
TecSoft/
├── public/                 # Arquivos públicos
│   ├── index.html         # HTML principal
│   ├── favicon.ico        # Ícone do site
│   └── manifest.json      # Manifesto PWA
├── src/                   # Código fonte
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Navbar.tsx     # Navegação principal
│   │   └── Footer.tsx     # Rodapé do site
│   ├── pages/            # Páginas do site
│   │   ├── Home.tsx      # Página inicial
│   │   ├── About.tsx     # Sobre a TECSOFT
│   │   ├── Services.tsx  # Nossos Serviços
│   │   ├── Membership.tsx # Associe-se
│   │   ├── Courses.tsx   # Cursos e Capacitação
│   │   ├── News.tsx      # Notícias
│   │   └── Contact.tsx   # Contato
│   ├── App.tsx           # Componente principal
│   ├── index.tsx         # Ponto de entrada
│   └── index.css         # Estilos globais
├── package.json          # Dependências e scripts
├── tailwind.config.js    # Configuração do Tailwind CSS
├── postcss.config.js     # Configuração do PostCSS
└── README.md            # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca para interfaces de usuário
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Framer Motion**: Animações e transições
- **React Router DOM**: Roteamento client-side
- **Heroicons**: Ícones SVG de alta qualidade

## 📋 Páginas Implementadas

### 1. **Home** (`/`)
- Hero section com call-to-action
- Seção de recursos e diferenciais
- Serviços em destaque
- Cursos populares
- Últimas notícias
- Parceiros institucionais

### 2. **Sobre** (`/sobre`)
- Missão e finalidade
- Objetivos da organização
- Valores institucionais
- Estatísticas e números
- Estrutura organizacional

### 3. **Serviços** (`/servicos`)
- Consultoria e planejamento
- Desenvolvimento e fomento
- Modelos de parceria
- Serviços adicionais
- Processo de trabalho

### 4. **Associe-se** (`/associe-se`)
- Vantagens de ser associado
- Público-alvo
- Planos de associação
- Formulário de interesse

### 5. **Cursos** (`/cursos`)
- Catálogo de cursos
- Filtros por categoria
- Sistema de busca
- Informações detalhadas dos cursos

### 6. **Notícias** (`/noticias`)
- Blog de notícias
- Artigos em destaque
- Filtros por categoria
- Newsletter

### 7. **Contato** (`/contato`)
- Informações de contato
- Departamentos específicos
- Formulário de contato
- Localização

## 🚀 Como Executar

Há dois fluxos suportados: **desenvolvimento local com Node** (hot-reload, ideal para codar) e **produção via Docker** (espelha o que roda no VPS, ideal para validar build e fazer deploy).

### Desenvolvimento local (Node)

#### Pré-requisitos
- Node.js 20+ (ver `engines` em `package.json`)
- npm 10+

#### Instalação
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd TecSoft

# Instale as dependências
npm install

# Execute o projeto
npm start
```

O site estará disponível em `http://localhost:3000` com hot-reload.

#### Scripts Disponíveis
- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a versão de produção em `build/`
- `npm test`: Executa os testes
- `npm run eject`: Ejeta a configuração do Create React App

### Produção via Docker

Build multi-stage (`node:20-alpine` → `nginx:1.27-alpine`) servindo o bundle estático na porta 80 do container.

#### Pré-requisitos
- Docker Desktop (Windows/Mac) ou Docker Engine 20+ (Linux)
- Docker Compose v2 (já incluso no Docker Desktop)

#### Subindo o container
```bash
# Clone (se ainda nao tiver)
git clone [URL_DO_REPOSITORIO]
cd TecSoft

# Crie o .env a partir do template (opcional — ver nota abaixo)
cp .env.docker.example .env
# Preencha .env com as REACT_APP_FIREBASE_* (referencia: env.example)

# Build e start
docker compose build
docker compose up -d
```

Acesse: `http://localhost:8080`

> **Nota sobre as chaves Firebase:** o app já tem fallback hardcoded em `src/services/firebase.ts` com as chaves Web SDK públicas. O `.env` é opcional para rodar localmente — útil quando se quer apontar o build para um projeto Firebase diferente. As chaves Web SDK são públicas por design (ficam no bundle JavaScript do client); a proteção real é via Firestore Security Rules, já versionadas em `firestore.rules`.

#### Comandos úteis
```bash
# ver logs ao vivo
docker compose logs -f

# status + healthcheck
docker compose ps

# parar
docker compose down

# rebuild apos mudar codigo
docker compose up -d --build

# rebuild limpando cache (apos trocar variaveis no .env)
docker compose build --no-cache && docker compose up -d
```

#### Trocar a porta exposta
Edite `docker-compose.yml` na linha `"8080:80"` e troque o primeiro número (ex.: `"3000:80"` → `http://localhost:3000`).

### Deploy em VPS (Portainer / docker-compose puro)

1. Suba o repositório no servidor (`git clone` ou aponte a stack do Portainer pra ele).
2. Crie o `.env` no servidor (não vem do Git por design) — copie de `.env.docker.example` e preencha.
3. `docker compose build && docker compose up -d`.
4. Configure o proxy reverso do host (Nginx, Traefik, Caddy) apontando para `http://localhost:8080` para HTTPS e domínio próprio.

No **Portainer**, vá em **Stacks → Add stack**, cole o conteúdo do `docker-compose.yml`, adicione as variáveis em **Environment variables** (ou faça upload do `.env`) e clique em **Deploy the stack**.

### Arquivos de infra
- `Dockerfile` — multi-stage com build args para `REACT_APP_FIREBASE_*`
- `nginx.conf` — SPA fallback (react-router), cache imutável para assets, no-cache para `index.html`, gzip
- `docker-compose.yml` — service `web` na porta 8080, healthcheck e `restart: unless-stopped`
- `.dockerignore` — reduz contexto enviado ao daemon
- `.env.docker.example` — template das variáveis de build

## 🎨 Design System

### Cores
- **Primary**: Azul (#3b82f6) - Cor principal da marca
- **Secondary**: Cinza (#64748b) - Cor secundária
- **Accent**: Laranja (#f3771e) - Cor de destaque

### Tipografia
- **Display**: Poppins - Para títulos e headings
- **Body**: Inter - Para texto e conteúdo

### Componentes
- Botões com estados hover e loading
- Cards com animações suaves
- Formulários com validação
- Navegação responsiva

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Configurações

### Tailwind CSS
O projeto utiliza Tailwind CSS com configurações customizadas:
- Paleta de cores personalizada
- Animações customizadas
- Componentes reutilizáveis

### Animações
- Framer Motion para transições suaves
- Animações scroll-triggered
- Estados de loading e hover

## 📈 Performance

- Lazy loading de imagens
- Otimização de bundle
- Compressão de assets
- Cache otimizado

## 🔮 Próximos Passos

- [x] Integração com backend (Firebase: Auth + Firestore + Storage)
- [x] Sistema de autenticação (`/admin/login`)
- [x] Painel administrativo
- [x] Dockerização para deploy em VPS
- [ ] Blog dinâmico
- [ ] Sistema de newsletter
- [ ] Analytics e métricas
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: contato@tecsoft.org.br
- Telefone: (61) 99999-9999

---

**TECSOFT** - Centro de Tecnologia e Software de Brasília
*Promovendo o desenvolvimento tecnológico e a inovação*
