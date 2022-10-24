import styles from "../styles/Form.module.css"
import { useFormik } from 'formik';
import { registerValidate } from "../lib/validate";
import {useRouter} from "next/router"

export default function Register(){

    const router = useRouter()

    const formik = useFormik({
        initialValues:{
          username:"",
          email:"",
          role:"user",
          password:"",
          cpassword:"",
          adress:"",
          zipcode:"",
          city:""
          
        },
        validate: registerValidate,
        onSubmit
      }
      )

      async function onSubmit(values){
        console.log(values)
        const options = {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(values)
        }

    await fetch("http://localhost:3000/api/auth/signup", options) 
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        if(data)router.push("http://localhost:3000")
      })
    }

    return(
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input {...formik.getFieldProps("username")} type="text" name="username" placeholder="Username"/>
            </div>
            {formik.errors.username && formik.touched.username ? <span>{formik.errors.username}</span> : <></>}
            <div>
                <input {...formik.getFieldProps("email")} type="text" name="email" placeholder="Email"/>
            </div>
            {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : <></>}
            <div>
                <input {...formik.getFieldProps("password")} type="password" name="password" placeholder="Password"/>
            </div>
            {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : <></>}
            <div>
                <input {...formik.getFieldProps("cpassword")} type="password" name="cpassword" placeholder="Confirm Password"/>
            </div>
            {formik.errors.cpassword && formik.touched.cpassword ? <span>{formik.errors.cpassword}</span> : <></>}
            <div>
                <input {...formik.getFieldProps("adress")} type="text" name="adress" placeholder="Adress"/>
            </div>
            <div>
                <input {...formik.getFieldProps("zipcode")} type="text" name="zipcode" placeholder="Zip Code"/>
            </div>
            <div>
                <input {...formik.getFieldProps("city")} type="text" name="city" placeholder="City"/>
            </div>
            <div>
                <button type="submit">
                    Register
                </button>
            </div>
        </form>
    )
}