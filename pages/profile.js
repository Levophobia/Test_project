import {getSession, useSession, signOut} from "next-auth/react"
import { useQuery, useMutation } from "react-query"
import { getUser, updateUser } from "../lib/helper"


export default function Profile(formData, setFormData){
    const {data: session} = useSession()
       

  const id = "634fb6627136a7987f24e662"

  //const {isLoading, isError, data, error} = useQuery(['products', formId], () => getProduct(formId))

  const {isLoading, isError, data, error} = useQuery(['users', id], () => getUser(id))

  const UpdateMutation = useMutation((newData) => updateUser(id, newData), {onSuccess: async (data) => {
    console.log('user updated')
    //queryClient.setQueryData('products', (old) => [data])
    
  }})

  console.log(data)
  const{ username, email, role, adress, zipcode, city } = data;

  

  const handleSubmit = async (e) => {    
    e.preventDefault();  
    let updated = Object.assign({}, data, formData)
    console.log(updated) 
    await UpdateMutation.mutate(updated)

  };

   
    
    return(
        
        <div>
        <h5>{session.id}</h5>            
        <h5>Username:{session.username}</h5>
        <h5>Email:{session.user.email}</h5>
        <h5>Adress:{session.adress}</h5>
        <h5>ZipCode:{session.zipcode}</h5>
        <h5>City:{session.city} </h5>

        <form onsubmit={handleSubmit}>
        <input onChange={setFormData} name="username" type="text" defaultValue={session.username}/>
        <input onChange={setFormData} name="email" type="email" defaultValue={session.email}/>
        <input onChange={setFormData} name="role" type="text" defaultValue={session.role}/>
        <input onChange={setFormData} name="adress" type="text" defaultValue={session.adress}/>
        <input onChange={setFormData} name="zipcode" type="text" defaultValue={session.zipcode}/>
        <input onChange={setFormData} name="city" type="text" defaultValue={session.city}/>

        <button type="submit">
          Update
        </button>
        </form>
        </div>
        
    )
}
    


  export async function getServerSideProps({req}){
    const session = await getSession({req})
  
    if(!session){
      return{
        redirect:{
          destination: "/login",
          permanent:false
        }
      }
    }
    return{
      props: {session}
}
  }