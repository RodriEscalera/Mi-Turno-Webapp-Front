import axios from "axios";
import React, { useState } from "react";
import useQuery from "../Hooks/useQuery";
function ChangePassword() {
  const query = useQuery();
  const id = query.get("id");
  const token = query.get("token");
  const [newPassword, setNewPassword] = useState("");
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
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      {id && token ? (
        <div>
          <h1 className="font-medium text-2xl">Escribe tu contraseña nueva:</h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col"
            action="submit"
          >
            <input
              onChange={handleInput}
              type="password"
              className="mt-3 border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-3 flex items-center justify-center w-[50%] px-10 py-4  font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-violet-500 mb-5 "
            >
              Aceptar
            </button>
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
  );
}

export default ChangePassword;
