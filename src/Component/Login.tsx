import { useInput } from "../Hooks/useInput";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import ojito from "../assets/icons/openEye.svg";
import ojitoActivo from "../assets/icons/openEye2.svg";
import { Link } from "react-router-dom";
import UnsuccessLogin from "../commons/alerts/UnsuccessLogin";
import SuccessLogin from "../commons/alerts/SuccessLogin";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useDispatch();
  const [showPwd, setShowPwd] = useState(false);
  const [showModal, setShowModal] = useState(0);
  const [isOpenErr, setIsOpenErr] = useState(false);
  const [buttonIsAble, setButtonIsAble] = useState(false);
  const [isEmail, setIsEmail] = useState(0);
  const [isPassword, setIsPassword] = useState(0);

  const navigate = useNavigate();
  const { formulario, handleChange } = useInput<FormData>({
    email: "",
    password: "",
  });

  const { email, password } = formulario;

  /* const validFields = () => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 

    if ( emailRegex.test(email) && passwordRegex.test(password)) {
      setButtonIsAble(true);
    } else {
      setButtonIsAble(false);
    } 
  }; 
  */
  useEffect(() => {
    const hasEmail = (value: string) => {
      return /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/.exec(
        value
      );
    };
    const enoughLength = (value: string) => {
      return value.length >= 8;
    };

    if (hasEmail(email) && enoughLength(password)) {
      setIsEmail(1);
      setIsPassword(1);
      setButtonIsAble(true)
    } else {
      setIsEmail(0);
      setIsPassword(0);
      setButtonIsAble(false)
    }
  }, [email, password]);


  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("login");
    axios
      .post("http://localhost:3001/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((res) => {
        dispatch(setUser(res[0]));
        window.localStorage.setItem("token", res[1]);
      })
      .then(() => {
        asyncFunction();
      })
      .catch((error) => {
        setShowModal(2);
        setIsOpenErr(true);
        console.log(error);
      });
  };

  const handleShowPwd = () => {
    setShowPwd(!showPwd);
  };

  const asyncFunction = () => {
    return new Promise(function (resolve, reject) {
      setShowModal(1);
      setTimeout(resolve, 3000);
    }).then(() => {
      navigate("/bookingPanel");
    });
  };


  return (
    <>
      <section className="h-screen">
        <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-2xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
          <h1 className="font-roboto text-2xl font-bold mt-5 mb-5 text-center ">
            Iniciar sesión
          </h1>
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-black font-roboto"
              >
                Usuario
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  type="email"
                  required
                  className=" border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm text-black font-roboto"
              >
                Contraseña
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <input
                    className="hidden js-password-toggle"
                    id="toggle"
                    type="checkbox"
                  />
                  <label
                    className=" px-2 py-1 text-gray-600 font-mono cursor-pointer js-password-label"
                    htmlFor="toggle"
                    onClick={handleShowPwd}
                  >
                    {showPwd ? (
                      <img src={ojitoActivo} alt="" />
                    ) : (
                      <img src={ojito} alt="" />
                    )}
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type={showPwd ? "text" : "password"}
                  required
                  className=" border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm ">
                <Link
                  to="/forgotPassword"
                  className="font-roboto text-center text-sm text-purple-600 hover:text-purple-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <Link to="/bookingPanel">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-violet-500 mb-5 "
                >
                  Ingresar
                </button>
              </Link>
              <hr className="border-1 border-gray-300 " />
            </div>
          </form>
          <div className="w-full">
            <Link to="/register">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-purple-600 transition duration-500 ease-in-out transform bg-purple-200 rounded-xl hover:bg-purple-300  mt-5 "
              >
                ¿No tenés cuenta? Registrate
              </button>
            </Link>
          </div>
        </div>
      </section>
      {showModal === 1 ? (
        <SuccessLogin />
      ) : showModal === 2 && isOpenErr ? (
        <UnsuccessLogin setIsOpenErr={setIsOpenErr} />
      ) : null}
    </>
  );
}

export default Login;
