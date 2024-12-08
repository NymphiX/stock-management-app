import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';
import WarehouseDetail from './components/WarehouseDetail';
import WarehouseList from './components/WarehouseList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stock">Stock</Link>
            </li>
            <li>
              <Link to="/warehouses">Warehouses</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/warehouses" element={<WarehouseList />} />
          <Route path="/warehouse/:id" element={<WarehouseDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;