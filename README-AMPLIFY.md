# 🔧 Solução para Problemas de Firebase no AWS Amplify

## Problema Identificado
As notícias funcionam localmente mas não no deploy do AWS Amplify devido a problemas de configuração e conectividade com o Firebase.

## Soluções Implementadas

### 1. 📁 Arquivos Criados/Modificados

#### `amplify.yml`
- Configuração específica para o AWS Amplify
- Define comandos de build e cache
- Otimiza o processo de deploy

#### `env.example`
- Template de variáveis de ambiente
- Configurações do Firebase para produção
- Documentação das variáveis necessárias

#### `src/services/firebase.ts` (Melhorado)
- Suporte a variáveis de ambiente
- Configurações específicas para produção
- Logs detalhados para debug
- Prevenção de múltiplas inicializações

#### `src/services/newsService.ts` (Melhorado)
- Timeout para queries em produção
- Logs específicos por tipo de erro
- Melhor tratamento de erros de rede/CORS
- Diagnóstico detalhado de problemas

#### `src/components/FirebaseDiagnostic.tsx` (Novo)
- Componente de diagnóstico completo
- Testa conexão, configuração e carregamento
- Interface amigável para identificar problemas
- Acessível em `/diagnostico`

### 2. 🚀 Passos para Resolver no AWS Amplify

#### Passo 1: Configurar Variáveis de Ambiente
No console do AWS Amplify:
1. Vá para **App Settings** > **Environment Variables**
2. Adicione as seguintes variáveis:
   ```
   REACT_APP_FIREBASE_API_KEY=AIzaSyAmqbgBfed343gFcdXyFWbhzSv_3OoOPKg
   REACT_APP_FIREBASE_AUTH_DOMAIN=tecsoft-7cf2d.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=tecsoft-7cf2d
   REACT_APP_FIREBASE_STORAGE_BUCKET=tecsoft-7cf2d.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=671203567540
   REACT_APP_FIREBASE_APP_ID=1:671203567540:web:tecsoft-app
   NODE_ENV=production
   ```

#### Passo 2: Verificar Regras do Firestore
No Firebase Console:
1. Vá para **Firestore Database** > **Rules**
2. Certifique-se que as regras estão assim:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /news/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /partners/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

#### Passo 3: Verificar Domínios Autorizados
No Firebase Console:
1. Vá para **Authentication** > **Settings** > **Authorized domains**
2. Adicione o domínio do Amplify (ex: `https://main.d1234567890.amplifyapp.com`)

#### Passo 4: Fazer Novo Deploy
1. Faça commit das mudanças
2. Push para o repositório
3. O Amplify fará deploy automático

### 3. 🔍 Diagnóstico

#### Usar o Componente de Diagnóstico
1. Acesse `https://seu-dominio.amplifyapp.com/diagnostico`
2. Clique em "Executar Diagnósticos"
3. Verifique os resultados:
   - ✅ Verde: Funcionando
   - ❌ Vermelho: Problema identificado
   - ⚠️ Amarelo: Aviso

#### Verificar Console do Navegador
1. Abra F12 (DevTools)
2. Vá para a aba Console
3. Procure por logs do Firebase:
   - `Firebase: Configuração de produção ativa`
   - `NewsService.testConnection: Conexão bem-sucedida!`
   - `NewsService.getLatestNews: X notícias encontradas`

### 4. 🐛 Problemas Comuns e Soluções

#### Erro: "Missing or insufficient permissions"
- **Causa**: Regras do Firestore não implantadas
- **Solução**: Implantar regras no Firebase Console

#### Erro: "CORS policy"
- **Causa**: Domínio não autorizado
- **Solução**: Adicionar domínio no Firebase Console

#### Erro: "Network error"
- **Causa**: Problema de conectividade
- **Solução**: Verificar configurações de rede do Amplify

#### Erro: "Timeout"
- **Causa**: Firebase demorando para responder
- **Solução**: Verificar status do Firebase e regras

### 5. 📋 Checklist de Verificação

- [ ] Variáveis de ambiente configuradas no Amplify
- [ ] Regras do Firestore implantadas
- [ ] Domínio autorizado no Firebase
- [ ] Deploy realizado com sucesso
- [ ] Diagnóstico executado sem erros
- [ ] Console mostra logs do Firebase
- [ ] Notícias aparecem no site

### 6. 🆘 Suporte

Se os problemas persistirem:
1. Execute o diagnóstico em `/diagnostico`
2. Copie os logs do console
3. Verifique o status do Firebase em https://status.firebase.google.com/
4. Consulte a documentação do AWS Amplify

## Arquivos Modificados
- `amplify.yml` (novo)
- `env.example` (novo)
- `src/services/firebase.ts` (melhorado)
- `src/services/newsService.ts` (melhorado)
- `src/components/FirebaseDiagnostic.tsx` (novo)
- `src/App.tsx` (adicionada rota de diagnóstico)
