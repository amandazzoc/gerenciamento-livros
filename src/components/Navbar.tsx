import { BookHeart, Home, UserPenIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-btn');

    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        console.log('click');
      });
    }
    
    return () => {
      if (menuBtn && sidebar) {
        menuBtn.removeEventListener('click', () => {
          sidebar.classList.toggle('open');
          console.log('clicked');
        });
      }
    };
  }, []);

  return (
    <nav className="sidebar ">
      <div className="icon">
        <img src="/public/estante-de-livros.png" alt='Logo'/>
      </div>
      <div className="links">
        <Link to="/">
          <div className="nav-item">
            <Home />
            Home
          </div>
        </Link>
        <Link to="/books">
          <div className="nav-item">
            <BookHeart />
            Livros
          </div>
        </Link>
        <Link to="/authors">
          <div className="nav-item">
            <UserPenIcon />
            Autores
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
