import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CameraGrid from '../components/CameraGrid';
import AlertList from '../components/AlertList';

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editCamera, setEditCamera] = useState<any>(null);

  return (
    <div className="container-fluid fade-in">
      {/* Header - Responsivo */}
      <section style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 'var(--space-lg)',
        marginBottom: 'var(--space-xl)',
        paddingBottom: 'var(--space-md)',
        borderBottom: '1px solid var(--border-light)',
        flexDirection: 'row',
        gap: 'var(--space-md)'
      }}
      className="mobile-stack">
        <h1 className="professional-title">
          <span className="title-icon">🛡️</span>
          <span className="title-text">Monitoramento de Câmeras</span>
        </h1>
        <Link 
          to="/analytics" 
          className="btn btn-primary mobile-full-width btn-analytics"
        >
          📊 Analytics
        </Link>
      </section>

      {/* Seção de Câmeras */}
      <section style={{ 
        marginTop: 'var(--space-xl)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <h3 className="hide-mobile">📹 Câmeras</h3>
        <h3 className="show-mobile" style={{ textAlign: 'center' }}>📹 Câmeras</h3>
        <CameraGrid 
          showForm={showForm}
          setShowForm={setShowForm}
          editCamera={editCamera}
          setEditCamera={setEditCamera}
        />
      </section>

      {/* Botão Adicionar Câmera - Entre as seções */}
      <section className="btn-adicionar" style={{ 
        marginTop: 'var(--space-xl)', 
        marginBottom: 'var(--space-xl)',
        textAlign: 'left'
      }}>
        <button 
          onClick={() => { setShowForm(true); setEditCamera(null); }}
          className="btn btn-secondary"
        >
          Adicionar Câmera
        </button>
      </section>

      {/* Seção de Alertas */}
      <section style={{ 
        marginTop: 'var(--space-xl)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <h3 className="hide-mobile">🚨 Alertas Recentes</h3>
        <h3 className="show-mobile" style={{ textAlign: 'center' }}>🚨 Alertas</h3>
        <AlertList/>
      </section>
    </div>
  );
};

export default Dashboard;