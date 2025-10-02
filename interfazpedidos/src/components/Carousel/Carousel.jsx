import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ServicesCarousel from "../../services/ServicesCarousel";

function CarouselApp() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const callSlides = await ServicesCarousel.getSlides();
        setSlides(callSlides);
      } catch (error) {
        console.error("Error al cargar slides en el carrusel:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <Carousel>
      {slides.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100"
            src={item.image}
            alt={`Slide ${item.id}`}
            style={{ Height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>₡{item.price}</h3>
            <p>Stock disponible: {item.stock}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselApp;
