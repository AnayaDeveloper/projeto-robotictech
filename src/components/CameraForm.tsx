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
    <form onSubmit={handleSubmit} className="camera-form">
      <div className="form-row">
        <input
          type="text"
          placeholder="Nome da câmera"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="text"
          placeholder="URL do vídeo"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">Salvar</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>}
      </div>
    </form>
  );
};

export default CameraForm;