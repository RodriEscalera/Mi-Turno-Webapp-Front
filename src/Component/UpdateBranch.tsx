import useQuery from "../Hooks/useQuery";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  setBranchData,
  setUpdateBranch,
  setBringBranchData,
  initialStateBranchData,
} from "../store/updateBranch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

type FormEvent = React.FormEvent<HTMLFormElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

interface FormData {
  name: string;
  phone: number;
  email: string;
  maxCapacity: string;
  startingTime: string;
  closingTime: string;
}

const UpdateBranch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const branchUpdated = useSelector((state: any) => state.updateBranch);
  const [branchInfo, setBranchInfo] = useState<any>({});
  const [inputs, setInputs] = useState<FormData>({
    name: "",
    email: "",
    phone: 0,
    maxCapacity: "",
    startingTime: "",
    closingTime: "",
  });
  const query = useQuery();
  const branchId = query.get("branchId");

  useEffect(() => {
    const renderBooking = async () => {
      dispatch(setBringBranchData(initialStateBranchData));
      await getBranch();
    };

    renderBooking();
  }, []);

  const getBranch = async () => {
    try {
      const { data } = await axios.post<any>(
        `http://localhost:3001/api/branches/onebranch/${branchId}`,
        { token: window.localStorage.getItem("token") }
      );
      setBranchInfo(data);
      for (const key in data) {
        dispatch(setBranchData({ field: key, data: data[key] }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(inputs);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/branches/updateBranch/${branchId}`,
        {
          token: window.localStorage.getItem("token"),
          ...branchUpdated,
          idBranch: branchId,
          name: inputs.name,
          email: inputs.email,
          phone: inputs.phone,
          startingTime: inputs.startingTime,
          closingTime: inputs.closingTime,
        }
      );
      dispatch(setUpdateBranch(response.data));

      navigate("/branches");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  console.log(branchInfo);
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="w-cb h-cb max-[768px]:w-cbmd max-[768px]:h-cbmd shadow-rl bg-white rounded-lg p-7"
      >
        <h1 className="font-roboto text-xl font-bold">Editar sucursal</h1>
        <div className="flex-col flex mt-4">
          <label htmlFor="nombre">Nombre</label>
          <input
            defaultValue={branchInfo.name}
            name="name"
            className="border-gray-300 rounded-lg focus:border-purple-500 border-2 focus:ring-0"
            type="text"
            id="nombre"
            onChange={handleChange}
          />
        </div>
        <div className="flex-col flex mt-4">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            defaultValue={branchInfo.email}
            name="email"
            onChange={handleChange}
            className="border-gray-300 rounded-lg focus:border-purple-500 border-2 focus:ring-0"
            type="text"
            id="email"
          />
        </div>
        <div className="flex justify-between mt-4 max-[768px]:flex-col">
          <div className="flex flex-col">
            <label htmlFor="telefono">Teléfono</label>
            <input
              defaultValue={branchInfo.phone}
              name="phone"
              onChange={handleChange}
              className="border-gray-300 rounded-lg focus:border-purple-500 border-2 focus:ring-0 md:w-96 max-[768px]:w-full"
              type="text"
              id="telefono"
            />
          </div>
          <div className="flex flex-col justify-center max-[640px]:mt-4">
            <label htmlFor="capacidad-maxima">Capacidad Máxima</label>
            <div className="flex flex-col items-center justify-center">
              <select
                name="maxCapacity"
                onChange={handleChange}
                className="border-gray-300 md:w-96 max-[768px]:w-full p-2 rounded-lg focus:border-purple-500 border-2 focus:ring-0 "
              >
                <option value="12">12</option>
                <option value="24">24</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between max-[640px]:mt-4 max-[768px]:flex-col mt-2">
          <div className="flex flex-col justify-center">
            <label htmlFor="horario-inicio">Horario de Inicio</label>
            <div className="flex flex-col items-center justify-center">
              <select
                name="startingTime"
                onChange={handleChange}
                className="text-gray-400 border-gray-300 md:w-96 max-[768px]:w-full p-2 rounded-lg focus:border-purple-500 border-2 focus:ring-0 "
              >
                <option value="-">{branchInfo.startingTime}</option>

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
                name="closingTime"
                onChange={handleChange}
                className="text-gray-400 border-gray-300 md:w-96 max-[768px]:w-full p-2 rounded-lg focus:border-purple-500 border-2 focus:ring-0 "
              >
                <option value="-">{branchInfo.closingTime}</option>

                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
              </select>
            </div>
          </div>
        </div>
        <button
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