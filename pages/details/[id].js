import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getProduct } from "../../lib/helper";
import {styles} from "../../styles/Details.module.css"

const Details = () => {

    const router = useRouter()
    const _id = router.query.id
    

    const {isLoading, isError, data, error} = useQuery(['products', _id], () => getProduct(_id))   


    return ( 
        <div>
            <h1>Details</h1>
            <h5>{data.productname}</h5>
            <h5>{data.price}</h5>
        
                      
        </div>
        
     );
     
}
 
export default Details;