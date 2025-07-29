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

const CameraDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const camera = camerasMock.find(cam => cam.id === id);

  if (!camera) {
    return <div>Câmera não encontrada.</div>;
  }

  // Renderização inteligente do vídeo/imagem
//   const renderCameraMedia = () => {
//     if (camera.url.endsWith('.mp4')) {
//       return <video src={camera.url} width="480" height="270" controls />;
//     }
//     if (camera.url.endsWith('.mjpeg')) {
//       return <img src={camera.url} width="480" height="270" alt={camera.nome} />;
//     }
//     if (camera.url.endsWith('.m3u8')) {
//       return (
//         <div style={{ width: 480, height: 270, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 14 }}>
//           Stream HLS não suportado nativamente
//         </div>
//       );
//     }
//     return (
//       <div style={{ width: 480, height: 270, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 14 }}>
//         Tipo de stream não suportado
//       </div>
//     );
//   };

  return (
    <div>
      <h2>Detalhes da Câmera</h2>
      <h3>{camera.nome}</h3>
      {/* {renderCameraMedia()} */}
      <div style={{ marginTop: 16 }}>
        <strong>Status:</strong> {camera.status} <br />
        <strong>Latitude:</strong> {camera.latitude} <br />
        <strong>Longitude:</strong> {camera.longitude}
      </div>
    </div>
  );
};

export default CameraDetails;