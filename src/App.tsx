import './styles/App.css';

import { Outlet } from 'react-router-dom';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';

export default function App() {

  

  return (
    <Theme>
      <AppProvider>
        <div className="App">
          <div className="navbar-style">
            <button className="menu-btn">☰</button>
            <Navbar/>
          </div>
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </AppProvider>
    </Theme>
  );
}
