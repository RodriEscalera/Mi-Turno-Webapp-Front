const ModalError = () => {
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
              className="-m-1 flex items-center text-red-500 mx-auto"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 3.5H18C19.3807 3.5 20.5 4.61929 20.5 6V18C20.5 19.3807 19.3807 20.5 18 20.5H6C4.61929 20.5 3.5 19.3807 3.5 18V6C3.5 4.61929 4.61929 3.5 6 3.5ZM2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM8.625 9.70312L10.9219 12L8.625 14.2969C8.32728 14.5946 8.32728 15.0773 8.625 15.375C8.92272 15.6727 9.40541 15.6727 9.70312 15.375L12 13.0781L14.2969 15.375C14.5946 15.6727 15.0773 15.6727 15.375 15.375C15.6727 15.0773 15.6727 14.5946 15.375 14.2969L13.0781 12L15.375 9.70312C15.6727 9.40541 15.6727 8.92272 15.375 8.625C15.0773 8.32728 14.5946 8.32728 14.2969 8.625L12 10.9219L9.70312 8.625C9.40541 8.32728 8.92272 8.32728 8.625 8.625C8.32728 8.92272 8.32728 9.40541 8.625 9.70312Z"
                fill="#E53939"
              />
            </svg>

            <h2 className="text-lg font-semibold pt-4 pb-1 font-roboto ">
              No se pudo realizar el cambio
            </h2>
            <p className="text-sm font-normal font-roboto">
              Este turno ya fue ocupado, vuelve a intentarlo más tarde o
              modificando algún parámetro
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

export default ModalError;
