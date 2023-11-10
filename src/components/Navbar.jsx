import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <h2>El Salvador</h2>
                <p className="app-subtitle">Desarrollado por Isidro Marroquin</p>
            </div>
            <a
                href="https://bit.ly/veechika"
                target="_blank"
                rel="noopener noreferrer"
            >
                Telegram
            </a>
        </nav>
    );
};

export default Navbar;
