import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsFilters, { type AnalyticsFiltersType } from '../components/AnalyticsFilters';
import OccurrenceMap from '../components/OccurrenceMap';
import PerformanceCharts from '../components/PerformanceCharts';
import EvidenceViewer from '../components/EvidenceViewer';

const Analytics: React.FC = () => {
  const [filters, setFilters] = useState<AnalyticsFiltersType>({
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

  const handleFiltersChange = (newFilters: AnalyticsFiltersType) => {
    setFilters(newFilters);
    console.log('Filtros aplicados:', newFilters);
  };

  const handleMarkerClick = (cameraId: string, alertCount: number) => {
    setSelectedCameraDetails({ cameraId, alertCount });
    console.log(`Câmera ${cameraId} clicada - ${alertCount} alertas`);
  };

  return (
    <div className="container-fluid fade-in">
      <div className="clean-header" style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 className="professional-title">
          <span className="title-icon">📊</span>
          <span className="title-text">Analytics</span>
        </h1>
        <Link 
          to="/" 
          className="btn btn-secondary btn-back"
        >
          ← Dashboard
        </Link>
      </div>
      
      {/* Filtros Globais */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="card-body">
          <AnalyticsFilters 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="card-header">
          <h3>🗺️ Mapa de Ocorrências</h3>
        </div>
        <div className="card-body">
          <OccurrenceMap 
            cameras={[]}
            alerts={[]}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>

      {selectedCameraDetails && (
        <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="card-header">
            <h4>📹 Detalhes da Câmera Selecionada</h4>
          </div>
          <div className="card-body">
            <p><strong>ID:</strong> {selectedCameraDetails.cameraId}</p>
            <p><strong>Total de Alertas:</strong> {selectedCameraDetails.alertCount}</p>
            <button
              onClick={() => setSelectedCameraDetails(null)}
              className="btn btn-danger btn-sm"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <PerformanceCharts />

      <EvidenceViewer />
    </div>
  );
};

export default Analytics;