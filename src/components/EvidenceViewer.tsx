import React, { useState, useMemo } from 'react';

interface Evidence {
  id: string;
  cameraId: string;
  cameraNome: string;
  tipo: 'Invasão' | 'EPI';
  dataHora: string;
  frameUrl: string;
  confianca: number;
  descricao: string;
}

interface EvidenceViewerProps {
  filters: {
    dateRange: { startDate: string; endDate: string };
    alertTypes: ('Invasão' | 'EPI')[];
    selectedCameras: string[];
  };
}

const mockEvidences: Evidence[] = [
  {
    id: 'e1',
    cameraId: '1',
    cameraNome: 'Entrada Principal',
    tipo: 'Invasão',
    dataHora: '2025-01-28 08:15:23',
    frameUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center',
    confianca: 95,
    descricao: 'Pessoa não autorizada detectada na entrada'
  },
  {
    id: 'e2',
    cameraId: '2',
    cameraNome: 'Estacionamento',
    tipo: 'EPI',
    dataHora: '2025-01-28 09:02:15',
    frameUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&crop=center',
    confianca: 88,
    descricao: 'Funcionário sem capacete de segurança'
  },
  {
    id: 'e3',
    cameraId: '3',
    cameraNome: 'Fundos',
    tipo: 'Invasão',
    dataHora: '2025-01-28 09:30:45',
    frameUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&crop=center',
    confianca: 92,
    descricao: 'Acesso não autorizado à área restrita'
  },
  {
    id: 'e4',
    cameraId: '1',
    cameraNome: 'Entrada Principal',
    tipo: 'EPI',
    dataHora: '2025-01-28 10:15:30',
    frameUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop&crop=center',
    confianca: 91,
    descricao: 'Funcionário sem óculos de proteção'
  },
  {
    id: 'e5',
    cameraId: '1',
    cameraNome: 'Entrada Principal',
    tipo: 'Invasão',
    dataHora: '2025-01-28 11:20:12',
    frameUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop&crop=center',
    confianca: 87,
    descricao: 'Tentativa de acesso fora do horário'
  },
  {
    id: 'e6',
    cameraId: '2',
    cameraNome: 'Estacionamento',
    tipo: 'Invasão',
    dataHora: '2025-01-28 12:45:18',
    frameUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center',
    confianca: 83,
    descricao: 'Veículo não autorizado no estacionamento'
  }
];

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ filters }) => {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [sortBy, setSortBy] = useState<'dataHora' | 'confianca' | 'tipo'>('dataHora');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  const filteredEvidences = useMemo(() => {
    let filtered = mockEvidences.filter(evidence => {
      const typeMatch = filters.alertTypes.length === 0 || filters.alertTypes.includes(evidence.tipo);
      const cameraMatch = filters.selectedCameras.length === 0 || filters.selectedCameras.includes(evidence.cameraId);
      
      return typeMatch && cameraMatch;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'dataHora':
          comparison = new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime();
          break;
        case 'confianca':
          comparison = a.confianca - b.confianca;
          break;
        case 'tipo':
          comparison = a.tipo.localeCompare(b.tipo);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [filters, sortBy, sortOrder]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#28a745';
    if (confidence >= 80) return '#ffc107';
    return '#dc3545';
  };

  const getTypeColor = (type: string) => {
    return type === 'Invasão' ? '#ff6b6b' : '#4ecdc4';
  };

  // Debug: Log das evidências filtradas
  console.log('🔍 Evidências filtradas:', filteredEvidences);
  console.log('🖼️ URLs das imagens:', filteredEvidences.map(e => ({ id: e.id, frameUrl: e.frameUrl })));

  return (
    <div style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>🖼️ Visualização de Evidências</h3>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '6px 10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="dataHora">Data/Hora</option>
            <option value="confianca">Confiança</option>
            <option value="tipo">Tipo</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              padding: '6px 10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '20px' 
      }}>
        {filteredEvidences.map(evidence => (
          <div
            key={evidence.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={() => setSelectedEvidence(evidence)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={evidence.frameUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNmM3NTdkIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPgogICAgU2VtIGltYWdlbQogIDwvdGV4dD4KICA8L3N2Zz4='}
                alt={`Evidência ${evidence.id}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  backgroundColor: '#f8f9fa'
                }}
                onLoadStart={() => {
                  console.log(`🔄 Iniciando carregamento: ${evidence.frameUrl}`);
                  setLoadingImages(prev => new Set(prev).add(evidence.id));
                }}
                onLoad={() => {
                  setLoadingImages(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(evidence.id);
                    return newSet;
                  });
                  console.log(`✅ Imagem carregada com sucesso: ${evidence.frameUrl}`);
                }}
                onError={(e) => {
                  setLoadingImages(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(evidence.id);
                    return newSet;
                  });
                  const target = e.target as HTMLImageElement;
                  console.log(`❌ ERRO ao carregar imagem: ${evidence.frameUrl}`);
                  console.log(`❌ Detalhes do erro:`, e);
                  target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#f8f9fa"/>
                      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial, sans-serif" font-size="14">
                        📷 Frame não disponível
                      </text>
                    </svg>
                  `)}`;
                }}
              />
              
              {loadingImages.has(evidence.id) && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(248, 249, 250, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: '#6c757d'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #dee2e6',
                      borderTop: '2px solid #007bff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Carregando...
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  style={{
                    backgroundColor: getTypeColor(evidence.tipo),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {evidence.tipo}
                </span>
                
                <span
                  style={{
                    color: getConfidenceColor(evidence.confianca),
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {evidence.confianca}%
                </span>
              </div>
              
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                📹 {evidence.cameraNome}
              </h4>
              
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                🕒 {new Date(evidence.dataHora).toLocaleString('pt-BR')}
              </p>
              
              <p style={{ margin: '0', fontSize: '13px', color: '#888', lineHeight: '1.4' }}>
                {evidence.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredEvidences.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p>📭 Nenhuma evidência encontrada com os filtros aplicados.</p>
        </div>
      )}

      {selectedEvidence && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedEvidence(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>🔍 Detalhes da Evidência</h3>
              <button
                onClick={() => setSelectedEvidence(null)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            
            <img
              src={selectedEvidence.frameUrl}
              alt="Evidência ampliada"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
                borderRadius: '4px',
                marginBottom: '15px',
                backgroundColor: '#f8f9fa'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f8f9fa"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial, sans-serif" font-size="16">
                      📷 Frame não disponível
                    </text>
                  </svg>
                `)}`;
              }}
            />
            
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <p><strong>ID:</strong> {selectedEvidence.id}</p>
              <p><strong>Câmera:</strong> {selectedEvidence.cameraNome}</p>
              <p><strong>Tipo:</strong> 
                <span style={{
                  backgroundColor: getTypeColor(selectedEvidence.tipo),
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  marginLeft: '8px',
                  fontSize: '12px'
                }}>
                  {selectedEvidence.tipo}
                </span>
              </p>
              <p><strong>Data/Hora:</strong> {new Date(selectedEvidence.dataHora).toLocaleString('pt-BR')}</p>
              <p><strong>Confiança:</strong> 
                <span style={{ color: getConfidenceColor(selectedEvidence.confianca), fontWeight: 'bold' }}>
                  {selectedEvidence.confianca}%
                </span>
              </p>
              <p><strong>Descrição:</strong> {selectedEvidence.descricao}</p>
            </div>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e8f4f8',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>📊 Resumo:</strong> {filteredEvidences.length} evidência(s) encontrada(s)
        {filters.alertTypes.length > 0 && (
          <span> • Tipos: {filters.alertTypes.join(', ')}</span>
        )}
        {filters.selectedCameras.length > 0 && (
          <span> • Câmeras: {filters.selectedCameras.join(', ')}</span>
        )}
      </div>
    </div>
  );
};

export default EvidenceViewer;