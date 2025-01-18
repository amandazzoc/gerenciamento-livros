import './styles/App.css';

import { Outlet } from 'react-router-dom';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Theme>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </Theme>
  );
}
