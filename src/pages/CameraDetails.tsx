import React from 'react';
import { useParams } from 'react-router-dom';

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
    url: 'https://videos.pexels.com/video-files/9788684/9788684-uhd_2560_1440_30fps.mp4',
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

const CameraDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const camera = camerasMock.find(cam => cam.id === id);

  // Estado para edição de áreas
  const [editandoAreas, setEditandoAreas] = React.useState(false);
  const [novoPoligono, setNovoPoligono] = React.useState<[number, number][]>([]);
  // Estado para EPIs selecionados
  const [episSelecionados, setEpisSelecionados] = React.useState<string[]>([]);

  if (!camera) {
    return <div>Câmera não encontrada.</div>;
  }

  // Renderização inteligente do vídeo/imagem
  const renderCameraMedia = () => {
    if (camera.url.endsWith('.mp4')) {
      return <video src={camera.url} width="480" height="270" controls />;
    }
    if (camera.url.endsWith('.mjpeg')) {
      return <img src={camera.url} width="480" height="270" alt={camera.nome} />;
    }
    if (camera.url.endsWith('.m3u8')) {
      return (
        <div style={{ width: 480, height: 270, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 14 }}>
          Stream HLS não suportado nativamente
        </div>
      );
    }
    return (
      <div style={{ width: 480, height: 270, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 14 }}>
        Tipo de stream não suportado
      </div>
    );
  };

  // Busca áreas proibidas e detecções para a câmera atual
  const areas = areasProibidasMock.find(a => a.cameraId === camera.id)?.areas || [];
  const boxes = deteccoesIAMock.find(d => d.cameraId === camera.id)?.boxes || [];

  // Manipula clique no vídeo para adicionar pontos ao novo polígono
  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!editandoAreas) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / 480;
    const y = (e.clientY - rect.top) / 270;
    setNovoPoligono([...novoPoligono, [x, y]]);
  };

  return (
    <div>
      <h2>Detalhes da Câmera</h2>
      <h3>{camera.nome}</h3>
      <button
        onClick={() => {
          setEditandoAreas(!editandoAreas);
          setNovoPoligono([]);
        }}
        style={{ marginBottom: 8 }}
      >
        {editandoAreas ? 'Cancelar Edição' : 'Editar Áreas'}
      </button>
      <div
        style={{
          position: 'relative',
          width: 480,
          height: 270,
          marginTop: 16,
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
      {/* Botão para salvar novo polígono */}
      {editandoAreas && novoPoligono.length > 2 && (
        <button
          onClick={() => {
            alert('Área salva (simulação)');
            setNovoPoligono([]);
            setEditandoAreas(false);
          }}
          style={{ marginTop: 8 }}
        >
          Salvar Área Proibida
        </button>
      )}
      <div style={{ marginTop: 16 }}>
        <strong>Status:</strong> {camera.status} <br />
        <strong>Latitude:</strong> {camera.latitude} <br />
        <strong>Longitude:</strong> {camera.longitude}
      </div>
      {/* Configuração de EPIs */}
      <div style={{ marginTop: 24 }}>
        <strong>Configuração de EPIs monitorados:</strong>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          {episDisponiveis.map(epi => (
            <label key={epi}>
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
  );
};

export default CameraDetails;