import Link from "next/link"
import styles from "../../styles/Navbar.module.css"
import {getSession, useSession, signOut} from "next-auth/react"
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const Navbar = () => {
    const {data: session} = useSession()
    const [formData, setFormData] = useReducer(formReducer, {})

  function handleSignOut(){
    signOut()
  }
    return ( 
        <nav className={styles.nav}>
            <ul>
                <li>
                {session ? Adminlink({session, handleSignOut}): <></>}
                    
                </li>
                <li>
                    <Link href="/register"><a>Register</a></Link>
                </li>
                <li>
                    <Link href="/"><a>Start</a></Link>
                </li>
                <li>
                    <Link href="cart"><a>Cart</a></Link>
                </li>
                <li>
                    {session ? <Link href="/api/auth/signout">Sign out</Link> : <Link href="/login">Login</Link>}
                </li>
                <li>
                    {session ? ProfileLink({session, handleSignOut, formData, setFormData}) : <></>}
                </li>
            </ul>
        </nav>
     );
}

function Adminlink(){
    return(
        <Link href="/admin"><a>Admin</a></Link>                
    )
}

function ProfileLink(){
    return(
    <Link href="/profile"><a>Profile</a></Link>
    )
}
 
export default Navbar;

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