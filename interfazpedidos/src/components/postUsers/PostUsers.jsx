
import React, { useState } from 'react'
import ServicesUsers from '../../services/ServicesUsers'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import GetProducts from '../getproducts/GetProducts'

function PostUsers() {
 const navegar = useNavigate()
  const [NuevoNombre, setNuevoNombre] = useState("")
  const [NuevaCedula, setNuevaCedula] = useState("")
  const [NuevoNumero, setNuevoNumero] = useState("")
  const [NuevoCorreo, setNuevoCorreo] = useState("")
  const [NuevaContrasena, setNuevaContrasena] = useState("")
 



  const agregarUsuario = async () => {
    const llamerUsuarios = await ServicesUsers.getUsers()

    const verificacion = llamerUsuarios.find(user => NuevoCorreo === user.correo)
    console.log(verificacion);
    if (NuevoNombre === "" || NuevaCedula === "" || NuevoCorreo === "" || NuevaContrasena === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos vacios, revise los datos',
      });
      return
    }

    if (verificacion === undefined) {
      const UsuarioNuevo = {
        nombre: NuevoNombre,
        cedula: NuevaCedula,
        correo: NuevoCorreo,
        numeroTel: NuevoNumero,
        contrasena: NuevaContrasena,
        rol:"Cliente",
      }

      const UsuarioCreado = await ServicesUsers.postUsers(UsuarioNuevo)
      Swal.fire({
            title: "Usuario creado!",
            text: "Usuario creado con exito!",
            icon: "success",
            confirmButtonText: "Ir a login",
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirección al login
                navegar("/Login")
            }
        });
      
      
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "el correo electronico ya fue usado",

      });
    }



  }
 
 
 
 
 
 
 
 
    return (
   <div className="postuser-container">
      <h2>Registrar Usuario</h2>
      <div  className="form-grid">
        <label htmlFor="nombre">Nombre Completo</label>
        <br />
        <input type="text" id='nombre' placeholder='Nombre Completo' value={NuevoNombre} onChange={(n) => setNuevoNombre(n.target.value)} />
        <br />
        <label htmlFor="usuario">Numero de Cedula</label>
        <br />
        <input type="text" id='cedula' placeholder='Cedula' value={NuevaCedula} onChange={(n) => setNuevaCedula(n.target.value)} />
        <br />
        <label htmlFor="correo">Correo Electrónico</label>
        <br />
        <input type="email" id='correo' placeholder='Correo Electrónico' value={NuevoCorreo} onChange={(n) => setNuevoCorreo(n.target.value)} />
        <br />
        <label htmlFor="telefono">Numero de Telefono</label>
        <br />
        <input type="text" id='telefono' placeholder='Numero de Telefono' value={NuevoNumero} onChange={(n) => setNuevoNumero(n.target.value)} />
        <br />
        <label htmlFor="contrasena">Contraseña</label>
        <br />
        <input type="text" id='contrasena' placeholder='Contraseña' value={NuevaContrasena} onChange={(n) => setNuevaContrasena(n.target.value)} />
        <br />
        <button className="btn-primary" onClick={agregarUsuario}>Crear Usuario</button>

      </div>
    </div>
  )
}

export default PostUsers