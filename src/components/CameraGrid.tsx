import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraForm from './CameraForm';
import Modal from './Modal';
import { v4 as uuidv4 } from 'uuid';

type CameraStatus = 'online' | 'offline' | 'alerta';

interface Camera {
  id: string;
  nome: string;
  url: string;
  status: CameraStatus;
  latitude: string;
  longitude: string;
}

const statusColor = {
  online: 'green',
  offline: 'red',
  alerta: 'orange',
};

const initialCameras: Camera[] = [
  { id: '1', nome: 'Entrada Principal', url: 'https://videos.pexels.com/video-files/28835670/12490947_2560_1440_25fps.mp4', status: 'online', latitude: '-23.5505', longitude: '-46.6333' },
  { id: '2', nome: 'Estacionamento', url: 'https://videos.pexels.com/video-files/28835670/12490947_2560_1440_25fps.mp4', status: 'alerta', latitude: '-23.5510', longitude: '-46.6340' },
  { id: '3', nome: 'Fundos', url: 'https://videos.pexels.com/video-files/32011319/13643572_2560_1440_24fps.mp4', status: 'offline', latitude: '-23.5520', longitude: '-46.6350' },
];

interface CameraGridProps {
  showForm?: boolean;
  setShowForm?: (show: boolean) => void;
  editCamera?: Camera | null;
  setEditCamera?: (camera: Camera | null) => void;
}

const CameraGrid: React.FC<CameraGridProps> = ({ 
  showForm = false, 
  setShowForm = () => {}, 
  editCamera = null, 
  setEditCamera = () => {} 
}) => {
  const [cameras, setCameras] = useState<Camera[]>(initialCameras);
  const navigate = useNavigate();

  const handleAddCamera = (data: { nome: string; url: string; latitude: string; longitude: string }) => {
    setCameras([
      ...cameras,
      { id: uuidv4(), nome: data.nome, url: data.url, status: 'online', latitude: data.latitude, longitude: data.longitude },
    ]);
    setShowForm(false);
  };

  const handleEditCamera = (data: { nome: string; url: string; latitude: string; longitude: string }) => {
    if (!editCamera) return;
    setCameras(cameras.map(cam =>
      cam.id === editCamera.id
        ? { ...cam, ...data }
        : cam
    ));
    setEditCamera(null);
    setShowForm(false);
  };

  const handleRemoveCamera = (id: string) => {
    setCameras(cameras.filter(cam => cam.id !== id));
  };

  return (
    <div>
      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditCamera(null); }}
        title={editCamera ? 'Editar Câmera' : 'Adicionar Nova Câmera'}
      >
        <CameraForm
          onSubmit={editCamera ? handleEditCamera : handleAddCamera}
          initialData={editCamera ? editCamera : undefined}
          onCancel={() => { setShowForm(false); setEditCamera(null); }}
        />
      </Modal>
      <div className="grid grid-3">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="camera-card mobile-center-card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/camera/${camera.id}`)}
          >
            <video 
              src={camera.url} 
              controls 
              preload="metadata"
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
            <h3>{camera.nome}</h3>
            
            <div className="status-indicator">
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: statusColor[camera.status],
                }}
              ></span>
              {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
            </div>
            
            <div className="button-group">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={e => {
                  e.stopPropagation();
                  setEditCamera(camera);
                  setShowForm(true);
                }}
              >
                ✏️ Editar
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={e => {
                  e.stopPropagation();
                  handleRemoveCamera(camera.id);
                }}
              >
                🗑️ Remover
              </button>
            </div>
            
            <div className="coordinates">
              <strong>Lat:</strong> {camera.latitude} <strong>Lon:</strong> {camera.longitude}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraGrid;