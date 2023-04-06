import { useInput } from "../Hooks/useInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import DropDown from "../commons/DropDown";

interface FormData {
  name: string;
  dni: number;
  branch: string;
  email: string;
  password: string;
  password2: string;
  usertype: string;
}
interface Branch {
  id: number;
}

function NewOperator() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const navigate = useNavigate();
  const { formulario, handleChange } = useInput<FormData>({
    name: "",
    branch: "",
    dni: 0,
    email: "",
    password: "",
    password2: "",
    usertype: "",
  });

  const { name, dni, email, password, password2 } = formulario;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3001/api/admin/createoperator", {
          token: window.localStorage.getItem("token"),
          fullName: name,
          branch: selectedBranch,
          dni: dni,
          email: email,
          password: password,
          password2: password2,
        })
        .then((res) => res.data)
        .then(() => navigate("/operators"));
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeBranch = (branch: Branch) => {
    setSelectedBranch(branch);
  };

  return (
    <section className="h-screen">
      <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-4xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
        <h1 className="w-full font-roboto text-xl font-semibold mt-5 mb-5 text-start ">
          Creación de operadores
        </h1>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-black font-roboto"
            >
              Nombre
            </label>
            <div className="mt-1">
              <input
                value={name}
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                required
                className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm text-black font-roboto"
            >
              Correo electrónico
            </label>
            <div className="mt-1">
              <input
                value={email}
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                required
                className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="dni"
                className="block text-sm text-black font-roboto"
              >
                DNI
              </label>
              <div className="mt-1">
                <input
                  value={dni === 0 ? "" : dni}
                  onChange={handleChange}
                  id="dni"
                  name="dni"
                  type="text"
                  required
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="branches"
                className="block text-sm text-black font-roboto"
              >
                Sucursal
              </label>
              <DropDown options={[]} onSelectedBranch={handleOnChangeBranch} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-black font-roboto"
              >
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
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
              <div className="mt-1">
                <input
                  value={password2}
                  onChange={handleChange}
                  id="password"
                  name="password2"
                  type="password"
                  required
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 mb-5 "
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewOperator;
