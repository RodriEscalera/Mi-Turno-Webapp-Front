import misReservas from "../assets/icons/misReservas.svg";
import miCuenta from "../assets/icons/miCuenta.svg";
import reportes from "../assets/icons/reports.svg";
import operador from "../assets/icons/operator.svg";
import sucursal from "../assets/icons/branch.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const user = useSelector((state: any) => state.user);
  console.log(user.userType);
  return (
    <nav className="shadow-nav lg:py-4 lg:px-24 border-gray-200 rounded white:bg-gray-800 white:border-gray-700 sm: py-3 px-5 bg-white">
      {user.usertype !== "admin" ? (
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to={!user.id ? "/login" : "/bookingPanel"}>
            <button className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto py-2 px-4 rounded">
              Reservar
            </button>
          </Link>

          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
              {user.id ? (
                <>
                  <li className="bg-white sm:py-2">
                    <Link
                      to="/myBookings"
                      className="flex items-center text-black rounded font-semibold font-roboto md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0"
                    >
                      Mis Reservas
                      <img
                        className="pl-1 hover:text-cruceHover"
                        src={misReservas}
                        alt=""
                      />
                    </Link>
                  </li>
                  <li className="bg-white sm:py-2">
                    <Link
                      to="/myAccount"
                      className="flex items-center text-black rounded font-semibold font-roboto md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0"
                    >
                      Mi Cuenta
                      <img
                        className="pl-1 hover:text-cruceHover"
                        src={miCuenta}
                        alt=""
                      />
                    </Link>
                  </li>
                </>
              ) : (
                <li className="bg-white sm:py-2">
                  <Link
                    to="/login"
                    className="flex items-center text-black rounded font-semibold font-roboto md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0"
                  >
                    Iniciar sesión
                    <img
                      className="pl-1 hover:text-cruceHover"
                      src={miCuenta}
                      alt=""
                    />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div>
            <Link to="/createBranch">
              <button className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto py-2 px-4 rounded">
                Crear sucursal
              </button>
            </Link>

            <button className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto py-2 px-4 ml-3 rounded sm: ml-1.5">
              Sucursal
            </button>
          </div>

          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
              <li className="bg-white">
                <Link
                  to="/branches"
                  className="flex items-center text-black rounded font-semibold font-roboto md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0"
                >
                  Sucursales
                  <img
                    className="pl-1 hover:text-cruceHover"
                    src={sucursal}
                    alt="Sucursal"
                  />
                </Link>
              </li>
              <li className="bg-white">
                <Link
                  to="/operators"
                  className="flex items-center text-black rounded font-semibold font-roboto md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0"
                >
                  Operadores
                  <img
                    className="pl-1 hover:text-cruceHover"
                    src={operador}
                    alt="Operador"
                  />
                </Link>
              </li>
              <li className="bg-white">
                <Link
                  to="/reports"
                  className="flex items-center text-black rounded font-semibold font-roboto md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0"
                >
                  Reportes
                  <img
                    className="pl-1 hover:text-cruceHover"
                    src={reportes}
                    alt="Reportes"
                  />
                </Link>
              </li>
              <li className="bg-white">
                <Link
                  to="/myAccount"
                  className="flex items-center text-black rounded font-semibold font-roboto md:hover:bg-transparent md:border-0 md:hover:text-violet md:p-0"
                >
                  Mi Cuenta
                  <img
                    className="pl-1 hover:text-cruceHover"
                    src={miCuenta}
                    alt="Mi cuenta"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
