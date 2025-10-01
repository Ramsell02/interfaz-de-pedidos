import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ServicesProducts from "../../services/ServicesProducts";
import GetProducts from "../getproducts/GetProducts";

function PostProducts() {
  const [NuevoProducto, setNuevoProducto] = useState("");
  const [NuevaCantidad, setNuevaCantidad] = useState("");
  const [NuevoComentario, setNuevoComentario] = useState("");
  const [VerProductos, setVerProductos] = useState([]);

  const ordenPersonal = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fecthProductos = async () => {
      try {
        const callProducts = await ServicesProducts.getProducts();
        const productosFiltrados = callProducts.filter(
          (p) => p.userId === ordenPersonal.id
        );
        setVerProductos(productosFiltrados);
      } catch (error) {
        console.error("Error al traer los pedidos del servicio", error);
      }
    };
    fecthProductos();
  }, [ordenPersonal.id]);

  //  Subir a Cloudinary
  const subirACloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pedidos_app");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dim3fm4el/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.secure_url;
  };

  //  Preguntar al usuario: cámara o galería
  const SubirPedido = async () => {
    if (!NuevoProducto || !NuevaCantidad) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Datos vacíos, revise los datos",
      });
      return;
    }

    const { value: opcion } = await Swal.fire({
      title: "Elige cómo añadir la foto",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "📷 Usar cámara",
      denyButtonText: "🖼️ Subir desde galería",
      cancelButtonText: "Cancelar",
    });

    if (opcion === true) {
      abrirCamara(); //  cámara en SweetAlert
    } else if (opcion === false) {
      abrirGaleria(); //  input file oculto
    }
  };

  //  Capturar con cámara dentro de SweetAlert2
  const abrirCamara = () => {
    let streamRef = null;
    Swal.fire({
      title: "📸 Captura tu producto",
      html: `
        <video id="videoCam" autoplay playsinline style="width:100%; border-radius:8px;"></video>
        <canvas id="canvasCam" style="display:none;"></canvas>
      `,
      showCancelButton: true,
      confirmButtonText: "Capturar",
      cancelButtonText: "Cancelar",
      didOpen: async () => {
        const video = document.getElementById("videoCam");
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamRef = stream;
          video.srcObject = stream;
        } catch (err) {
          console.error("Error al acceder a la cámara:", err);
          Swal.showValidationMessage("No se pudo acceder a la cámara");
        }
      },
      preConfirm: () => {
        const video = document.getElementById("videoCam");
        const canvas = document.getElementById("canvasCam");
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        return new Promise((resolve) => {
          canvas.toBlob((blob) => resolve(blob), "image/jpeg");
        });
      },
       willClose: () => {
      //  detener la cámara al cerrar el Swal
      if (streamRef) {
        streamRef.getTracks().forEach((track) => track.stop());
      }
    },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        procesarPedido(result.value);
      }
    });
  };

  //  Subir desde galería (input invisible)
  const abrirGaleria = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      if (e.target.files[0]) {
        procesarPedido(e.target.files[0]);
      }
    };
    input.click();
  };

  // Procesar pedido y guardar
  const procesarPedido = async (file) => {
    try {
      const urlImagen = await subirACloudinary(file);

      const Newproduct = {
        nombre: NuevoProducto,
        cantidad: NuevaCantidad,
        imagen: urlImagen,
        comentario: NuevoComentario,
        userId: ordenPersonal.id,
        userName: ordenPersonal.nombre,
      };

      const creado = await ServicesProducts.postProducts(Newproduct);
      setVerProductos((prev) => [...prev, creado]);

      setNuevoProducto("");
      setNuevaCantidad("");
      setNuevoComentario("");

      Swal.fire({
        title: "✅ Pedido realizado",
        html: `
          <p><strong>Nombre:</strong> ${NuevoProducto}</p>
          <p><strong>Cantidad:</strong> ${NuevaCantidad}</p>
          <p><strong>Comentario:</strong> ${NuevoComentario}</p>
          <img src="${urlImagen}" style="max-width:200px; margin-top:10px; border-radius:8px;" />
        `,
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al subir",
        text: "No se pudo guardar el producto",
      });
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="nombre">Nombre del producto</label>
        <br />
        <input type="text" id="nombre" placeholder="Nombre del producto" value={NuevoProducto}  onChange={(n) => setNuevoProducto(n.target.value)}
        />
        <br />
        <label htmlFor="cantidad">Cantidad deseada</label>
        <br />
        <input type="number"  id="cantidad" placeholder="Cantidad"  value={NuevaCantidad}  onChange={(n) => setNuevaCantidad(n.target.value)}
        />
        <br />
        <label htmlFor="comentario">Comentario (opcional)</label>
        <br />
        <textarea
          id="comentario"
          value={NuevoComentario}
          onChange={(n) => setNuevoComentario(n.target.value)}
        />
        <br />

        <button onClick={SubirPedido}> Crear Pedido</button>
      </div>

      <GetProducts VerProductos={VerProductos} setVerProductos={setVerProductos}  rol={ordenPersonal.rol}  />
    </div>
  );
}

export default PostProducts;
