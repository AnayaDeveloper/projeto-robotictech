import React, { useState } from 'react';

interface CameraFormProps {
  onSubmit: (camera: { nome: string; url: string; latitude: string; longitude: string }) => void;
  initialData?: { nome: string; url: string; latitude: string; longitude: string };
  onCancel?: () => void;
}

const CameraForm: React.FC<CameraFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [latitude, setLatitude] = useState(initialData?.latitude || '');
  const [longitude, setLongitude] = useState(initialData?.longitude || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, url, latitude, longitude });
    setNome('');
    setUrl('');
    setLatitude('');
    setLongitude('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input
        type="text"
        placeholder="Nome da câmera"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL do vídeo"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={e => setLatitude(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={e => setLongitude(e.target.value)}
        required
      />
      <div>
        <button type="submit">Salvar</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>}
      </div>
    </form>
  );
};

export default CameraForm;