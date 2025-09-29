async function getSlides() {

    try {
        const response = await fetch('http://localhost:3001/Slides',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const Slides = await response.json()

        return Slides


    } catch (error) {

        console.error("error al obtener el Slides",error)
        throw error

    }
    
}






async function postSlides(Slides) {

    try {
        const response = await fetch('http://localhost:3001/Slides',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify(Slides)

        })

        const SlidesResponse = await response.json()

        return SlidesResponse


    } catch (error) {

        console.error("error al agregar el Slides",error)
        throw error

    }
    
}





async function putSlides(id,Slides) {

    try {
        const response = await fetch('http://localhost:3001/Slides/'+id,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify(Slides)

        })

        const SlidesR = await response.json()

        return SlidesR


    } catch (error) {

        console.error("error al editar el Slides",error)
        throw error

    }
    
}





async function deleteSlides(id) {

    try {
        const response = await fetch('http://localhost:3001/Slides/'+id,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
                
            },
           

        })

        const Slides = await response.json()

        return Slides


    } catch (error) {

        console.error("error al eliminar el slides",error)
        throw error

    }
    
}

export default {getSlides,postSlides,putSlides,deleteSlides}