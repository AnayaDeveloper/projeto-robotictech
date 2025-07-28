import React from 'react';

interface CameraDetailsProps {
  cameraId: string;
}

const CameraDetails: React.FC<CameraDetailsProps> = ({ cameraId }) => {

  return (
    <div>
      <h2>Detalhes da Câmera</h2>
      <p>ID da câmera: {cameraId}</p>
      {/* Visualizador principal do vídeo */}
      {/* Polígonos das áreas proibidas */}
      {/* Detecções simuladas da IA */}
      {/* Ferramenta de desenho de áreas */}
      {/* Painel de configuração de EPIs */}
      {/* Histórico de eventos */}
    </div>
  );
};

export default CameraDetails;