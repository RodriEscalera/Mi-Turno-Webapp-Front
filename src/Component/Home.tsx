import logo from "../assets/image/turnGuy.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-8 flex flex-col  justify-center w-full h-screen bg-no-repeat bg-cover items-center py-auto ">
      <div className="h-full items-center">
        <img
          className="w-96 h-96 object-cover rounded-b-full"
          src={logo}
          alt=""
        />
      </div>
      <div className="h-full items-center">
        <h1 className="font-roboto text-center text-4xl font-semibold text-gray-700 ">
          Mi turno WebApp
        </h1>
        <Link to="/bookingPanel">
          <button
            type="submit"
            className="flex items-center justify-center w-full px-10 py-4 text-lg font-roboto font-bold text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:outline-none focus:ring-violet-500 mt-8 "
          >
            Reservar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
