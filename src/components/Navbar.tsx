import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/books">Livros</Link>
                <Link to="/authors">Autores</Link>
            </div>
        </nav>
    );
};

export default Navbar;
