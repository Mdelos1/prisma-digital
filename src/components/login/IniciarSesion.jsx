import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { schemaLogin } from "../../services/data";
import { actionLoginAsync, loginProviderAsync } from "../../redux/actions/userActions";
import googleLogo from "../../assets/imgs/gogle_logo.png";
import LogoPrisma1 from '../../assets/imgs/logo-prisma.png'

const Login = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {

    dispatch(actionLoginAsync(data))
  }

  const handleLoginGoogle = () => {
    dispatch(loginProviderAsync('google'))
  }
  const handleLoginPhone = () => {
    navigate("/phoneLogin");
  }

  return (
    <div className="login">
      <div className='logo_backgrnd1'>
        <img src={LogoPrisma1} alt='Logo_Prisma1' className="logo_prisma1"/>
      </div>
      <hr className="barra1"></hr>
      <div className="login__container">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div label="Email address" >
            <p>User</p>
            <input className="email_input"
              type="email"
              autoComplete="off"
              placeholder="name@example.com"
              {...register("email")}
            />
          </div>
          {/* <p>{errors.email?.message}</p> */}
          <div label="Password">
          <p>Password</p>
            <input className="password_input"
              type="password"
              autoComplete="off"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          {/* <p>{errors.password?.message}</p> */}

          <button variant="warning" type="submit" className="login_input">
            login
          </button>
          <img className="logo_login" src={googleLogo} alt="Google" style={{width: 50, marginLeft: 30}} onClick={handleLoginGoogle} />
          <i className="fa-solid fa-phone" onClick={handleLoginPhone}></i>
        </form>
        <Link to="/Register" className="rigistro__yes">¿Desea crear una cuenta?</Link>
      </div>
    </div>

  );
};
export default Login;
