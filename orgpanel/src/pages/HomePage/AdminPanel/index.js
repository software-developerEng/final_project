import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router';

function AdminPanel() {
    const navigate = useNavigate(); 


  const gotoPage = (page) => {
    navigate(`/${page}`); 
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="feature">
        <div className="features" onClick={() => gotoPage('feature1')}>
          Feature 1
        </div>
      </div>
      <div className="feature">
        <div className="features" onClick={() => gotoPage('feature2')}>
          Feature 2
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
