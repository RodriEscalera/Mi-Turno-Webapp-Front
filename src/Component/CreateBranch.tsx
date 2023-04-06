import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
type FormEvent = React.FormEvent<HTMLFormElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

function CreateBranch(): JSX.Element {
  const [inputs, setInputs] = useState({
    nombre: "",
    email: "",
    telefono: "",
    capacidadMaxima: "",
    horarioDeInicio: "",
    horarioDeCierre: "",
  });

  const handleInputs = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: ButtonEvent | FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/branches/createbranch",

        {
          name: inputs.nombre,
          phone: inputs.telefono,
          email: inputs.email,
          closingTime: inputs.horarioDeCierre,
          startingTime: inputs.horarioDeInicio,
        }
      );
      navigate("/branches");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-screen">
      <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-4xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <h1 className="w-full font-roboto text-xl font-semibold mt-5 mb-5 text-start">
            Crear nueva sucursal
          </h1>
          <div className="flex-col flex mt-4">
            <label
              htmlFor="nombre"
              className="block text-sm text-black font-roboto"
            >
              Nombre
            </label>
            <input
              name="nombre"
              className=" mt-1 border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
              type="text"
              id="nombre"
              onChange={handleInputs}
            />
          </div>
          <div className="flex-col flex mt-4">
            <label
              htmlFor="email"
              className="block text-sm text-black font-roboto"
            >
              Correo Electrónico
            </label>
            <input
              onChange={handleInputs}
              name="email"
              className=" mt-1 border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
              type="text"
              id="email"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="">
              <label
                htmlFor="telefono"
                className="block text-sm text-black font-roboto"
              >
                Teléfono
              </label>
              <input
                onChange={handleInputs}
                name="telefono"
                className=" mt-1 border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                type="text"
                id="telefono"
              />
            </div>
            <div className="">
              <label
                htmlFor="capacidad-maxima"
                className="block text-sm text-black font-roboto"
              >
                Capacidad Máxima
              </label>
              <div className="mt-1 space-y-1">
                <select
                  onChange={handleInputs}
                  name="capacidadMaxima"
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                </select>
              </div>
            </div>
          </div>

          {/* */}

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="horario-inicio"
                className="block text-sm text-black font-roboto"
              >
                Horario de Inicio
              </label>
              <div className="mt-1">
                <select
                  onChange={handleInputs}
                  name="horarioDeInicio"
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                >
                  <option value="-">-</option>

                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="horario-cierre"
                className="block text-sm text-black font-roboto"
              >
                Horario de Cierre
              </label>

              <div className="mt-1">
                <select
                  onChange={handleInputs}
                  name="horarioDeCierre"
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                >
                  <option value="-">-</option>

                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 mb-5 "
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateBranch;
