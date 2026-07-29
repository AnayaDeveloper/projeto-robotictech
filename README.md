# Sistema de Monitoramento RoboticTech

Interface para monitoramento inteligente de câmeras de segurança, com IA para detecção de eventos de risco.

---

<img width="1353" height="548" alt="Screenshot 2026-07-29 112624" src="https://github.com/user-attachments/assets/c803ee78-61ec-4b30-a36f-7bd026633be1" />


## 🚀 Projeto no ar

**Acesse o projeto online:** [https://projeto-robotictech-6u45.vercel.app/](https://projeto-robotictech-6u45.vercel.app/)

## Recursos implementados

### 🎥 Monitoramento de Câmeras
- Dashboard com grid de câmeras simuladas
- CRUD completo de câmeras (adicionar, editar, remover)
- Navegação para tela de detalhes da câmera
- Indicador visual de status das câmeras (online, offline, alerta)
- Exibição de localização (latitude/longitude) de cada câmera
- Reprodução de vídeos em tempo real com controles nativos

### 🤖 Inteligência Artificial
- Detecção visual de áreas proibidas com polígonos interativos
- Sistema de configuração de EPIs (Equipamentos de Proteção Individual)
- Histórico de eventos de segurança com timestamps
- Bounding boxes para detecções da IA
- Interface para edição de áreas de monitoramento

### 📊 Analytics e Relatórios
- Dashboard de analytics com métricas em tempo real
- Gráficos de eventos por período
- Estatísticas de detecções de EPIs
- Análise de tendências de segurança
- Filtros por período e tipo de evento

### 🎨 Interface e UX
- Design system moderno com paleta de cores consistente
- Layout responsivo para desktop, tablet e mobile
- Animações suaves e transições elegantes
- Componentes reutilizáveis e modulares
- Navegação intuitiva com breadcrumbs

### 📱 Responsividade
- Layout adaptativo para diferentes tamanhos de tela
- Otimizações específicas para mobile
- Grid flexível que se adapta ao dispositivo
- Botões e controles otimizados para toque
- Espaçamentos inteligentes por breakpoint

## Como executar

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie o projeto:
   ```
   npm run dev
   ```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── CameraGrid.tsx   # Grid de câmeras do dashboard
│   ├── CameraForm.tsx   # Formulário de câmeras
│   ├── Modal.tsx        # Modal com formulário
│   └── Analytics.tsx    # Componentes de analytics
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx   # Página principal
│   ├── CameraDetails.tsx # Detalhes da câmera
│   └── Analytics.tsx   # Página de relatórios
├── App.tsx            # Componente principal
├── index.css          # Estilos globais e design system
└── main.tsx          # Ponto de entrada
```

## Funcionalidades Principais

### Dashboard Principal
- **Grid de Câmeras**: Visualização em cards com vídeos ao vivo
- **Status em Tempo Real**: Indicadores visuais (verde/vermelho/laranja)
- **Ações Rápidas**: Editar, remover e visualizar detalhes
- **Botão Analytics**: Acesso direto aos relatórios

### Detalhes da Câmera
- **Visualização Ampliada**: Player de vídeo em tamanho maior
- **Áreas Proibidas**: Desenho e edição de polígonos interativos
- **Configuração de EPIs**: Seleção de equipamentos a monitorar
- **Histórico de Eventos**: Timeline com capturas e descrições
- **Overlays Visuais**: Bounding boxes e áreas destacadas

### Analytics e Relatórios
- **Métricas Gerais**: Contadores de eventos e estatísticas
- **Gráficos Interativos**: Visualização de dados por período
- **Filtros Avançados**: Por data, tipo de evento e câmera
- **Exportação**: Dados prontos para relatórios

## Design System

### Paleta de Cores
- **Primary**: `#2563eb` (Azul principal)
- **Success**: `#10b981` (Verde para status online)
- **Warning**: `#f59e0b` (Laranja para alertas)
- **Danger**: `#ef4444` (Vermelho para offline)

### Espaçamentos
- **XS**: `4px` | **SM**: `8px` | **MD**: `16px`
- **LG**: `24px` | **XL**: `32px` | **2XL**: `48px`

### Breakpoints Responsivos
- **Mobile**: `≤ 768px`
- **Tablet**: `769px - 1024px`
- **Desktop**: `≥ 1025px`

## Tecnologias

- **React 18 / 19** + **TypeScript** para desenvolvimento type-safe
- **React Router** para navegação SPA
- **Context API** para gerenciamento de estado global
- **CSS3** com variáveis customizadas e grid/flexbox
- **HTML5 Video API** para reprodução de mídia
- **SVG** para gráficos vetoriais e overlays
- **UUID** para geração de identificadores únicos

## Recursos Técnicos

### Performance
- **Lazy Loading** de componentes
- **Otimização de vídeos** com preload metadata
- **CSS otimizado** com variáveis reutilizáveis
- **Componentes modulares** para melhor tree-shaking

### Acessibilidade
- **Navegação por teclado** em todos os componentes
- **Contraste adequado** seguindo WCAG 2.1
- **Labels semânticos** para screen readers
- **Focus management** em modais e formulários
