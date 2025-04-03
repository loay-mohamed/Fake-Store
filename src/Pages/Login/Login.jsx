import React, { useEffect, useState } from 'react';
import backgroundImage from "../../assets/Cart.png";
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/Slices/UserSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState(null);
  const passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const validationSchema = object({
    email: string().required("email is required").email("email is invalid"),
    password: string()
      .required("password is required")
      .matches(
        passwordRegax,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  async function sendDataToLogin(values) {
    const loadingToastId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data);
      
      if (data.token) {
        localStorage.setItem("token", data.token); 
        dispatch(setUser({ user: data.user, token: data.token }));
        navigate("/");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      setAccountExistError(error.response?.data?.message || "Login failed");
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "120vh",
      }}
    >
      <div
        className="bg-slate-300 p-7 w-1/2 rounded-3xl mt-10"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <h2 className="text-black text-3xl font-bold p-7 text-center">
          Login
        </h2>
        <form className="flex flex-col gap-9" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="email"
              className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 mt-1 text-sm">{formik.errors.email}</p>
            )}
            {accountExistError && (
              <p className="text-red-600 mt-1 text-sm">{accountExistError}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 mt-1 text-sm">
                {formik.errors.password}
              </p>
            )}
          </div>
          <button
            className="btn bg-black hover:bg-gray-900 text-white w-full p-3 rounded-md mt-4 focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
