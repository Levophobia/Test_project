import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "../success";
import Error from "../error";
import {useQueryClient, useMutation} from "react-query"
import {addProduct, getProducts} from '../../lib/helper'




const AddProduct = ({formData, setFormData}) => {
  
    const queryClient = useQueryClient()
  const addMutation = useMutation(addProduct,{
  onSuccess:() =>{
    queryClient.prefetchQuery('products', getProducts)
  }})

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    let {productname, price, category, status} = formData

    const model = {
        avatar: "https://static.miinto.net/products/11c08a3ecbc1534b41eed7cbee122149.jpg?width=400&height=600&title=crocs-madame-mules",
        productname, price, category, status:status ?? "In Stock"
    }

    addMutation.mutate(model)
  };

  if(addMutation.isLoading) return <div>Loading!</div>
  if(addMutation.isError) return <Error message={addMutation.error.message}/>
  if(addMutation.isSuccess) return <Success message={"Added successfully"}/>

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="productname"
          placeholder="Product"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <input
        type="text"
        onChange={setFormData}
        name="price"
        placeholder="Price"
        className="border w-full px-5 py-3 focus:outline-none rounded-md"
      />

      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="category"
          placeholder="Category"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex-gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="In Stock"
            id="radioDefault1"
            name="Status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
            In Stock
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="Out of Stock"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
            Out of Stock
          </label>
        </div>
      </div>

      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{" "}
        <span>
          <BiPlus className="px-1" size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
};

export default AddProduct;
