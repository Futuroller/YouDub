import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './AuthLayout/AuthLayout';
import ActivatePage from './ActivatePage';
import m from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <div className={m.container}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path='/main/*' element={<MainLayout />} />
          <Route path='/auth/*' element={<AuthLayout />} />
          <Route path="/auth/activate/:token" element={<ActivatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
