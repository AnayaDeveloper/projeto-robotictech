import React from 'react';
import { Link } from 'react-router-dom';
import CameraGrid from '../components/CameraGrid';
import AlertList from '../components/AlertList';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Sistema de Monitoramento de Câmeras</h2>
        <Link 
          to="/analytics" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            fontSize: '16px'
          }}
        >
          📊 Analytics
        </Link>
      </div>
      <CameraGrid/>
      <AlertList/>
    </div>
  );
};

export default Dashboard;