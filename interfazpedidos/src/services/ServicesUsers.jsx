async function getUsers() {

    try {
        const response = await fetch('http://localhost:3001/Users',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const users = await response.json()

        return users


    } catch (error) {

        console.error("error al obtener el usuario",error)
        throw error

    }
    
}






async function postUsers(users) {

    try {
        const response = await fetch('http://localhost:3001/Users',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify(users)

        })

        const usersResponse = await response.json()

        return usersResponse


    } catch (error) {

        console.error("error al agregar el usuario",error)
        throw error

    }
    
}





async function putUsers(users,id) {

    try {
        const response = await fetch('http://localhost:3001/Users'+id,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify(users)

        })

        const users = await response.json()

        return users


    } catch (error) {

        console.error("error al editar el usuario",error)
        throw error

    }
    
}





async function deleteUsers(id) {

    try {
        const response = await fetch('http://localhost:3001/Users'+id,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
                
            },
           

        })

        const users = await response.json()

        return users


    } catch (error) {

        console.error("error al eliminar el usuarios",error)
        throw error

    }
    
}

export default {deleteUsers,postUsers,getUsers,putUsers}