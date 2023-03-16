import { useInput } from "../Hooks/useInput";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ojito from "../assets/icons/openEye.svg";
import ojitoActivo from "../assets/icons/openEye2.svg";
import check from "../assets/icons/rightCheckbox.svg";
import wrong from "../assets/icons/wrongCheckbox.svg";
import SuccessRegister from "../commons/alerts/SuccessRegister";
import UnsuccessRegister from "../commons/alerts/UnsuccessRegister";

interface FormData {
  name: string;
  dni: number;
  email: string;
  password: string;
  password2: string;
  usertype: string;
}

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdRepeat, setShowPwdRepeat] = useState(false);
  const [upperCase, setUpperCase] = useState(0);
  const [lowerCase, setLowerCase] = useState(0);
  const [number, setNumber] = useState(0);
  const [length, setLength] = useState(0);
  const [showModal, setShowModal] = useState(0);
  const [isOpenErr, setIsOpenErr] = useState(false);

  const navigate = useNavigate();

  const { formulario, handleChange } = useInput<FormData>({
    name: "",
    dni: 0,
    email: "",
    password: "",
    password2: "",
    usertype: "",
  });

  const { name, dni, email, password } = formulario;

  useEffect(() => {
    const hasUppercase = (value: string) => {
      return /[A-Z]/.exec(value);
    };
    const hasLowercase = (value: string) => {
      return /[a-z]/.exec(value);
    };
    const hasNumber = (value: string) => {
      return /\d/.exec(value);
    };
    const enoughLength = (value: string) => {
      return value.length >= 8;
    };
    if (password.length === 0) {
      setUpperCase(0);
      setLowerCase(0);
      setNumber(0);
      setLength(0);
    }
    if (password.length > 0) {
      if (hasUppercase(password)) {
        setUpperCase(2);
      } else {
        setUpperCase(1);
      }
      if (hasLowercase(password)) {
        setLowerCase(2);
      } else {
        setLowerCase(1);
      }
      if (hasNumber(password)) {
        setNumber(2);
      } else {
        setNumber(1);
      }
      if (enoughLength(password)) {
        setLength(2);
      } else {
        setLength(1);
      }
    }
  }, [password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/register", {
        fullName: name,
        dni: dni,
        email: email,
        password: password,
        usertype: "user",
      })
      .then((res) => res.data)
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

  const handleShowPwdRepeat = () => {
    setShowPwdRepeat(!showPwdRepeat);
  };

  const asyncFunction = () => {
    return new Promise(function (resolve, reject) {
      setShowModal(1);
      setTimeout(resolve, 3000);
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <section className="h-screen">
        <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-2xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
          <div className="w-full">
            <Link to="/login">
              <button className="flex items-center font-roboto text-purple-600">
                <svg
                  className="mr-2 fill-purple-600"
                  width="14"
                  height="14"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.70509 15.705C9.09445 15.3156 9.09445 14.6844 8.70509 14.295L3.41009 9H16.0001C16.5524 9 17.0001 8.55228 17.0001 8C17.0001 7.44771 16.5524 7 16.0001 7H3.41009L8.70509 1.705C9.09445 1.31564 9.09445 0.684357 8.70509 0.294996C8.31573 -0.0943644 7.68445 -0.0943643 7.29509 0.294997L0.297195 7.29289C-0.0933288 7.68341 -0.0933296 8.31658 0.297195 8.7071L7.29509 15.705C7.68445 16.0944 8.31573 16.0944 8.70509 15.705Z"
                    fill=""
                  />
                </svg>
                Atrás
              </button>
            </Link>
          </div>

          <h1 className="font-roboto text-2xl font-bold mt-5 mb-5 text-center">
            Crear cuenta
          </h1>
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-black font-roboto"
                >
                  Nombre y Apellido
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    type="text"
                    required
                    className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="dni"
                  className="block text-sm text-black font-roboto"
                >
                  DNI
                </label>
                <div className="mt-1">
                  <input
                    id="dni"
                    name="dni"
                    onChange={handleChange}
                    type="text"
                    required
                    className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-black font-roboto"
              >
                Mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  required
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
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
                      className=" px-2 py-1 text-gray- focus:ring-0 font-mono cursor-pointer js-password-label"
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
                    onChange={handleChange}
                    type={showPwd ? "text" : "password"}
                    required
                    className=" border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0 "
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm text-black font-roboto"
                >
                  Repetir Contraseña
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
                      onClick={handleShowPwdRepeat}
                    >
                      {showPwdRepeat ? (
                        <img src={ojitoActivo} alt="" />
                      ) : (
                        <img src={ojito} alt="" />
                      )}
                    </label>
                  </div>
                  <input
                    id="password"
                    name="password2"
                    onChange={handleChange}
                    type={showPwdRepeat ? "text" : "password"}
                    required
                    className=" border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0 "
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-200 py-4 px-5">
              <div className="flex items-center font-roboto justify-center rounded-lg">
                <p className="w-full mb-1 text-xs font-roboto font-semibold text-gray-600 ">
                  La contraseña debe contener:
                </p>
              </div>
              <hr className="border-1 border-gray-400 " />
              <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">
                <div>
                  {upperCase === 0 ? (
                    <p className="text-xs text-gray-600">
                      ABC Una letra mayúscula
                    </p>
                  ) : upperCase === 2 ? (
                    <>
                      <div className="flex items-center text-xs text-exito ">
                        <img src={check} alt="" className="mr-2" />
                        ABC Una letra mayúscula
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center text-xs text-error ">
                        <img src={wrong} alt="" className="mr-2" />
                        ABC Una letra mayúscula
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <div>
                    {lowerCase === 0 ? (
                      <p className="text-xs text-gray-600">
                        abc Una letra minúscula
                      </p>
                    ) : lowerCase === 2 ? (
                      <>
                        <div className="flex items-center text-xs text-exito ">
                          <img src={check} alt="" className="mr-2" />
                          abc Una letra minúscula
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center text-xs text-error ">
                          <img src={wrong} alt="" className="mr-2" />
                          abc Una letra minúscula
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    {number === 0 ? (
                      <p className="text-xs text-gray-600">123 Un número</p>
                    ) : number === 2 ? (
                      <>
                        <div className="flex items-center text-xs text-exito ">
                          <img src={check} alt="" className="mr-2" />
                          123 Un número
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center text-xs text-error ">
                          <img src={wrong} alt="" className="mr-2" />
                          123 Un número
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  {length === 0 ? (
                    <p className="text-xs text-gray-600">
                      *** Mínimo 8 caracteres
                    </p>
                  ) : length === 2 ? (
                    <>
                      <div className="flex items-center text-xs text-exito ">
                        <img src={check} alt="" className="mr-2" />
                        *** Mínimo 8 caracteres
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center text-xs text-error ">
                        <img src={wrong} alt="" className="mr-2" />
                        *** Mínimo 8 caracteres
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:ring-0 mb-5 "
              >
                Registrarme
              </button>
              <hr className="border-1 border-gray-300 " />
            </div>
          </form>
          <div className="w-full">
            <Link to="/login">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-purple-600 transition duration-500 ease-in-out transform bg-purple-200 rounded-xl hover:bg-purple-300 focus:ring-0 mt-5"
              >
                ¿Ya tenés cuenta? Iniciá sesión
              </button>
            </Link>
          </div>
        </div>
      </section>
      {showModal === 1 ? (
        <SuccessRegister />
      ) : showModal === 2 && isOpenErr ? (
        <UnsuccessRegister setIsOpenErr={setIsOpenErr} />
      ) : null}
    </>
  );
};
export default Register;
