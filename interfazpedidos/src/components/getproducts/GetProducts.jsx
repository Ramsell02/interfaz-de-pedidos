import React from 'react'
import Swal from 'sweetalert2'
import ServicesProducts from '../../services/ServicesProducts'

function GetProducts({ VerProductos, setVerProductos, rol }) {

  




  /// Función para editar un pedido
  const editarPedido = async (product) => {
    const { value: valores } = await Swal.fire({
      title: "Editar pedido",
      html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${product.nombre}" />
        <input id="swal-cantidad" type="number" class="swal2-input" placeholder="Cantidad" value="${product.cantidad}" />
        <textarea id="swal-comentario" class="swal2-textarea" placeholder="Comentario">${product.comentario || ""}</textarea>
        <br/>
        <img src="${product.imagen}" alt="Imagen actual" style="max-width:150px; margin-top:10px; border-radius:8px;" />
        <p style="margin-top:8px; font-size:14px;">(Si no seleccionas una nueva imagen se mantendrá la actual)</p>
        <input type="file" id="swal-imagen" class="swal2-file" accept="image/*"/>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        const nuevoNombre = document.getElementById("swal-nombre").value
        const nuevaCantidad = document.getElementById("swal-cantidad").value
        const nuevoComentario = document.getElementById("swal-comentario").value
        const nuevaImagen = document.getElementById("swal-imagen").files[0]

        // Si el usuario selecciona nueva imagen, se sube a Cloudinary
        let urlImagen = product.imagen
        if (nuevaImagen) {
          const data = new FormData()
          data.append("file", nuevaImagen)
          data.append("upload_preset", "pedidos_app")

          const res = await fetch("https://api.cloudinary.com/v1_1/dim3fm4el/image/upload", {
            method: "POST",
            body: data
          })

          const fileData = await res.json()
          urlImagen = fileData.secure_url
        }

        return {
          ...product,
          nombre: nuevoNombre,
          cantidad: nuevaCantidad,
          comentario: nuevoComentario,
          imagen: urlImagen
        }
      }
    })
    if (valores) {
      try {
        // Guardar en db.json
        const actualizado = await ServicesProducts.putProducts(product.id, valores)

        // Actualizar estado local con lo que devuelve la API
        const productosActualizados = VerProductos.map((p) =>
          p.id === product.id ? actualizado : p
        )
        setVerProductos(productosActualizados)

        Swal.fire({
          icon: "success",
          title: "Pedido actualizado",
          text: "Los datos se guardaron correctamente"
        })
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el pedido"
        })
      }
    }


  }
  const EliminarPedido = async (product) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await ServicesProducts.deleteProducts(product.id);

        setVerProductos((prev) => prev.filter((p) => p.id !== product.id));

        Swal.fire("¡Eliminado!", "El pedido fue borrado con éxito", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el pedido", "error");
      }
    }
  };



  return (
    <div>
      
      <div>


        {Array.isArray(VerProductos) && VerProductos.map((infoPro) => (
          <li key={infoPro.id}>
            <p>{infoPro.nombre}</p>
            <p>{infoPro.cantidad}</p>
            <p>{infoPro.comentario}</p>
            <img src={infoPro.imagen} alt="IMG Bucket" width={"200px"} />
            <div className="task-actions" >

              {rol === "Cliente" ? (
                <>
                  <button className="edit" onClick={() => editarPedido(infoPro)}>Editar</button>
                  <button className="delete" onClick={() => EliminarPedido(infoPro)}>Eliminar</button>
                </>
              ) : rol === "Administrador" ? (
                <>
                  <input type="checkbox" />
                  <button className="delete" onClick={() => EliminarPedido(infoPro)}>Eliminar</button>
                </>
              ) : null}

            </div>
          </li>
        ))}

      </div>
    </div>

  )
}

export default GetProducts
