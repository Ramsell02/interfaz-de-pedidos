async function getProducts() {

    try {
        const response = await fetch('http://localhost:3001/Products',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const Products = await response.json()

        return Products


    } catch (error) {

        console.error("error al obtener el producto",error)
        throw error

    }
    
}






async function postProducts(Products) {

    try {
        const response = await fetch('http://localhost:3001/Products',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify(Products)

        })

        const ProductsResponse = await response.json()

        return ProductsResponse


    } catch (error) {

        console.error("error al agregar el producto",error)
        throw error

    }
    
}





async function putProducts(id,Products) {

    try {
        const response = await fetch('http://localhost:3001/Products/'+id,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify(Products)

        })

        const ProductsR = await response.json()

        return ProductsR


    } catch (error) {

        console.error("error al editar el producto",error)
        throw error

    }
    
}





async function deleteProducts(id) {

    try {
        const response = await fetch('http://localhost:3001/Products/'+id,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
                
            },
           

        })

        const Products = await response.json()

        return Products


    } catch (error) {

        console.error("error al eliminar el producto",error)
        throw error

    }
    
}

export default {deleteProducts,getProducts,postProducts,putProducts}