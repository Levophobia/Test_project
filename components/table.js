import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getProducts } from "../lib/helper";
import { useQuery } from "react-query";
import {useSelector, useDispatch} from 'react-redux'
import {toggleChangeAction, updateAction, deleteAction} from "../redux/reducer"


const Table = () => {
  
  getProducts().then((res) => console.log(res));

  const { isLoading, isError, data, error } = useQuery('products', getProducts);

  if (isLoading) return <div>Products are Loading...</div>;
  if (isError) return <div>Got Error{error}</div>;
  

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Productname</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Price</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Category</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>

      <tbody className="bg-gray-200">
        {data.products.map((obj, i) => (
          <Tr {...obj} key={i} />        
        ))}
      </tbody>
    </table>
  );
};

export default Table;

function Tr({ _id, productname, avatar, price, category, status }) {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const dispatch = useDispatch()

  const onUpdate = () =>{
    dispatch(toggleChangeAction())    
    dispatch(updateAction(_id))
    
  }

  const onDelete = () =>{
    if(!visible){
      dispatch(deleteAction(_id))
    }
  }

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={avatar || "#"}
          alt=""
        />
        <span className="text-center ml-2 font-semibold">
          {productname || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2">
        <span>{price || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{category || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span className={`${status == "In Stock" ? 'bg-green-500': 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>
            {status || "Unknown"}
          </span>
        </button>
      </td>

      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor">
          <BiEdit onClick={onUpdate} size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor">
          <BiTrashAlt onClick={onDelete} size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
