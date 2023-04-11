import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MailSend from "../commons/alerts/MailSend";

function ForgotPassword() {
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(0);
  const navigate = useNavigate();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users/askForChangePassword", {
        email: input.toLowerCase(),
      });
      asyncFunction();
    } catch (err) {
      console.log(err);
      alert("No se pudo enviar el mail");
    }
  };

  const asyncFunction = () => {
    return new Promise(function (resolve, reject) {
      setShowModal(1);
      setTimeout(resolve, 2000);
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <section className="h-screen">
        <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-2xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
          <h1 className="font-roboto text-2xl font-bold mt-5 mb-5 text-center ">
            Recupere su cuenta
          </h1>
          <p className="text-center font-roboto text-sm mt-3 mb-10">
            Introduzca su correo electronico y recibira un mail para cambiar su
            contraseña.
          </p>

          <form
            className="flex w-full justify-center items-center flex-col text-center"
            onSubmit={handleSubmit}
            action="submit"
          >
            <label
              htmlFor="email"
              className="w-full text-start block text-sm text-black font-roboto my-1"
            >
              Email
            </label>
            <input
              required
              onChange={handleInput}
              type="email"
              className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-violet-500 my-5"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
      {showModal === 1 ? <MailSend /> : null}
    </>
  );
}

export default ForgotPassword;
