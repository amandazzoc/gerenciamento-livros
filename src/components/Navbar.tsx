import { BookHeart, Home, UserPenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="navbar">
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
