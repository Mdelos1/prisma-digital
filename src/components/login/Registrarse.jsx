import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { actionRegisterAsync } from "../../redux/actions/userActions";
import LogoPrisma2 from '../../assets/imgs/logo-prisma.png'
// import axios from "axios";


const Register = () => {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
    };
    const newUserBack = {
      nombre: data.name,
      email: data.email,
      password: data.password,
      cel: data.phone,
    };
    // axios.post(`${apiTienda}/usuario`, newUserBack)
    dispatch(actionRegisterAsync(newUser));
  };

  return (
    <div className="register">
      <div className='logo_backgrnd1'>
        <img src={LogoPrisma2} alt='Logo_Prisma2' className="logo_prisma2"/>
      </div>
      <hr className="barra2"></hr>
      <form onSubmit={handleSubmit(onSubmit)} className='register_container'>
        <h1>Crear cuenta</h1>
        <div className="" controlId="formBasicEmail">
          <div label="Name" className="">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            {/* <div className="">{errors.name?.message}</div> */}
          </div>
        </div>
        <div className="" controlId="formBasicEmail">
          <div label="Email address" className="">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {/* <div className="">
              {errors.email?.message}
            </div> */}
          </div>
        </div>

        <div className="" controlId="formBasicPassword">
          <div label="Password" className="">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {/* <div className="">
              {errors.password?.message}
            </div> */}
          </div>
        </div>
        <div className="register__confirmPassword" controlId="formBasicPassword">
          <div label="Confirm Passwor" className="">
            <input
              type="password"
              placeholder="Repeat  Password"
              {...register("repeatPassword")}
            />
            {/* <div className="">
              {errors.repeatPassword?.message}
            </div> */}
          </div>
          <p>Nota: contraseña minima 6 caracteres.</p>
        </div>

        <button variant="warning" type="submit" className="register_input">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;