const EndTime = () => {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0 "></div>
      <div className="w-full max-w-sm max-h-72 p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <svg
              width="40"
              height="40"
              className="-m-1 flex items-center mx-auto"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 1.5H16C17.3807 1.5 18.5 2.61929 18.5 4V16C18.5 17.3807 17.3807 18.5 16 18.5H4C2.61929 18.5 1.5 17.3807 1.5 16V4C1.5 2.61929 2.61929 1.5 4 1.5ZM0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4ZM9.25 6.25V10.75C9.25 11.1642 9.58579 11.5 10 11.5C10.4142 11.5 10.75 11.1642 10.75 10.75V6.25C10.75 5.83579 10.4142 5.5 10 5.5C9.58579 5.5 9.25 5.83579 9.25 6.25ZM10.75 13.75C10.75 13.3358 10.4142 13 10 13C9.58579 13 9.25 13.3358 9.25 13.75C9.25 14.1642 9.58579 14.5 10 14.5C10.4142 14.5 10.75 14.1642 10.75 13.75Z"
                fill="#FEEB00"
              />
            </svg>

            <h2 className="text-lg text-black font-semibold pt-4 pb-1 font-roboto ">
              Tiempo finalizado
            </h2>
            <p className="text-sm text-black font-normal font-roboto">
              Su tiempo para realizar la reserva ha caducado
            </p>
          </div>

          <div className="p-3 text-center space-x-4 md:block">
            <button className="flex items-center justify-center w-full px-6 py-3 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-500 focus:ring-0 mb-1 ">
              Volver a intentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndTime;
