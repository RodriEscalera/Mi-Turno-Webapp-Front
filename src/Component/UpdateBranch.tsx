import useQuery from "../Hooks/useQuery";
import axios from "axios";
import { useState } from "react";
type FormEvent = React.FormEvent<HTMLFormElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const UpdateBranch = () => {
  const [branchInfo, setBranchInfo] = useState({});
  const [inputs, setInputs] = useState({
    nombre: "",
    email: "",
    telefono: "",
    capacidadMaxima: "",
    horarioDeInicio: "",
    horarioDeCierre: "",
  });
  const query = useQuery();
  const branchId = query.get("branchId");

  const handleInputs = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

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
    } catch (err) {
      console.log(err);
    }
  };

  // const getBranch = async () => {
  //   try {
  //     const { data } = await axios.post<any>(
  //       `http://localhost:3001/api/branches/branches/${branchId}`,
  //       { token: window.localStorage.getItem("token") }
  //     );
  //     setOperator(data);
  //     for (const key in data) {
  //       dispatch(setOperatorData({ field: key, data: data[key] }));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  console.log(branchId);

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="w-cb h-cb max-[768px]:w-cbmd max-[768px]:h-cbmd shadow-rl bg-white rounded-lg p-7"
      >
        <h1 className="font-roboto text-xl font-bold">Crear nueva sucursal</h1>
        <div className="flex-col flex mt-4">
          <label htmlFor="nombre">Nombre</label>
          <input
            name="nombre"
            className="border-gray-300 rounded-lg focus:border-purple-500 border-2 focus:ring-0"
            type="text"
            id="nombre"
            onChange={handleInputs}
          />
        </div>
        <div className="flex-col flex mt-4">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            onChange={handleInputs}
            name="email"
            className="border-gray-300 rounded-lg focus:border-purple-500 border-2 focus:ring-0"
            type="text"
            id="email"
          />
        </div>
        <div className="flex justify-between mt-4 max-[768px]:flex-col">
          <div className="flex flex-col">
            <label htmlFor="telefono">Teléfono</label>
            <input
              onChange={handleInputs}
              name="telefono"
              className="border-gray-300 rounded-lg focus:border-purple-500 border-2 focus:ring-0 md:w-96 max-[768px]:w-full"
              type="text"
              id="telefono"
            />
          </div>
          <div className="flex flex-col justify-center max-[640px]:mt-4">
            <label htmlFor="capacidad-maxima">Capacidad Máxima</label>
            <div className="flex flex-col items-center justify-center">
              <select
                onChange={handleInputs}
                name="capacidadMaxima"
                className="border-gray-300 md:w-96 max-[768px]:w-full p-2 rounded-lg focus:border-purple-500 border-2 focus:ring-0 "
              >
                <option value="12">12</option>
                <option value="24">24</option>
              </select>
            </div>
          </div>
        </div>

        {/* */}

        <div className="flex justify-between max-[640px]:mt-4 max-[768px]:flex-col mt-2">
          <div className="flex flex-col justify-center">
            <label htmlFor="horario-inicio">Horario de Inicio</label>
            <div className="flex flex-col items-center justify-center">
              <select
                onChange={handleInputs}
                name="horarioDeInicio"
                className="border-gray-300 md:w-96 max-[768px]:w-full p-2 rounded-lg focus:border-purple-500 border-2 focus:ring-0 "
              >
                <option value="-">-</option>

                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-center max-[640px]:mt-4 ">
            <label htmlFor="horario-cierre">Horario de Cierre</label>

            <div className="flex flex-col items-center justify-center">
              <select
                onChange={handleInputs}
                name="horarioDeCierre"
                className="border-gray-300 md:w-96 max-[768px]:w-full p-2 rounded-lg focus:border-purple-500 border-2 focus:ring-0 "
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
          className="mt-4 flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 mb-5 "
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default UpdateBranch;
