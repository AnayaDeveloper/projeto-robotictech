import React from 'react';

interface Camera {
  id: string;
  nome: string;
}

export interface AnalyticsFiltersType {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  alertTypes: ('Invasão' | 'EPI')[];
  selectedCameras: string[];
}

interface AnalyticsFiltersProps {
  filters: AnalyticsFiltersType;
  onFiltersChange: (filters: AnalyticsFiltersType) => void;
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



  return (
    <div>
      {/* Grid de Filtros */}
      <div className="grid grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        
        {/* Filtro de Data */}
        <div className="card">
          <div className="card-header">
            <h4 style={{ margin: 0 }}>📅 Período</h4>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: 'var(--space-xs)', 
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Data Inicial:
                </label>
                <input
                  type="date"
                  value={filters.dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: 'var(--space-xs)', 
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Data Final:
                </label>
                <input
                  type="date"
                  value={filters.dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filtro de Tipo de Alerta */}
        <div className="card">
          <div className="card-header">
            <h4 style={{ margin: 0 }}>🚨 Tipos de Alerta</h4>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)', 
                cursor: 'pointer',
                padding: 'var(--space-xs)',
                borderRadius: 'var(--radius-sm)',
                transition: 'background-color 0.2s ease',
                fontSize: '0.875rem'
              }}>
                <input
                  type="checkbox"
                  checked={filters.alertTypes.includes('Invasão')}
                  onChange={(e) => handleAlertTypeChange('Invasão', e.target.checked)}
                  style={{ 
                    margin: 0,
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
                  }}
                />
                <span style={{ lineHeight: '1.2' }}>🚪 Invasão</span>
              </label>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)', 
                cursor: 'pointer',
                padding: 'var(--space-xs)',
                borderRadius: 'var(--radius-sm)',
                transition: 'background-color 0.2s ease',
                fontSize: '0.875rem'
              }}>
                <input
                  type="checkbox"
                  checked={filters.alertTypes.includes('EPI')}
                  onChange={(e) => handleAlertTypeChange('EPI', e.target.checked)}
                  style={{ 
                    margin: 0,
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
                  }}
                />
                <span style={{ lineHeight: '1.2' }}>🦺 EPI</span>
              </label>
            </div>
          </div>
        </div>

        {/* Filtro de Câmeras */}
        <div className="card">
          <div className="card-header">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: 'var(--space-sm)'
            }}>
              <h4 style={{ margin: 0, flexShrink: 0 }}>📹 Câmeras</h4>
            </div>
          </div>
          <div className="card-body">
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'var(--space-xs)', 
              maxHeight: '120px', 
              overflowY: 'auto',
              paddingRight: 'var(--space-xs)'
            }}>
              {availableCameras.map(camera => (
                <label 
                  key={camera.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-sm)', 
                    cursor: 'pointer',
                    padding: 'var(--space-xs)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background-color 0.2s ease',
                    fontSize: '0.875rem'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={filters.selectedCameras.includes(camera.id)}
                    onChange={(e) => handleCameraChange(camera.id, e.target.checked)}
                    style={{ 
                      margin: 0,
                      width: '16px',
                      height: '16px',
                      flexShrink: 0
                    }}
                  />
                  <span style={{ lineHeight: '1.2' }}>{camera.nome}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;