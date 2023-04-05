import axios from "axios";
import React, { useEffect, useState } from "react";
import useQuery from "../Hooks/useQuery";
import check from "../assets/icons/rightCheckbox.svg";
import wrong from "../assets/icons/wrongCheckbox.svg";
import ojito from "../assets/icons/openEye.svg";
import ojitoActivo from "../assets/icons/openEye2.svg";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [upperCase, setUpperCase] = useState(0);
  const [lowerCase, setLowerCase] = useState(0);
  const [number, setNumber] = useState(0);
  const [length, setLength] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const query = useQuery();
  const id = query.get("id");
  const token = query.get("token");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const changePasswordQuery = await axios.post(
      "http://localhost:3001/api/users/changePassword",
      {
        id,
        token,
        newPassword,
      }
    );
    navigate("/login");
  };

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
    if (newPassword.length === 0) {
      setUpperCase(0);
      setLowerCase(0);
      setNumber(0);
      setLength(0);
    }
    if (newPassword.length > 0) {
      if (hasUppercase(newPassword)) {
        setUpperCase(2);
      } else {
        setUpperCase(1);
      }
      if (hasLowercase(newPassword)) {
        setLowerCase(2);
      } else {
        setLowerCase(1);
      }
      if (hasNumber(newPassword)) {
        setNumber(2);
      } else {
        setNumber(1);
      }
      if (enoughLength(newPassword)) {
        setLength(2);
      } else {
        setLength(1);
      }
    }
  }, [newPassword]);

  const handleShowPwd = () => {
    setShowPwd(!showPwd);
  };

  return (
    <section className="h-screen">
      <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-2xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
        {id && token ? (
          <div className="w-full p-8">
            <h1 className="font-roboto text-2xl font-bold mt-5 mb-5 text-center">
              Ingrese su nueva contraseña
            </h1>

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

            <form
              onSubmit={handleSubmit}
              className="flex justify-center items-center flex-col"
              action="submit"
            >
              <div className="w-full mt-3">
                <label
                  htmlFor="password"
                  className="block text-sm text-black font-roboto"
                >
                  Nueva contraseña
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
                    onChange={handleInput}
                    type={showPwd ? "text" : "password"}
                    required
                    className=" border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0 "
                  />
                </div>
              </div>
              {upperCase === 2 &&
              lowerCase === 2 &&
              number === 2 &&
              length === 2 ? (
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-violet-500 my-5"
                >
                  Aceptar
                </button>
              ) : (
                <button
                  disabled
                  onClick={handleSubmit}
                  type="submit"
                  className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-300 rounded-xl my-5"
                >
                  Aceptar
                </button>
              )}
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="font-medium text-2xl">
              No tienes permisos para realizar esta acción.
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}

export default ChangePassword;
