import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

interface Camera {
  id: string;
  nome: string;
  latitude: string;
  longitude: string;
}

interface Alert {
  id: string;
  cameraId: string;
  cameraNome: string;
  tipo: 'Invasão' | 'EPI';
  dataHora: string;
  frameUrl: string;
}

interface OccurrenceMapProps {
  cameras: Camera[];
  alerts: Alert[];
  onMarkerClick?: (cameraId: string, alertCount: number) => void;
}

const cameras: Camera[] = [
  { id: '1', nome: 'Entrada Principal', latitude: '-23.5505', longitude: '-46.6333' },
  { id: '2', nome: 'Estacionamento', latitude: '-23.5510', longitude: '-46.6340' },
  { id: '3', nome: 'Fundos', latitude: '-23.5520', longitude: '-46.6350' }
];

const mockAlerts: Alert[] = [
  { id: 'a1', cameraId: '1', cameraNome: 'Entrada Principal', tipo: 'Invasão', dataHora: '2025-01-28 08:15', frameUrl: 'https://via.placeholder.com/120x80?text=Frame+1' },
  { id: 'a2', cameraId: '2', cameraNome: 'Estacionamento', tipo: 'EPI', dataHora: '2025-01-28 09:02', frameUrl: 'https://via.placeholder.com/120x80?text=Frame+2' },
  { id: 'a3', cameraId: '3', cameraNome: 'Fundos', tipo: 'Invasão', dataHora: '2025-01-28 09:30', frameUrl: 'https://via.placeholder.com/120x80?text=Frame+3' },
  { id: 'a4', cameraId: '1', cameraNome: 'Entrada Principal', tipo: 'EPI', dataHora: '2025-01-28 10:15', frameUrl: 'https://via.placeholder.com/120x80?text=Frame+4' },
  { id: 'a5', cameraId: '1', cameraNome: 'Entrada Principal', tipo: 'Invasão', dataHora: '2025-01-28 11:20', frameUrl: 'https://via.placeholder.com/120x80?text=Frame+5' },
  { id: 'a6', cameraId: '2', cameraNome: 'Estacionamento', tipo: 'Invasão', dataHora: '2025-01-28 12:45', frameUrl: 'https://via.placeholder.com/120x80?text=Frame+6' },
];

const OccurrenceMap: React.FC<OccurrenceMapProps> = ({ 
  cameras: propCameras, 
  alerts: propAlerts, 
  onMarkerClick 
}) => {
  const camerasToUse = propCameras.length > 0 ? propCameras : cameras;
  const alertsToUse = propAlerts.length > 0 ? propAlerts : mockAlerts;

  const cameraAlertCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    alertsToUse.forEach(alert => {
      counts[alert.cameraId] = (counts[alert.cameraId] || 0) + 1;
    });
    return counts;
  }, [alertsToUse]);

  const getMarkerColor = (alertCount: number) => {
    if (alertCount === 0) return '#28a745';
    if (alertCount <= 2) return '#ffc107'; 
    return '#dc3545';
  };

  const getMarkerRadius = (alertCount: number) => {
    return Math.max(8, Math.min(25, 8 + alertCount * 3));
  };

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        center={[-23.5505, -46.6333]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {camerasToUse.map(camera => {
          const alertCount = cameraAlertCounts[camera.id] || 0;
          const lat = parseFloat(camera.latitude);
          const lng = parseFloat(camera.longitude);
          
          return (
            <CircleMarker
              key={camera.id}
              center={[lat, lng]}
              radius={getMarkerRadius(alertCount)}
              fillColor={getMarkerColor(alertCount)}
              color="#fff"
              weight={2}
              opacity={1}
              fillOpacity={0.8}
              eventHandlers={{
                click: () => onMarkerClick?.(camera.id, alertCount)
              }}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>{camera.nome}</h4>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>Alertas:</strong> {alertCount}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>
                    Lat: {camera.latitude}<br/>
                    Lng: {camera.longitude}
                  </p>
                  {alertCount > 0 && (
                    <button
                      onClick={() => onMarkerClick?.(camera.id, alertCount)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        marginTop: '8px'
                      }}
                    >
                      Ver Detalhes
                    </button>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      
      <div style={{ 
        marginTop: '10px', 
        display: 'flex', 
        gap: '15px', 
        fontSize: '12px',
        alignItems: 'center'
      }}>
        <span><strong>Legenda:</strong></span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28a745' }}></div>
          <span>Sem alertas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffc107' }}></div>
          <span>1-2 alertas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#dc3545' }}></div>
          <span>3+ alertas</span>
        </div>
      </div>
    </div>
  );
};

export default OccurrenceMap;