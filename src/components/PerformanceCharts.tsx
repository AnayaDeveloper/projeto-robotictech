import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts';

interface PerformanceChartsProps {
  filters: {
    dateRange: { startDate: string; endDate: string };
    alertTypes: ('Invasão' | 'EPI')[];
    selectedCameras: string[];
  };
}

const timelineData = [
  { hora: '08:00', invasao: 2, epi: 1 },
  { hora: '09:00', invasao: 1, epi: 3 },
  { hora: '10:00', invasao: 4, epi: 2 },
  { hora: '11:00', invasao: 3, epi: 1 },
  { hora: '12:00', invasao: 2, epi: 4 },
  { hora: '13:00', invasao: 1, epi: 2 },
  { hora: '14:00', invasao: 3, epi: 3 },
  { hora: '15:00', invasao: 2, epi: 1 }
];

const alertDistribution = [
  { name: 'Invasão', value: 18, color: '#ff6b6b' },
  { name: 'EPI', value: 17, color: '#4ecdc4' }
];

const topCameras = [
  { camera: 'Entrada Principal', alertas: 15 },
  { camera: 'Estacionamento', alertas: 12 },
  { camera: 'Fundos', alertas: 8 }
];

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ filters }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3>📊 Gráficos de Desempenho</h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '30px',
        marginTop: '20px'
      }}>
        
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}>
          <h4 style={{ marginTop: 0 }}>📈 Alertas ao Longo do Tempo</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="invasao" 
                stroke="#ff6b6b" 
                strokeWidth={2}
                name="Invasão"
              />
              <Line 
                type="monotone" 
                dataKey="epi" 
                stroke="#4ecdc4" 
                strokeWidth={2}
                name="EPI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ 
          backgroundColor: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}>
          <h4 style={{ marginTop: 0 }}>🥧 Distribuição de Alertas</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={alertDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {alertDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px', 
            marginTop: '10px',
            fontSize: '14px'
          }}>
            {alertDistribution.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: item.color, 
                  borderRadius: '2px' 
                }}></div>
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          gridColumn: 'span 2'
        }}>
          <h4 style={{ marginTop: 0 }}>🏆 Top Câmeras com Mais Alertas</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={topCameras}
              layout="horizontal"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="camera" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="alertas" fill="#45b7d1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4 style={{ marginTop: 0 }}>📋 Resumo dos Dados</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Total de Alertas:</strong> 35
          </div>
          <div>
            <strong>Período Mais Ativo:</strong> 10:00 - 12:00
          </div>
          <div>
            <strong>Câmera Mais Ativa:</strong> Entrada Principal
          </div>
          <div>
            <strong>Tipo Mais Comum:</strong> Invasão (51%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;