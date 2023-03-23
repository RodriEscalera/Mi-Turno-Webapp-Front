import logo from "../assets/image/turnGuy.png";

const Home = () => {
  return (
    <div className="flex flex-col  justify-center w-full h-screen bg-no-repeat bg-cover items-center py-auto ">
      <div className="h-full items-center">
        <img className="w-96 h-96 object-cover" src={logo} alt="" />
      </div>
      <div className="h-full items-center">
        <h1 className="font-roboto text-center text-4xl font-semibold ">
          Mi turno WebApp
        </h1>
      </div>
    </div>
  );
};

export default Home;
