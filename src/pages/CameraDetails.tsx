import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';  

// Mock das câmeras
const camerasMock = [
  {
    id: '1',
    nome: 'Entrada principal',
    url: 'https://videos.pexels.com/video-files/28835670/12490947_2560_1440_25fps.mp4',
    status: 'online',
    latitude: '40.7580',
    longitude: '-73.9855'
  },
  {
    id: '2',
    nome: 'Estacionamento',
    url: 'https://videos.pexels.com/video-files/28835670/12490947_2560_1440_25fps.mp4',
    status: 'alerta',
    latitude: '-22.9711',
    longitude: '-43.1822'
  },
  {
    id: '3',
    nome: 'Fundos',
    url: 'https://videos.pexels.com/video-files/32011319/13643572_2560_1440_24fps.mp4',
    status: 'offline',
    latitude: '51.5074',
    longitude: '-0.1278'
  }
];

// Mock de áreas proibidas (polígonos)
const areasProibidasMock = [
  {
    cameraId: '1',
    areas: [
      [
        [0.1, 0.2],
        [0.3, 0.2],
        [0.3, 0.4],
        [0.1, 0.4]
      ]
    ]
  },
  {
    cameraId: '2',
    areas: [
      [
        [0.5, 0.5],
        [0.7, 0.5],
        [0.7, 0.7],
        [0.5, 0.7]
      ]
    ]
  }
];

// Mock de detecções da IA (bounding boxes)
const deteccoesIAMock = [
  {
    cameraId: '1',
    boxes: [
      [0.15, 0.25, 0.1, 0.15]
    ]
  }
];

// Mock de EPIs disponíveis
const episDisponiveis = ['Capacete', 'Colete', 'Óculos', 'Luva'];

// Mock de histórico de eventos
const eventosMock = [
  {
    cameraId: '1',
    eventos: [
      {
        id: 'e1',
        tipo: 'Invasão',
        dataHora: '2025-07-29 10:15',
        descricao: 'Pessoa entrou em área proibida',
        frameUrl: 'https://picsum.photos/120/80?random=1'
      },
      {
        id: 'e2',
        tipo: 'EPI',
        dataHora: '2025-07-29 09:50',
        descricao: 'Pessoa sem capacete detectada',
        frameUrl: 'https://picsum.photos/120/80?random=2'
      }
    ]
  },
  {
    cameraId: '2',
    eventos: [
      {
        id: 'e3',
        tipo: 'Invasão',
        dataHora: '2025-07-29 08:30',
        descricao: 'Movimento suspeito detectado',
        frameUrl: 'https://picsum.photos/120/80?random=3'
      }
    ]
  },
  {
    cameraId: '3',
    eventos: [
      {
        id: 'e4',
        tipo: 'EPI',
        dataHora: '2025-07-29 07:45',
        descricao: 'Trabalhador sem colete detectado',
        frameUrl: 'https://picsum.photos/120/80?random=4'
      }
    ]
  }
];

const CameraDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const camera = camerasMock.find(cam => cam.id === id);

  // Estado para edição de áreas
  const [editandoAreas, setEditandoAreas] = React.useState(false);
  const [novoPoligono, setNovoPoligono] = React.useState<[number, number][]>([]);
  // Estado para EPIs selecionados
  const [episSelecionados, setEpisSelecionados] = React.useState<string[]>([]);

  if (!camera) {
    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>📹</div>
            <h2>Câmera não encontrada</h2>
            <p className="text-muted">A câmera solicitada não existe no sistema.</p>
            <button className="btn btn-primary" onClick={() => window.history.back()}>
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderização inteligente do vídeo/imagem
  const renderCameraMedia = () => {
    if (camera.url.endsWith('.mp4')) {
      return (
        <video 
          src={camera.url} 
          width="480" 
          height="270" 
          controls
          preload="metadata"
          style={{
            background: '#000',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: 'none',
            border: 'none',
            display: 'block'
          }}
          onError={(e) => {
            console.log('Erro ao carregar vídeo:', camera.nome);
            e.currentTarget.style.background = '#f0f0f0';
          }}
          onLoadStart={() => {
            console.log('Carregando vídeo:', camera.nome);
          }}
        >
          Seu navegador não suporta vídeos HTML5.
        </video>
      );
    }
    if (camera.url.endsWith('.mjpeg')) {
      return <img src={camera.url} width="480" height="270" alt={camera.nome} style={{ background: '#000', borderRadius: '8px' }} />;
    }
    if (camera.url.endsWith('.m3u8')) {
      return (
        <div style={{ width: 480, height: 270, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, borderRadius: '8px' }}>
          Stream HLS não suportado nativamente
        </div>
      );
    }
    return (
      <div style={{ width: 480, height: 270, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, borderRadius: '8px' }}>
        Tipo de stream não suportado
      </div>
    );
  };

  // Busca áreas proibidas, detecções e eventos para a câmera atual
  const areas = areasProibidasMock.find(a => a.cameraId === camera.id)?.areas || [];
  const boxes = deteccoesIAMock.find(d => d.cameraId === camera.id)?.boxes || [];
  const eventos = eventosMock.find(e => e.cameraId === camera.id)?.eventos || [];

  // Manipula clique no vídeo para adicionar pontos ao novo polígono
  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!editandoAreas) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / 480;
    const y = (e.clientY - rect.top) / 270;
    setNovoPoligono([...novoPoligono, [x, y]]);
  };



  return (
    <div className="container-fluid fade-in">
      {/* Header */}
      <section style={{ 
        marginTop: 'var(--space-lg)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <div className="clean-header">
          <h1 className="professional-title">
            <span className="title-icon">🎥</span>
            <span className="title-text">Detalhes da Câmera</span>
          </h1>
          <Link 
            to="/" 
            className="btn btn-secondary btn-back"
          >
            ← Dashboard
          </Link>
        </div>
      </section>

      {/* Container do Vídeo */}
      <section style={{ 
        marginTop: 'var(--space-xl)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <div
          style={{
            position: 'relative',
            width: 480,
            height: 270,
            marginBottom: 'var(--space-lg)',
            cursor: editandoAreas ? 'crosshair' : 'default'
          }}
          onClick={handleVideoClick}
        >
        {renderCameraMedia()}
        <svg
          width={480}
          height={270}
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        >
          {/* Áreas proibidas */}
          {areas.map((area, idx) => (
            <polygon
              key={idx}
              points={area.map(([x, y]) => `${x * 480},${y * 270}`).join(' ')}
              fill="rgba(255,0,0,0.2)"
              stroke="red"
              strokeWidth={2}
            />
          ))}
          {/* Novo polígono em edição */}
          {editandoAreas && novoPoligono.length > 0 && (
            <polygon
              points={novoPoligono.map(([x, y]) => `${x * 480},${y * 270}`).join(' ')}
              fill="rgba(0,0,255,0.2)"
              stroke="blue"
              strokeWidth={2}
            />
          )}
          {/* Detecções IA */}
          {boxes.map((box, idx) => (
            <rect
              key={idx}
              x={box[0] * 480}
              y={box[1] * 270}
              width={box[2] * 480}
              height={box[3] * 270}
              fill="none"
              stroke="yellow"
              strokeWidth={2}
            />
          ))}
        </svg>
        </div>

        {/* Botão Editar Áreas - Abaixo do vídeo */}
        <button
          onClick={() => {
            setEditandoAreas(!editandoAreas);
            setNovoPoligono([]);
          }}
          className={`btn ${editandoAreas ? 'btn-danger' : 'btn-secondary'}`}
          style={{ marginBottom: 'var(--space-md)' }}
        >
          {editandoAreas ? 'Cancelar Edição' : 'Editar Áreas'}
        </button>

        {/* Botão para salvar novo polígono */}
        {editandoAreas && novoPoligono.length > 2 && (
          <button
            onClick={() => {
              alert('Área salva (simulação)');
              setNovoPoligono([]);
              setEditandoAreas(false);
            }}
            className="btn btn-success"
            style={{ marginTop: 'var(--space-md)' }}
          >
            Salvar Área Proibida
          </button>
        )}
      </section>
      
      {/* Seção de Informações */}
      <section style={{ 
        marginTop: 'var(--space-xl)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <div className="card">
          <div className="card-header">
            <h4>📊 Informações da Câmera</h4>
          </div>
          <div className="card-body">
            <p><strong>Status:</strong> {camera.status}</p>
            <p><strong>Latitude:</strong> {camera.latitude}</p>
            <p><strong>Longitude:</strong> {camera.longitude}</p>
          </div>
        </div>
      </section>

      {/* Seção de Configuração de EPIs */}
      <section style={{ 
        marginTop: 'var(--space-xl)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <div className="card">
        <div className="card-header">
          <h4>🦺 Configuração de EPIs</h4>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
            {episDisponiveis.map(epi => (
              <label key={epi} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <input
                  type="checkbox"
                  checked={episSelecionados.includes(epi)}
                  onChange={() => {
                    setEpisSelecionados(episSelecionados.includes(epi)
                      ? episSelecionados.filter(e => e !== epi)
                      : [...episSelecionados, epi]
                    );
                  }}
                />
                {epi}
              </label>
            ))}
          </div>
        </div>
        </div>
      </section>
      
      {/* Seção de Histórico de Eventos */}
      <section style={{ 
        marginTop: 'var(--space-xl)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <div className="card">
          <div className="card-header">
            <h4>📋 Histórico de Eventos</h4>
          </div>
          <div className="card-body">
            {eventos.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {eventos.map(evento => (
                  <div key={evento.id} className="card" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="card-body">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                        <img 
                          src={evento.frameUrl} 
                          alt="Frame" 
                          width={80} 
                          height={60} 
                          style={{ borderRadius: 'var(--radius-md)' }} 
                        />
                        <div>
                          <strong>{evento.tipo}</strong> <br />
                          {evento.dataHora} <br />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            {evento.descricao}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center">Nenhum evento registrado para esta câmera.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CameraDetails;