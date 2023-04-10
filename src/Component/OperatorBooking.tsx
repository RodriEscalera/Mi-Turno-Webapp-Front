import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ConfirmedReservation from "../commons/alerts/ConfirmedReservation";
import vacio from "../assets/image/void.png";

function OperatorBooking() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>([]);
  const [idBooking, setIdBooking] = useState("");
  const [showModal, setShowModal] = useState(0);
  const user = useSelector((state: any) => state.user);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const renderBookingOfBranch = async () => {
      await getBookingOfBranch();
      setRender(true);
    };
    renderBookingOfBranch();
  }, [user.branch]);

  const getBookingOfBranch = async () => {
    try {
      const { data } = await axios.get<any>(
        `http://localhost:3001/api/branches/getBookingsByBranch/${user.branch}`
      );
      setBooking(data);
      console.log("esta es la data:", data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBookingAvailability = async (id: any) => {
    setIdBooking(id);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/booking/updateBookingAvailability/${id}`
      );
      console.log(response.data.message);
      setShowModal(1);
    } catch (error) {
      console.error(error);
    }
  };

  const asyncFunctionCloseModal = () => {
    window.location.reload();
    return setShowModal(0);
  };

  return (
    <>
      {render ? (
        <div>
          <>
            <section className="h-screen w-full p-5">
              <div className="max-w-6xl mx-auto">
                <h1 className="w-full font-roboto text-xl font-semibold p-2 mt-3 mb-3 text-start ">
                  Reservas
                </h1>

                <div className="lg:flex lg:flex-wrap">
                  {booking?.bookings?.length === 0 ? (
                    <div className="flex w-full items-center font-roboto text-2xl justify-center">
                      <div className="mt-16">
                        <img
                          className=" w-60 h-80 object-cover"
                          src={vacio}
                          alt=""
                        />{" "}
                      </div>
                      <p className="text">Aún no hay reservas</p>
                    </div>
                  ) : (
                    booking.bookings?.map((turno: any, i: any) => (
                      <div className=" p-2 lg:w-full md:w-1/2" key={i}>
                        <div className="justify-between w-full flex items-center border-gray-200 border p-6 rounded-lg">
                          <div className=" grid grid-cols-1 lg:gap-32 lg:grid-cols-4">
                            <div className="w-28">
                              <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                                Nombre y Apellido
                              </h2>
                              <p className="text-sm font-roboto font-semibold leading-4">
                                {turno.fullName}
                              </p>
                            </div>
                            <div>
                              <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                                Hora de la reserva
                              </h2>
                              <p className="text-sm font-roboto font-semibold leading-4">
                                {turno.time}
                              </p>
                            </div>
                            <div>
                              <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                                Día de la reserva
                              </h2>
                              <p className="text-sm font-roboto font-semibold leading-4">
                                {turno.date}
                              </p>
                            </div>
                            <div>
                              <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                                N° de la reserva
                              </h2>
                              <p className="text-sm font-roboto font-semibold leading-4">
                                {turno._id.slice(0, 7)}...
                              </p>
                            </div>
                          </div>
                          {turno.available === false ? (
                            <div className="flex space-x-1">
                              <button
                                className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto rounded px-3 py-1.5 text-center inline-flex items-center"
                                onClick={() =>
                                  updateBookingAvailability(
                                    booking?.bookings[i]?._id
                                  )
                                }
                              >
                                Confirmación
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-1">
                              <button
                                className="bg-green-200 hover:bg-green-300 text-exito font-semibold font-roboto rounded px-[1.13rem] py-1.5 text-center inline-flex items-center"
                                disabled
                              >
                                Confirmado
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </>
        </div>
      ) : null}
      {showModal === 1 ? (
        <ConfirmedReservation
          asyncFunctionCloseModal={asyncFunctionCloseModal}
        />
      ) : null}
    </>
  );
}

export default OperatorBooking;
