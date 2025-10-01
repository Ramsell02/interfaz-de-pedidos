import React from "react";
import { Phone, User } from "lucide-react"; // opcional para iconos
import fondo from "../../img/fondo.jpg";
import "./LandingHero.css"; // importamos el CSS externo
import { useNavigate } from "react-router-dom";

function Landing() {
const navegar = useNavigate()
 function irRegister() {

  navegar("/Register")
 }
 
 
  return (
    <div className="hero-container">
      {/* Imagen de fondo */}
      <img
        src={fondo}
        alt="Conduciendo"
        className="hero-image"
      />

      {/* Íconos arriba a la derecha */}
      <div className="hero-icons">
        <Phone className="icon" />
        <User className="icon" />
      </div>

      {/* Caja izquierda */}
      <div className="hero-box left-box">
        <button onClick={irRegister} className="hero-btn">Click aquí</button>
        <p className="hero-text">Todavía no tiene cuenta</p>
      </div>

      {/* Caja derecha */}
      <div className="hero-box right-box">
        <p>
          Servicio de pedidos por encargo de la frontera y golifto a su casa
        </p>
      </div>
    </div>
  );
}
export default Landing