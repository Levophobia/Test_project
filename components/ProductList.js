import { getProducts, getProduct } from "../lib/helper";
import { useQuery } from "react-query";
import styles from "../styles/Product.module.css";
import Link from "next/link"

export default function ProductList() {
  const { isLoading, isError, data, error } = useQuery("products", getProducts);

  if (isLoading) return <div>Products are Loading...</div>;
  if (isError) return <div>Got Error{error}</div>;

  

  return (
    <div className={styles.container}>
      {data.products.map((obj, i) => (
        <Product {...obj} key={i} />
      ))}
    </div>
  );
}



function Product({ _id, productname, avatar, price, category, status }) {

    

    const {isLoading, isError, data, error} = useQuery(['products', _id], () => getProduct(id))
    console.log(data)

    const product = data
    
    console.log(_id)
            
    const array = []    

    function handleAddToCart(){
        array.push(data)
        console.log(array)
    }
    
    const BASE_URL = "http://localhost:3000/";

  return (
    <div className={styles.card}>
        <Link href={`details/${_id}`}>
            <a>
    <img src={avatar} alt="Denim Jeans"></img>
      <h1>{productname}</h1>
      <p className={styles.price}>{price}</p>
      <p>Some text about the jeans..</p>
      </a>
      </Link>
      <p>     
        <button onClick={handleAddToCart}>Add to Cart</button>
      </p>
    </div>
  );
}
