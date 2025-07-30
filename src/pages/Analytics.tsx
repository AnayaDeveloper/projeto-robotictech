import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsFilters from '../components/AnalyticsFilters';
import OccurrenceMap from '../components/OccurrenceMap';
import PerformanceCharts from '../components/PerformanceCharts';
import EvidenceViewer from '../components/EvidenceViewer';

export interface AnalyticsFilters {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  alertTypes: ('Invasão' | 'EPI')[];
  selectedCameras: string[];
}

const Analytics: React.FC = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: {
      startDate: '',
      endDate: ''
    },
    alertTypes: ['Invasão', 'EPI'],
    selectedCameras: []
  });

  const [selectedCameraDetails, setSelectedCameraDetails] = useState<{
    cameraId: string;
    alertCount: number;
  } | null>(null);

  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    setFilters(newFilters);
    console.log('Filtros aplicados:', newFilters);
  };

  const handleMarkerClick = (cameraId: string, alertCount: number) => {
    setSelectedCameraDetails({ cameraId, alertCount });
    console.log(`Câmera ${cameraId} clicada - ${alertCount} alertas`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Analytics - Estatísticas de Monitoramento</h2>
        <Link 
          to="/" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#6c757d', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            fontSize: '16px'
          }}
        >
          ← Voltar ao Dashboard
        </Link>
      </div>
      
      {/* Filtros Globais */}
      <AnalyticsFilters 
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <div style={{ marginTop: '30px' }}>
        <h3>🗺️ Mapa de Ocorrências</h3>
        <OccurrenceMap 
          cameras={[]}
          alerts={[]}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {selectedCameraDetails && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '8px',
          border: '1px solid #2196f3'
        }}>
          <h4>📹 Detalhes da Câmera Selecionada</h4>
          <p><strong>ID:</strong> {selectedCameraDetails.cameraId}</p>
          <p><strong>Total de Alertas:</strong> {selectedCameraDetails.alertCount}</p>
          <button
            onClick={() => setSelectedCameraDetails(null)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Fechar
          </button>
        </div>
      )}

      <PerformanceCharts filters={filters} />

      <EvidenceViewer filters={filters} />
    </div>
  );
};

export default Analytics;