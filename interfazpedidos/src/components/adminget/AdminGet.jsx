import React, {useState, useEffect } from 'react'
import GetProducts from '../getproducts/GetProducts'
import ServicesProducts from '../../services/ServicesProducts'




function AdminGet() {
 

   const [VerProductos, setVerProductos] = useState([])

   const ordenPersonal = JSON.parse(localStorage.getItem("token"))
   console.log(ordenPersonal.rol);
 

  useEffect(() => {
    const fecthProductos = async () => {
      try {
        const callProducts = await ServicesProducts.getProducts()
        console.log(callProducts);

        setVerProductos(callProducts);
      } catch (error) {
        console.error("Error al traer los pedidos del servicio", error)
      }
    }
    fecthProductos()
  }, [setVerProductos])






  return (
    <div>
      

      <GetProducts VerProductos={VerProductos} setVerProductos={setVerProductos} rol={ordenPersonal.rol}/>
    </div>
  )
}

export default AdminGet