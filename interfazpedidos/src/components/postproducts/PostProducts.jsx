import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2'
import ServicesProducts from '../../services/ServicesProducts'
import GetProducts from '../getproducts/GetProducts'
import AdminView from '../adminview/AdminView'

function PostProducts() {
  const [NuevoProducto, setNuevoProducto] = useState("")
  const [NuevaCantidad, setNuevaCantidad] = useState("")
  const [NuevoComentario, setNuevoComentario] = useState("")
  const [VerProductos, setVerProductos] = useState([])
  const ordenPersonal = JSON.parse(localStorage.getItem("token"))
  console.log(ordenPersonal.id);


  useEffect(() => {
    const fecthProductos = async () => {
      try {
        const callProducts = await ServicesProducts.getProducts()
        console.log(callProducts);


        setVerProductos(callProducts)
        console.log(VerProductos);
        console.log(callProducts);

         const productosFiltrados = callProducts.filter(
          p => p.userId === ordenPersonal.id
        )
        setVerProductos(productosFiltrados) 


      } catch (error) {
        console.error("Error al traer los pedidos del servicio", error)
      }
    }
    fecthProductos()
  }, [ordenPersonal.id])

  console.log(VerProductos);








  // Referencias a los inputs (uno para galería y otro para cámara)
  const inputGaleriaRef = useRef(null)
  const inputCamaraRef = useRef(null)

  // 🔥 Subir a Cloudinary
  const subirACloudinary = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "pedidos_app")

    const res = await fetch("https://api.cloudinary.com/v1_1/dim3fm4el/image/upload", {
      method: "POST",
      body: data
    })

    const fileData = await res.json()
    return fileData.secure_url // URL de la imagen
  }

  const SubirPedido = async () => {
    if (!NuevoProducto || !NuevaCantidad) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos vacíos, revise los datos',
      })
      return
    }

   // Preguntar al usuario cómo quiere subir la foto
    const { value: opcion } = await Swal.fire({
      title: "Selecciona una opción",
      text: "¿Cómo quieres añadir la foto del producto?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "📷 Tomar foto",
      denyButtonText: "🖼️ Subir desde galería",
      cancelButtonText: "Cancelar"
    })

    if (opcion === true) {
      // Cámara
      inputCamaraRef.current.click()
    } else if (opcion === false) {
      // Galería
      inputGaleriaRef.current.click()
    }
  }

  const procesarPedido = async (file) => {
    try {
      // Subir a Cloudinary
      const urlImagen = await subirACloudinary(file)

      const Newproduct = {
        nombre: NuevoProducto,
        cantidad: NuevaCantidad,
        imagen: urlImagen,   //  ahora se guarda la URL en db.json
        comentario: NuevoComentario,
        userId: ordenPersonal.id
      }

      const creado= await ServicesProducts.postProducts(Newproduct)

      setVerProductos(prev => [...prev, creado])


      setNuevoProducto("")
      setNuevaCantidad("")
      setNuevoComentario("")
      Swal.fire({
        title: "Pedido realizado",
        html: `
          <p>Pedido realizado con éxito!</p>
          <p><strong>Nombre:</strong> ${NuevoProducto}</p>
          <p><strong>Cantidad:</strong> ${NuevaCantidad}</p>
          <p><strong>Comentario:</strong> ${NuevoComentario}</p>
          <img src="${urlImagen}" style="max-width:200px; margin-top:10px; border-radius:8px;" />
        `,
        icon: "success",
        confirmButtonText: "Continuar",
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al subir',
        text: 'No se pudo guardar el producto',
      })
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="nombre">Nombre del producto</label>
        <br />
        <input type="text" id='nombre' placeholder='Nombre del producto' value={NuevoProducto} onChange={(n) => setNuevoProducto(n.target.value)} />
        <br />
        <label htmlFor="cantidad">Cantidad deseada</label>
        <br />
        <input type="number" id='cantidad' placeholder='Cantidad' value={NuevaCantidad} onChange={(n) => setNuevaCantidad(n.target.value)} />
        <br />
        <label htmlFor="comentario">Comentario (opcional)</label>
        <br />
        <textarea name="comentario" id="comentario" value={NuevoComentario} onChange={(n) => setNuevoComentario(n.target.value)} />
        <br />

        {/* Inputs ocultos para cámara y galería */}
        <input type="file" accept="image/*" style={{ display: "none" }} ref={inputGaleriaRef} onChange={(e) => procesarPedido(e.target.files[0])} />

        <input type="file" accept="image/*" capture="environment" style={{ display: "none" }} ref={inputCamaraRef} onChange={(e) => procesarPedido(e.target.files[0])} />

        <button onClick={SubirPedido}>Crear Pedido</button>
      </div>
      <GetProducts VerProductos={VerProductos} setVerProductos={setVerProductos} />
      
    </div>
  )
}

export default PostProducts

