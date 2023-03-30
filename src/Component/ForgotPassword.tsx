import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [input, setInput] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users/askForChangePassword", {
        email: input,
      });
      alert("Mail enviado!");
    } catch (err) {
      console.log(err);
      alert("No se pudo enviar el mail");
    }
  };

  return (
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
            onChange={handleInput}
            type="email"
            className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
          />

          <button
            onClick={handleSubmit}
            type="submit"
            className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-violet-500 my-5"
          >
            Ingresar
          </button>
        </form>
      </div>
    </section>
    // <div
    //   className="w-full h-[100vh] flex
    // justify-center items-center"
    // >
    //   <div className="flex w-[70%] justify-center items-center flex-col text-center">
    //     <h1 className="font-medium text-2xl font-roboto">
    //       Introduzca su correo electronico para que le enviemos un mail para el
    //       cambio de contraseña.
    //     </h1>
    // <form
    //   className="flex w-[70%] justify-center items-center flex-col text-center"
    //   onSubmit={handleSubmit}
    //   action="submit"
    // >
    //   <input
    //     onChange={handleInput}
    //     type="text"
    //     className=" border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
    //   />

    //   <button
    //     onClick={handleSubmit}
    //     type="submit"
    //     className="w-[30%] mt-4 flex items-center justify-center px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-violet-500 mb-5 "
    //   >
    //     Ingresar
    //   </button>
    // </form>
    //   </div>
    // </div>
  );
}

export default ForgotPassword;
