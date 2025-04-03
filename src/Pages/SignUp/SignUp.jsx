import React, { useEffect, useState } from 'react'
import backgroundImage from "../../assets/Cart.png"
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { object, ref, string } from 'yup'
import toast from 'react-hot-toast';

export default function SignUp() {
  const navigate= useNavigate()
  const [accountExistError, setAccountExistError]= useState(null);



  const passwordRegax=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegax=/^01[0125][0-9]{8}$/


  const validationSchema =object({
    name:string()
      .required("Name is required")
      .min(3,"Name must be at least 3 characters")
      .max(25,"Name can not to be more than 25 characters"), 
    email:string().required("email is required").email("email is invalid"),
    password :string().required("password is required").matches(passwordRegax,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword :string().required("Confirm password is required").oneOf([ref("password")],"password and confirm should be the same"),
    phone:string().required("phone is required").matches(phoneRegax,"sorry we accept egyption phone numbers only ")
  })
  
  async function sendDataToRegister(values) {
    const loadingToastId = toast.loading("waiting...")
    try{
      const options={
        url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
        method:"POST",
        data:values,
      }
      let{data}=await axios.request(options)
      console.log(data);

    }catch (error){
      toast.dismiss(loadingToastId)
      setAccountExistError(error.response.data. message);
    }finally {
      toast.dismiss(loadingToastId);
    } 
  }
  
  const formik =useFormik({
    initialValues:{
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
  },
 validationSchema,
 onSubmit:sendDataToRegister
  })

  return (
    <>
      <div className='flex justify-center items-center min-h-screen ' style={{backgroundImage: `url(${backgroundImage}) `, backgroundRepeat:"no-repeat" ,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "120vh" }}>
        <div className=' bg-slate-300  p-7 w-1/2 rounded-3xl mt-10 ' style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}  >
          <h2 className='text-black text-3xl font-bold p-7 text-center'>Create Account</h2>
          <div >
            <form action="" className='flex flex-col gap-9' onSubmit={formik.handleSubmit}>
            <div >
              <input type="text" placeholder='Name' className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name="name"/>
              {formik.errors.name && formik.touched.name && (
              <p className="text-red-600 mt-1 text-sm">{formik.errors.name}</p>
            )}
            </div>
            <div>
              <input type="email" placeholder='email' className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" />
              {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 mt-1 text-sm">{formik.errors.email}</p>
            )}
            {accountExistError && (
              <p className="text-red-600 mt-1 text-sm">{accountExistError}</p>
            )}
            </div>
            <div>
              <input type="password" placeholder='password' className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name="password"/>
              {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 mt-1 text-sm">{formik.errors.password}</p>
            )}
            </div>
            <div>
              <input type="password" placeholder='RePassword' className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name="rePassword" />
              {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-600 mt-1 text-sm">{formik.errors.rePassword}</p>
            )}
            </div>
            <div>
              <input type="tel" placeholder='Phone' className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name="phone"/>
              {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-600 mt-1 text-sm">{formik.errors.phone}</p>
            )}
            </div>
            <button className="btn bg-black hover:bg-gray-900 text-white w-full p-3 rounded-md mt-4 focus:outline-none" type='sumbit'>Submit</button>
            </form>


          </div>
        </div>
      </div>
    </>
  )
}
