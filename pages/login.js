import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login(){

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validate: login_validate,
        onSubmit,
      });

      async function onSubmit(values) {   
        console.log(values)
        const status = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl:"/"
        })
        console.log(status)

        if(status.ok)router.push(status.url)
  }

    return(
        <form onSubmit={formik.handleSubmit}>
            <div>
            <input {...formik.getFieldProps("email")} type="email" name="email" placeholder="Email"/>
            </div>
            {formik.errors.email && formik.touched.password ? <span>{formik.errors.email}</span> : <></>}
            
            <div>
            <input {...formik.getFieldProps("password")} type="password" name="password" placeholder="Password"/>
            </div>
            {formik.errors.password ? (<span>{formik.errors.password}</span>) : (<></>)}
            <div>
                <button type="submit">Login</button>
            </div>
            
        </form>
    )
} 