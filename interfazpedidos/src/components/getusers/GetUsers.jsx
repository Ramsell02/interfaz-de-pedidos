import { useState,useEffect } from 'react'
import ServicesUsers from '../../services/ServicesUsers'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


function GetUser() {
  const navegar = useNavigate()
  const [VerUsuario, setVerUsuario] = useState([])
  const[Nombre, setNombre] = useState("")
  const[Contrasena, setContrasena] = useState("")
  const[Correo,setCorreo]= useState("")

useEffect(() => {

    const fecthUsers = async () => {
      try {
        const CallUser = await ServicesUsers.getUsers()
        setVerUsuario(CallUser)
      } catch (error) {
        console.error("Error al a los usuarios del servicio", error)
      }
    }

    fecthUsers()
  }, [])


  function aRegistro() {
    navegar("/Register")
  }

  
  const Enter = async () =>{
    const llamarUsuario = await ServicesUsers.getUsers()

    const usuarioEncontrado = llamarUsuario.find(user => Correo === user.correo)

    console.log(usuarioEncontrado);

     if (!usuarioEncontrado ) {
         Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "El correo electronico no esta registrado",
            Text: "Revise que el correo este bien escrito",
        });
         return;
        
     }if (usuarioEncontrado.contrasena !== Contrasena) {
         Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Contraseña incorrecta",

        });
         return;

        }if (usuarioEncontrado.nombre !== Nombre) {
         Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Nombre incorrecto",

        });
         return;

     }if (usuarioEncontrado.rol === "Administrador") {
       Swal.fire({
            title: "Bienvenido!",
            text: "Bienvenido Administrador!",
            icon: "success",
            confirmButtonText: "ir a la pagina de Administracion",
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirección a la pagina principal
                localStorage.setItem("token",JSON.stringify(usuarioEncontrado));
                navegar("/Admin")
            }
        });
     }
     else{
        Swal.fire({
            title: "usuario encontrado!",
            text: "bienvenido!"+ usuarioEncontrado.nombre,
            icon: "success",
            confirmButtonText: "ir a la pagina principal",
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirección a la pagina principal
                localStorage.setItem("token",JSON.stringify(usuarioEncontrado));
                navegar("/UsersInter")
            }
        });
     }
    
      
    
    

  }
  
  
  
  return (
    <div className="getuser-container">
       <h2>Iniciar Sesión</h2>
      <div className="getuser-form">
        <label htmlFor="nombre">Nombre</label>
        <br />
         <input type="text" id='nombre' placeholder='Nombre' value={ Nombre } onChange={(u) => setNombre(u.target.value)} />
         <br />
         <label htmlFor="correo">Correo Electronico</label>
         <br />
         <input type="email" id='correo' placeholder='Correo Elictronico' value={Correo} onChange={(u) => setCorreo(u.target.value)} />
         <br />
         <label htmlFor="contrasena">Contraseña</label>
         <br />
         <input type="password" id='contrasena' placeholder='Contraseña' value={Contrasena} onChange={(u) => setContrasena(u.target.value)} />
         <br />
         <button  className="btn-login" onClick={Enter}>Iniciar Sesion</button>

         <p>¿no esta registrado? </p><button onClick={aRegistro}>click aqui</button>
      </div>
    </div>
  )
}

export default GetUser