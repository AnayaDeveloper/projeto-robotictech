import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraForm from './CameraForm';
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
  { id: '1', nome: 'Entrada Principal', url: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'online', latitude: '-23.5505', longitude: '-46.6333' },
  { id: '2', nome: 'Estacionamento', url: 'https://www.w3schools.com/html/movie.mp4', status: 'alerta', latitude: '-23.5510', longitude: '-46.6340' },
  { id: '3', nome: 'Corredor', url: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'offline', latitude: '-23.5520', longitude: '-46.6350' },
];

const CameraGrid: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[]>(initialCameras);
  const [showForm, setShowForm] = useState(false);
  const [editCamera, setEditCamera] = useState<Camera | null>(null);
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
      <button onClick={() => { setShowForm(true); setEditCamera(null); }}>Adicionar Câmera</button>
      {showForm && (
        <CameraForm
          onSubmit={editCamera ? handleEditCamera : handleAddCamera}
          initialData={editCamera ? editCamera : undefined}
          onCancel={() => { setShowForm(false); setEditCamera(null); }}
        />
      )}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: 20 }}>
        {cameras.map((camera) => (
          <div
            key={camera.id}
            style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 250, cursor: 'pointer' }}
            onClick={() => navigate(`/camera/${camera.id}`)}
          >
            <video src={camera.url} width="220" height="120" controls />
            <h3>{camera.nome}</h3>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: statusColor[camera.status],
                  marginRight: 8,
                }}
              ></span>
              {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
            </div>
            <div style={{ marginTop: 8 }}>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setEditCamera(camera);
                  setShowForm(true);
                }}
              >
                Editar
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleRemoveCamera(camera.id);
                }}
                style={{ marginLeft: 8, color: 'red' }}
              >
                Remover
              </button>
            </div>
            <div style={{ fontSize: 12, marginTop: 8 }}>
              <strong>Lat:</strong> {camera.latitude} <strong>Lon:</strong> {camera.longitude}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraGrid;