import { BiBrush} from "react-icons/bi";
import {useMutation, useQuery, useQueryClient} from "react-query"
import { getProduct, updateProduct, getProducts } from "../../lib/helper";



const UpdateProduct = ({formId, formData, setFormData}) => {

  console.log(formId)
  console.log(formData)
  console.log(setFormData)

  const queryClient = useQueryClient()

  const {isLoading, isError, data, error} = useQuery(['products', formId], () => getProduct(formId))
  console.log(data)

  const UpdateMutation = useMutation((newData) => updateProduct(formId, newData), {onSuccess: async (data) => {
    console.log('data updated')
    //queryClient.setQueryData('products', (old) => [data])
    
  }})

  if(isLoading) return <div>Loading...!</div>
   if(isError) return <div>Error</div>

   const { productname, avatar, price, category, status} = data;
   console.log({productname})

  const handleSubmit = async (e) => {    
    e.preventDefault(); 
    let productName = `${formData.productname}` 
    let updated = Object.assign({}, data, formData)
    console.log(updated) 
    await UpdateMutation.mutate(updated)

  };

 

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
        defaultValue={productname}
          type="text"
          onChange={setFormData}
          name="productname"
          placeholder="Product"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <input
      defaultValue={price}
        type="text"
        onChange={setFormData}
        name="price"
        placeholder="Price"
        className="border w-full px-5 py-3 focus:outline-none rounded-md"
      />

      <div className="input-type">
        <input
        defaultValue={category}
          type="text"
          onChange={setFormData}
          name="category"
          placeholder="category"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex-gap-10 items-center">
        <div className="form-check">
          <input        
            type="radio"
            defaultChecked={status == "In Stock"}
            onChange={setFormData}
            value="In Stock"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
            In Stock
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            defaultChecked={status == "Out of Stock"}
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

      <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Update{" "}
        <span>
          <BiBrush className="px-1" size={24}></BiBrush>
        </span>
      </button>
    </form>
  );
};

export default UpdateProduct;
