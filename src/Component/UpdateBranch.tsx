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
    name: branchInfo.name,
    email: branchInfo.email,
    phone: branchInfo.phone,
    maxCapacity: "",
    startingTime: branchInfo.startingTime,
    closingTime: branchInfo.closingTime,
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
      setInputs({
        name: data.name,
        phone: data.phone,
        email: data.email,
        closingTime: data.closingTime,
        startingTime: data.startingTime,
        maxCapacity: data.maxCapacity,
      });
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
      console.log(response.data);

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
  console.log(inputs);
  return (
    <section className="h-screen">
      <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-4xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <h1 className="w-full font-roboto text-xl font-semibold mt-5 mb-5 text-start">
            Editar sucursal
          </h1>
          <div className="flex-col flex mt-4">
            <label
              htmlFor="name"
              className="block text-sm text-black font-roboto"
            >
              Nombre
            </label>
            <input
              defaultValue={inputs.name}
              name="name"
              className=" mt-1 border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
              type="text"
              id="name"
              onChange={handleChange}
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
              defaultValue={inputs.email}
              onChange={handleChange}
              name="email"
              className=" mt-1 border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
              type="text"
              id="email"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm text-black font-roboto"
              >
                Teléfono
              </label>
              <input
                defaultValue={inputs.phone}
                onChange={handleChange}
                name="phone"
                className=" mt-1 border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                type="text"
                id="phone"
              />
            </div>
            <div className="">
              <label
                htmlFor="maxCapacity"
                className="block text-sm text-black font-roboto"
              >
                Capacidad Máxima
              </label>
              <div className="mt-1 space-y-1">
                <select
                  onChange={handleChange}
                  name="maxCapacity"
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
                htmlFor="startingTime"
                className="block text-sm text-black font-roboto"
              >
                Horario de Inicio
              </label>
              <div className="mt-1">
                <select
                  onChange={handleChange}
                  id="startingTime"
                  name="startingTime"
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                >
                  <option value="-">{inputs.startingTime}</option>

                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="closingTime"
                className="block text-sm text-black font-roboto"
              >
                Horario de Cierre
              </label>

              <div className="mt-1">
                <select
                  onChange={handleChange}
                  id="closingTime"
                  name="closingTime"
                  className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                >
                  <option value="-">{inputs.closingTime}</option>

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
            className="flex items-center justify-center w-full px-10 py-4 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 mb-5 "
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateBranch;
