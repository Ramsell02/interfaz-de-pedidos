import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ServicesCarousel from '../../services/ServicesCarousel';

function AdminCarousel() {
  const [slides, setSlides] = useState([]);
  const [nuevoSlide, setNuevoSlide] = useState({ image: "", price: "", stock: "" });
  const [loadingImg, setLoadingImg] = useState(false);

  useEffect(() => {
    const fecthSlides = async () => {
      try {
        const callSlides = await ServicesCarousel.getSlides();
        setSlides(callSlides);
      } catch (error) {
        console.error("Error al traer los Slides del servicio", error);
      }
    };
    fecthSlides();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoSlide({ ...nuevoSlide, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pedidos_app"); 

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dim3fm4el/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setNuevoSlide({ ...nuevoSlide, image: data.secure_url }); // Guardamos URL en el estado
      Swal.fire("Éxito", "Imagen subida correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo subir la imagen", "error");
    } finally {
      setLoadingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nuevoSlide.image || !nuevoSlide.price || !nuevoSlide.stock) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    try {
      const savedSlide = await ServicesCarousel.postSlides(nuevoSlide);
      setSlides([...slides, savedSlide]);
      setNuevoSlide({ image: "", price: "", stock: "" });
      Swal.fire("Éxito", "Slide agregado al carrusel", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar el slide", "error");
    }
  };


    const EliminarSlide = async (slide) => {
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
          await ServicesCarousel.deleteSlides(slide.id);
  
          setSlides((prev) => prev.filter((s) => s.id !== slide.id));
  
          Swal.fire("¡Eliminado!", "El slide fue borrado con éxito", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el slide", "error");
        }
      }
    };










  return (
    <div className="container mt-4">
      <h2>Administrador de Carrusel</h2>

      {/* Formulario para agregar nuevo slide */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {loadingImg && <p>Subiendo imagen...</p>}
          {nuevoSlide.image && (
            <img
              src={nuevoSlide.image}
              alt="preview"
              style={{ width: "120px", marginTop: "10px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={nuevoSlide.price}
            onChange={handleChange}
            placeholder="₡"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={nuevoSlide.stock}
            onChange={handleChange}
            placeholder="stock"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loadingImg}>
          {loadingImg ? "Subiendo..." : "Agregar al Carrusel"}
        </button>
      </form>

      {/* Lista de slides existentes */}
      <h3>Slides actuales</h3>
      <ul className="list-group">
        {slides.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <img
                src={item.image}
                alt="slide"
                style={{ width: "80px", marginRight: "10px" }}
              />
              <span>
                Precio: ₡{item.price} | Stock: {item.stock}
              </span>
            </div>
           <button className="delete" onClick={() => EliminarSlide(item)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCarousel;
