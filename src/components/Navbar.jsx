import { Link } from "react-router-dom";
import { Film, Menu, X } from "lucide-react";
import Swal from "sweetalert2";
import { parseJwt } from "../utils/jwtUtils";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userAuth");
        window.location.href = "/";
      }
    });
  };

  const userAuth = JSON.parse(localStorage.getItem('userAuth') || '{}');
  const token = userAuth.token;
  let role = null;

  if (token) {
    if (typeof token === 'string') {
      const decoded = parseJwt(token);
      if (decoded) {
        role = decoded.role || decoded.roles || decoded.authorities;
      }
    } else if (typeof token === 'object') {
      role = token.role || token.roles || token.authorities;
    }

    if (Array.isArray(role)) {
      role = role[0]?.authority || role[0];
    }
  }

  const isAdmin = role === 'ADMIN' || (typeof role === 'string' && role.includes('ADMIN'));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="navbar bg-linear-to-r from-purple-900 to-indigo-900 text-white shadow-lg relative z-50">
      <div className="flex-1">
        <div className="flex items-center px-4">
          <Film className="mr-2" size={28} />
          <span className="text-xl font-bold">PelisMax</span>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          {isAdmin && (
            <>
              <li>
                <Link to="/calificaciones" className="btn btn-ghost hover:bg-purple-800 font-medium">
                  Lista de Calificaciones
                </Link>
              </li>
              <li>
                <Link to="/" className="btn btn-ghost hover:bg-purple-800 font-medium">
                  Lista de Películas
                </Link>
              </li>
              <li>
                <Link to="/crearPelicula" className="btn btn-ghost hover:bg-purple-800 font-medium">
                  Crear Película
                </Link>
              </li>
              <li>
                <Link to="/usuarios" className="btn btn-ghost hover:bg-purple-800 font-medium">
                  Usuarios
                </Link>
              </li>
            </>
          )}
          <li>
            <button onClick={handleLogout} className="btn btn-ghost hover:bg-purple-800 font-medium">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex-none lg:hidden">
        <button onClick={toggleMenu} className="btn btn-ghost hover:bg-purple-800">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-indigo-900 shadow-xl lg:hidden flex flex-col p-4 gap-2 animate-fade-in-down border-t border-purple-700">
          {isAdmin && (
            <>
              <Link to="/calificaciones" onClick={closeMenu} className="btn btn-ghost w-full justify-start hover:bg-purple-800">
                Lista de Calificaciones
              </Link>
              <Link to="/" onClick={closeMenu} className="btn btn-ghost w-full justify-start hover:bg-purple-800">
                Lista de Películas
              </Link>
              <Link to="/crearPelicula" onClick={closeMenu} className="btn btn-ghost w-full justify-start hover:bg-purple-800">
                Crear Película
              </Link>
              <Link to="/usuarios" onClick={closeMenu} className="btn btn-ghost w-full justify-start hover:bg-purple-800">
                Usuarios
              </Link>
            </>
          )}
          <button onClick={() => { closeMenu(); handleLogout(); }} className="btn btn-ghost w-full justify-start hover:bg-purple-800 text-red-300">
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

