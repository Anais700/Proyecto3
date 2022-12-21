import React from "react";
import Logo from "../Images/Logo PB.jpg"
import {FiSearch} from "react-icons/fi"

const Navbar = () => {

  const role = localStorage.getItem("role")
  const name = localStorage.getItem("name")

  // Navbar para usuario No Logueado
  const Nav1 = () => {
    return(
  <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">

     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <a className="navbar-brand" href="/">Pink Boutique</a>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/register">Registro</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/login">Iniciar sesión</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/categories">Categorías</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/subcategories">Subcategorías</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/products">Productos</a>
        </li>
      </ul>
    </div>
    <a className="navbar-brand" href="/">
       <img src={Logo} alt="logo" width="58" height="58" className="logo position-absolute top-0 start-50 translate-middle-x mb-2"/>
    </a>
      <form className="d-flex" role="search">
        <input className="form-control me-1" type="search" placeholder="Buscar..." aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">
          <FiSearch/>
        </button>
      </form>
  </div>
</nav>
    )
  };

  // Navbar para usuario Logueado
  const NavUser = () => {
    return(
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Bienvenid@, {name}</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/profile">Mi perfil</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Carrito</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Favoritos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/categories">Categorías</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/subcategories">Subcategorías</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/products">Productos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/logout">Cerrar sesión</a>
          </li>
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
    )};

  // Navbar para usuario Administrador
  const NavAdmin = () => {
    return(
      <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Bienvenid@, {name}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/profile">Mi perfil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Carrito</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/users">Usuarios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/newCategory">Crear categorías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/newSubcategories">Crear subcategorías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/newProduct">Añadir productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/categories">Categorías</a>
            </li>
 
            <li className="nav-item">
            <a className="nav-link" href="/logout">Cerrar sesión</a>
          </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
      )};

    let navbar = role == 0? NavUser() : role == 1? NavUser() : role == 2? NavAdmin() : Nav1();

  return(
    <div>
      {navbar}
    </div>
  )
};

export default Navbar;