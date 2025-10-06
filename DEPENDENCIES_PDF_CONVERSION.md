# Dependências para Conversão PDF → PNG

## Instalação Necessária

Para que a conversão automática de PDFs funcione, instale as seguintes dependências:

```bash
npm install pdfjs-dist canvas
```

## Variáveis de Ambiente

Adicione ao seu `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://seusite.com
```

## Funcionamento

### Rota API
- **Endpoint**: `/api/logo/pdf2png`
- **Parâmetro**: `src` (caminho do PDF)
- **Retorno**: PNG convertido com cache de 1 ano
- **Escala**: 2x para telas retina

### Componente Logo
- **Detecção automática**: PDFs são convertidos via API
- **SVG/PNG diretos**: Carregados normalmente
- **Lazy loading**: Otimização de performance
- **Classes CSS**: Suporte a `.contrast` para contraste

### Exemplos de Uso

```jsx
// PDF (conversão automática)
<Logo src="/Logos/GFORTI/ABIPTI.pdf" alt="ABIPTI" className="contrast" />

// PNG/SVG (carregamento direto)
<Logo src="/LogoTecsoft.png" alt="TECSOFT" />
```

## Cache e Performance

- **Cache**: 1 ano (`max-age=31536000`)
- **Imutável**: `immutable` para CDN
- **Retina**: Escala 2x para nitidez
- **Fallback**: Erro 500 se conversão falhar

## Alternativas

Se não conseguir instalar as dependências nativas:

1. **Converter manualmente**: PDF → PNG/SVG e subir para `/public/logos/`
2. **Serviço externo**: Cloudinary, ImageKit com suporte a PDF
3. **Pipeline CI**: Conversão automática no build

## Troubleshooting

- **Erro 500**: Verifique se `pdfjs-dist` e `canvas` estão instalados
- **URL inválida**: Configure `NEXT_PUBLIC_BASE_URL` corretamente
- **Cache**: Limpe cache do navegador/CDN após mudanças


