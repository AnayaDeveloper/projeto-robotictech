import React from 'react';
import CameraGrid from '../components/CameraGrid';
import AlertList from '../components/AlertList';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>Dashboard de Câmeras</h2>
      <CameraGrid/>
      <AlertList/>
    </div>
  );
};

export default Dashboard;