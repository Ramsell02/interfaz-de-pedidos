import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <p>© 2025 Mi Empresa. Todos los derechos reservados.</p>
        <p>Tel: +506 2255-1234</p>
        <p>Dirección: Avenida Central, San José, Costa Rica</p>
        <p>Correo:CorreoElectronico@gmail.com</p>
      </div>
      <div className="footer-right">
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Contacto</a>
        <a href="#ayuda">Ayuda</a>
      
      </div>
    </footer>
  );
}

export default Footer;
