import React, {   useEffect } from 'react'
import GetProducts from '../getproducts/GetProducts'
import ServicesProducts from '../../services/ServicesProducts'




function AdminGet({ VerProductos, setVerProductos,rol}) {
  const ordenPersonal = JSON.parse(localStorage.getItem("token"))
  
   useEffect(() => {
      const fecthProductos = async () => {
        try {
          const callProducts = await ServicesProducts.getProducts()
          console.log(callProducts);
  
  
          setVerProductos(callProducts)
          console.log(VerProductos);
          console.log(callProducts);
  
        
          setVerProductos(productosFiltrados) 
  
  
        } catch (error) {
          console.error("Error al traer los pedidos del servicio", error)
        }
      }
      fecthProductos()
    }, [])
  
  
  
  
  
  
    return (
    <div></div>
  )
}

export default AdminGet