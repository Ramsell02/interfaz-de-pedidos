import React from "react";
import { Phone, User } from "lucide-react"; //para los iconos
import fondo from "../../img/fondo.jpg";
import "./LandingHero.css"; 
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

function Landing() {
const navegar = useNavigate()
 function irRegister() {

  navegar("/Register")
 }
  function irLogin() {
    navegar("/Login");
  }
  function irAbajo() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // para que baje suave
    });
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
        <Phone className="icon" onClick={ irAbajo}/>
        <User className="icon" onClick={irLogin} />
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