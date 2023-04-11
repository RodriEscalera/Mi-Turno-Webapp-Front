export const Button = ({ enable }: any) => {
  return (
    <>
      {enable ? (
        <button className="bg-purple-600 text-white px-4  text-base py-2 font-roboto rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-violet-500 ">
          Confirmar reserva
        </button>
      ) : (
        <button className="bg-grey3 text-grey6 text-base font-semibold font-roboto py-2 px-4 rounded-lg">
          Confirmar reserva
        </button>
      )}
    </>
  );
};
