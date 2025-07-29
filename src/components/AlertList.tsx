import React from 'react';

interface Alert {
  id: string;
  cameraNome: string;
  tipo: 'Invasão' | 'EPI';
  dataHora: string;
  frameUrl: string;
}

const alertsMock: Alert[] = [
  {
    id: 'a1',
    cameraNome: 'Entrada Principal',
    tipo: 'Invasão',
    dataHora: '2025-07-28 08:15',
    frameUrl: 'https://via.placeholder.com/120x80?text=Frame+1',
  },
  {
    id: 'a2',
    cameraNome: 'Estacionamento',
    tipo: 'EPI',
    dataHora: '2025-07-28 09:02',
    frameUrl: 'https://via.placeholder.com/120x80?text=Frame+2',
  },
  {
    id: 'a3',
    cameraNome: 'Fundos',
    tipo: 'Invasão',
    dataHora: '2025-07-28 09:30',
    frameUrl: 'https://via.placeholder.com/120x80?text=Frame+3',
  },
];

const AlertList: React.FC = () => {
  return (
    <div style={{ marginTop: 32 }}>
      <h3>Alertas Recentes</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {alertsMock.map(alert => (
          <li key={alert.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <img src={alert.frameUrl} alt="Frame" width={80} height={60} style={{ marginRight: 16, borderRadius: 4 }} />
            <div>
              <strong>{alert.cameraNome}</strong> <br />
              Tipo: {alert.tipo} <br />
              Data/Hora: {alert.dataHora}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;