import React from 'react';
import '../main';

interface Alert {
  id: string;
  cameraNome: string;
  tipo: 'Invasão' | 'EPI';
  dataHora: string;
  frameUrl: string;
  severity: 'high' | 'medium' | 'low';
  status: 'new' | 'viewed' | 'resolved';
}

const alertsMock: Alert[] = [
  {
    id: 'a1',
    cameraNome: 'Entrada Principal',
    tipo: 'Invasão',
    dataHora: '2025-07-28 08:15',
    frameUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNkYzI2MjYiLz48dGV4dCB4PSI2MCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj7wn5qoIElOVkFTw4NPPC90ZXh0Pjwvc3ZnPg==',
    severity: 'high',
    status: 'new'
  },
  {
    id: 'a2',
    cameraNome: 'Estacionamento',
    tipo: 'EPI',
    dataHora: '2025-07-28 09:02',
    frameUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNmNTllMGIiLz48dGV4dCB4PSI2MCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj7ijaDvuI8gRVBJPC90ZXh0Pjwvc3ZnPg==',
    severity: 'medium',
    status: 'viewed'
  },
  {
    id: 'a3',
    cameraNome: 'Fundos',
    tipo: 'Invasão',
    dataHora: '2025-07-28 09:30',
    frameUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNkYzI2MjYiLz48dGV4dCB4PSI2MCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj7wn5qoIElOVkFTw4NPPC90ZXh0Pjwvc3ZnPg==',
    severity: 'high',
    status: 'new'
  },
  {
    id: 'a4',
    cameraNome: 'Área de Produção',
    tipo: 'EPI',
    dataHora: '2025-07-28 10:45',
    frameUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiMxMGI5ODEiLz48dGV4dCB4PSI2MCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj7ijaDvuI8gRVBJPC90ZXh0Pjwvc3ZnPg==',
    severity: 'low',
    status: 'resolved'
  },
  {
    id: 'a5',
    cameraNome: 'Portaria',
    tipo: 'Invasão',
    dataHora: '2025-07-28 11:20',
    frameUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNmNTllMGIiLz48dGV4dCB4PSI2MCIgeT0iNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj7wn5qoIElOVkFTw4NPPC90ZXh0Pjwvc3ZnPg==',
    severity: 'medium',
    status: 'viewed'
  }
];

const AlertList: React.FC = () => {
  const getAlertIcon = (tipo: string) => {
    return tipo === 'Invasão' ? '🚨' : '⚠️';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return { text: 'Novo', color: '#dc2626', bg: '#fef2f2' };
      case 'viewed': return { text: 'Visualizado', color: '#f59e0b', bg: '#fffbeb' };
      case 'resolved': return { text: 'Resolvido', color: '#10b981', bg: '#f0fdf4' };
      default: return { text: 'Desconhecido', color: '#6b7280', bg: '#f9fafb' };
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return `Hoje às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <div className="alerts-summary">
          <span className="alert-count">{alertsMock.filter(a => a.status === 'new').length}</span>
          <span className="alert-label">novos alertas</span>
        </div>
        <button className="btn btn-sm btn-outline-primary">
          Ver Todos
        </button>
      </div>

      <div className="alerts-feed">
        {alertsMock.map(alert => {
          const statusBadge = getStatusBadge(alert.status);
          
          return (
            <div key={alert.id} className={`alert-item ${alert.status}`}>
              <div className="alert-indicator" style={{ backgroundColor: getSeverityColor(alert.severity) }}></div>
              
              <div className="alert-thumbnail">
                <img 
                  src={alert.frameUrl} 
                  alt="Frame do alerta"
                />
                <div className="alert-type-icon">{getAlertIcon(alert.tipo)}</div>
              </div>

              <div className="alert-content">
                <div className="alert-header-row">
                  <h4 className="alert-camera">{alert.cameraNome}</h4>
                  <span 
                    className="alert-status-badge"
                    style={{ 
                      color: statusBadge.color, 
                      backgroundColor: statusBadge.bg 
                    }}
                  >
                    {statusBadge.text}
                  </span>
                </div>
                
                <div className="alert-details">
                  <span className="alert-type">{alert.tipo}</span>
                  <span className="alert-time">{formatDateTime(alert.dataHora)}</span>
                </div>
              </div>

              <div className="alert-actions">
                <button className="alert-action-btn" title="Visualizar detalhes">
                  👁️
                </button>
                <button className="alert-action-btn" title="Marcar como resolvido">
                  ✓
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="alerts-footer">
        <button className="btn btn-outline-secondary btn-sm">
          Carregar Mais Alertas
        </button>
      </div>
    </div>
  );
};

export default AlertList;