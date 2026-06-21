import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar({ showHome = true }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <nav className="navbar shell" aria-label="Main navigation">
        <Link className="brand" to="/">
          Go Business
        </Link>
        <div className="nav-actions">
          {showHome && (
            <Link className="nav-link" to="/">
              Home
            </Link>
          )}
          <button className="btn btn-primary" type="button">
            Try for free
          </button>
          <button className="btn btn-danger-outline" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
}
