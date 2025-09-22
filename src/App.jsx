import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './routes/publicRoutes';
import AdminRoutes from './Admin/routes/adminRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Rutas de admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
