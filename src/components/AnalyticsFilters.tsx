import React from 'react';

interface Camera {
  id: string;
  nome: string;
}

export interface AnalyticsFilters {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  alertTypes: ('Invasão' | 'EPI')[];
  selectedCameras: string[];
}

interface AnalyticsFiltersProps {
  filters: AnalyticsFilters;
  onFiltersChange: (filters: AnalyticsFilters) => void;
}

// Mock das câmeras disponíveis
const availableCameras: Camera[] = [
  { id: '1', nome: 'Entrada Principal' },
  { id: '2', nome: 'Estacionamento' },
  { id: '3', nome: 'Fundos' }
];

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ filters, onFiltersChange }) => {
  
  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const handleAlertTypeChange = (alertType: 'Invasão' | 'EPI', checked: boolean) => {
    const newAlertTypes = checked 
      ? [...filters.alertTypes, alertType]
      : filters.alertTypes.filter(type => type !== alertType);
    
    onFiltersChange({
      ...filters,
      alertTypes: newAlertTypes
    });
  };

  const handleCameraChange = (cameraId: string, checked: boolean) => {
    const newSelectedCameras = checked
      ? [...filters.selectedCameras, cameraId]
      : filters.selectedCameras.filter(id => id !== cameraId);
    
    onFiltersChange({
      ...filters,
      selectedCameras: newSelectedCameras
    });
  };

  const handleSelectAllCameras = () => {
    const allCameraIds = availableCameras.map(cam => cam.id);
    const isAllSelected = allCameraIds.every(id => filters.selectedCameras.includes(id));
    
    onFiltersChange({
      ...filters,
      selectedCameras: isAllSelected ? [] : allCameraIds
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: { startDate: '', endDate: '' },
      alertTypes: ['Invasão', 'EPI'],
      selectedCameras: []
    });
  };

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '20px', 
      borderRadius: '8px', 
      marginBottom: '20px',
      border: '1px solid #e9ecef'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🔍 Filtros Globais</h3>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Filtro de Data */}
        <div style={{ minWidth: '250px' }}>
          <h4 style={{ marginBottom: '10px' }}>📅 Período</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Data Inicial:</label>
              <input
                type="date"
                value={filters.dateRange.startDate}
                onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Data Final:</label>
              <input
                type="date"
                value={filters.dateRange.endDate}
                onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Filtro de Tipo de Alerta */}
        <div style={{ minWidth: '200px' }}>
          <h4 style={{ marginBottom: '10px' }}>🚨 Tipos de Alerta</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.alertTypes.includes('Invasão')}
                onChange={(e) => handleAlertTypeChange('Invasão', e.target.checked)}
              />
              <span>🚪 Invasão</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.alertTypes.includes('EPI')}
                onChange={(e) => handleAlertTypeChange('EPI', e.target.checked)}
              />
              <span>🦺 EPI</span>
            </label>
          </div>
        </div>

        {/* Filtro de Câmeras */}
        <div style={{ minWidth: '250px' }}>
          <h4 style={{ marginBottom: '10px' }}>📹 Câmeras</h4>
          <div style={{ marginBottom: '10px' }}>
            <button
              onClick={handleSelectAllCameras}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {availableCameras.every(cam => filters.selectedCameras.includes(cam.id)) 
                ? 'Desmarcar Todas' 
                : 'Selecionar Todas'
              }
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '120px', overflowY: 'auto' }}>
            {availableCameras.map(camera => (
              <label key={camera.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={filters.selectedCameras.includes(camera.id)}
                  onChange={(e) => handleCameraChange(camera.id, e.target.checked)}
                />
                <span>{camera.nome}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={clearFilters}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗑️ Limpar Filtros
        </button>
        
        <div style={{ 
          padding: '8px 12px', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          ✅ Filtros aplicados automaticamente
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;