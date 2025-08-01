import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-200 transition-colors ">
          TaskFlow
        </Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="hidden md:inline py-2 truncate max-w-xs">
                Hello, {currentUser.email}
              </span>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hover:underline py-2 px-3 hover:bg-blue-700 rounded transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="hover:underline py-2 px-3 hover:bg-blue-700 rounded transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}