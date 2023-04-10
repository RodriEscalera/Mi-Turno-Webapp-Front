import { useInput } from "../Hooks/useInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import DropDown from "../commons/DropDown";
import ojito from "../assets/icons/openEye.svg";
import ojitoActivo from "../assets/icons/openEye2.svg";
import { message } from "antd";

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
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdRepeat, setShowPwdRepeat] = useState(false);
  const [isMatchPassword, setIsMatchPassword] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
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

  const error = () => {
    messageApi.open({
      type: "error",
      content: "No coinciden las contraseñas",
    });
  };

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

  const handleShowPwd = () => {
    setShowPwd(!showPwd);
  };

  const handleShowPwdRepeat = () => {
    setShowPwdRepeat(!showPwdRepeat);
  };

  const validatePassword2 = () => {
    if (password !== password2) {
      setIsMatchPassword(false);
      error();
    } else {
      setIsMatchPassword(true);
    }
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
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm text-black font-roboto"
              >
                Contraseña
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
                  onChange={handleChange}
                  type={showPwd ? "text" : "password"}
                  required
                  className=" border border-gray-300 block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0 "
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
              <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <input
                    className="hidden js-password-toggle"
                    id="toggle"
                    type="checkbox"
                  />
                  <label
                    className=" px-2 py-1 text-gray-600 font-mono cursor-pointer js-password-label"
                    htmlFor="toggle"
                    onClick={handleShowPwdRepeat}
                  >
                    {showPwdRepeat ? (
                      <img src={ojitoActivo} alt="" />
                    ) : (
                      <img src={ojito} alt="" />
                    )}
                  </label>
                </div>
                <input
                  id="password"
                  name="password2"
                  onChange={handleChange}
                  type={showPwdRepeat ? "text" : "password"}
                  required
                  className={` border ${
                    isMatchPassword ? "border-gray-300" : "border-red-500"
                  } block w-full px-5 py-3 text-base text-neutral-600 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0 `}
                  onBlur={validatePassword2}
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
