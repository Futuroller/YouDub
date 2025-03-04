import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './AuthLayout/AuthLayout';
import m from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <div className={m.container}>
        <Routes>
          <Route path='/main/*' element={<MainLayout />} />
          <Route path='/auth/*' element={<AuthLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
