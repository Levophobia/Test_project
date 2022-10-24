import { BiCart, BiX, BiCheck } from "react-icons/bi";
import Table from "../../components/table";
import Form from "../../components/formAdd";
import { useDispatch, useSelector } from "react-redux";
import { toggleChangeAction, updateAction, deleteAction } from "../../redux/reducer";
import { deleteProduct, getProducts } from "../../lib/helper";
import { useQueryClient } from "react-query";
import {getSession, useSession, signOut} from "next-auth/react"


export default function Test() {

  const {data: session} = useSession()

  function handleSignOut(){
    signOut()
  }

  return (
    <div>
      {session ? Admin({session, handleSignOut}):Guest()}
      {session.username}
    </div>
  );
}

function DeleteComponent({deletehandler, cancelhandler}) {
  return (
    <div className="flex gap-5">
      <p>Are you sure?</p>
      <button onClick={deletehandler} className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-green-500 hover:text-gray-50">
        Yes{" "}
        <span className="px-1">
          <BiCheck color="rgb(255 255 255)" size={25} />
        </span>
      </button>
      <button onClick={cancelhandler} className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50">
        No
        <span className="px-1">
          <BiX color="rgb(255 255 255)" size={25} />
          </span>
      </button>
    </div>
  );
}

function Admin(){
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId)
  const queryClient = useQueryClient()
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
    dispatch(updateAction());
    console.log(dispatch);
  };

    const deletehandler = async () =>{
      if(deleteId){
      await deleteProduct(deleteId)
      await queryClient.prefetchQuery('products', getProducts)
      await dispatch(deleteAction(null))
      }

    }
  
  const cancelhandler = async () =>{
    await dispatch(deleteAction(null))

  }
  return(
    <section>
      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">
          Product Managment
        </h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button
              onClick={handler}
              className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-500"
            >
              Add product{" "}
              <span className="px-1">
                <BiCart size={23}></BiCart>
              </span>
            </button>
          </div>
          {deleteId ? DeleteComponent({deletehandler, cancelhandler}): <></>}
        </div>

        {visible ? <Form></Form> : <></>}

        <div className="container mx-auto">
          <Table></Table>
        </div>
      </main>
    </section>
  )
}

function Guest(){
  return(
    <div>
      <h1>Not logged in</h1>
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
