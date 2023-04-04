import Dropdown from "../commons/DropDown";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setOperatorData,
  setUpdateOperator,
  setBringOperatorData,
  initialStateOperatorData,
} from "../store/updateOperator";
import useQuery from "../Hooks/useQuery";

interface FormData {
  fullName: string;
  dni: number;
  email: string;
}
interface Branch {
  name: string;
}

const UpdateOperator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const operatorUpdated = useSelector((state: any) => state.updateOp);
  const [inputs, setInputs] = useState<FormData>({
    fullName: "",
    dni: 0,
    email: "",
  });

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [operator, setOperator] = useState<any>({});
  const query = useQuery();
  const operatorId = query.get("operatorId");

  useEffect(() => {
    const renderBooking = async () => {
      dispatch(setBringOperatorData(initialStateOperatorData));
      await getOperator();
    };

    renderBooking();
  }, []);
  console.log(operator, "esto viene del estado operator");
  /* console.log(operatorUpdated, "esto viene del useSelector"); */

  const handleOnChangeBranch = (branch: Branch) => {
    setSelectedBranch(branch);
  };

  const getOperator = async () => {
    try {
      const { data } = await axios.post<any>(
        `http://localhost:3001/api/users/findOne/${operatorId}`,
        { token: window.localStorage.getItem("token") }
      );
      setOperator(data);
      for (const key in data) {
        dispatch(setOperatorData({ field: key, data: data[key] }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/admin/updateOperator/${operatorId}`,
        {
          token: window.localStorage.getItem("token"),
          ...operatorUpdated,
          user: operatorId,
          branch: selectedBranch,
          fullName: inputs.fullName,
          email: inputs.email,
          dni: inputs.dni,
        }
      );
      dispatch(setUpdateOperator(response.data));

      navigate("/operators");
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

  return (
    <section>
      <div className="shadow-rl flex flex-col justify-center items-center w-full max-w-4xl p-8 mx-auto my-10 rounded-lg text-lg bg-white">
        <h1 className="w-full font-roboto text-xl font-semibold mt-5 mb-5 text-start ">
          Editar operador
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
                defaultValue={operator.fullName}
                id="fullName"
                name="fullName"
                type="text"
                required
                className="border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                onChange={handleChange}
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
                defaultValue={operator.email}
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
                  defaultValue={operator.dni}
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
              <Dropdown options={[]} onSelectedBranch={handleOnChangeBranch} />
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
};

export default UpdateOperator;
