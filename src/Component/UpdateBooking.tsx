import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../commons/DropDown";
import FormReservation, { FormData } from "../commons/FormReservation";
import {
  initialStateBookingData,
  setUpdateBookingData,
  setBookingData,
  setBringBookingData,
} from "../store/bookingData";
import useQuery from "../Hooks/useQuery";
import ModalUpdated from "../commons/alerts/ModalUpdated";
import CalendarFull from "./CalendarFull";

interface Branch {
  name: string;
}

const UpdateBooking = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(0);
  const updateBookingData = useSelector((state: any) => state.bookingInGeneral);

  const user = useSelector((state: any) => state.user);
  const query = useQuery();
  const bookingId = query.get("bookingId");
  const [selectedBranch, setSelectedBranch] = useState<Branch>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [userForm, setUserForm] = useState<FormData>({
    time: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const [render, setRender] = useState(false);

  useEffect(() => {
    const renderBooking = async () => {
      dispatch(setBringBookingData(initialStateBookingData));
      await getReservation();
    };
    setRender(true);

    renderBooking();
  }, []);

  const getReservation = async () => {
    try {
      const { data } = await axios.get<any>(
        `http://localhost:3001/api/booking/getOneBooking/${bookingId}`
      );
      //setReservations(data);
      for (const key in data) {
        dispatch(setBookingData({ field: key, data: data[key] }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleBranchChange = (branch: Branch) => {
    setSelectedBranch(branch);
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleUserChange = (formUser: FormData) => {
    setUserForm(formUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/api/booking/updateBooking/${bookingId}`,
        {
          ...updateBookingData,
          user: user.id,
          branch: selectedBranch,
          date: selectedDate,
          time: userForm.time,
          fullName: userForm.fullName,
          email: userForm.email.toLowerCase(),
          phone: userForm.phone,
        }
      );

      dispatch(setUpdateBookingData(response.data));
      setShowModal(1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {render ? (
        <div>
          <>
            <form onSubmit={handleSubmit}>
              <section className="bg-grey1 h-[180vh] w-full px-5 md:h-screen lg:px-10">
                <div className="w-full flex justify-start">
                  <h1 className="w-full font-roboto text-xl text-start font-semibold mt-9 mb-5 /*  */lg:ml-40 ">
                    Cambiar mi reserva
                  </h1>
                </div>

                <div className=" lg:flex lg:justify-center w-full sm:flex sm:flex-wrap ">
                  <div className="flex flex-col rounded-lg lg:w-679 lg:h-auto lg:mr-8 lg:py-8 lg:px-10 lg:mb-5 mb-2 p-5 bg-white ">
                    <div className="flex justify-start flex-col mt-2 ">
                      <h1 className="font-roboto text-lg font-semibold mb-1 text-start ">
                        Reserva
                      </h1>
                      <div className="space-y-1">
                        <label
                          htmlFor="branch"
                          className="block text-sm text-black font-roboto"
                        >
                          Sucursal seleccionada
                        </label>
                        <div className="mt-1">
                          <input
                            id="branch"
                            name="branch"
                            type="text"
                            disabled
                            defaultValue={updateBookingData?.branch?.name}
                            className="w-full text-sm p-2.5 text-gray-500 bg-white border rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="form"
                          className="block text-sm text-black font-roboto"
                        >
                          Horario seleccionado
                        </label>
                        <div className="mt-1">
                          <input
                            id="form"
                            name="form"
                            type="text"
                            disabled
                            defaultValue={updateBookingData.time}
                            className="w-full text-sm p-2.5 text-gray-500 bg-white border rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-sm text-black font-roboto"
                        >
                          Fecha seleccionada
                        </label>
                        <div className="mt-1">
                          <input
                            id="date"
                            name="date"
                            type="text"
                            disabled
                            defaultValue={updateBookingData.date}
                            className="w-full text-sm p-2.5 text-gray-500 bg-white border rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
                          />
                        </div>
                      </div>
                      <br />
                      <>
                        <h1 className="font-roboto text-lg font-semibold mb-1 text-start ">
                          Nueva reserva
                        </h1>
                        <label htmlFor="branch-select" className="text-sm">
                          Elige una nueva sucursal
                        </label>
                        <div className="flex w-full flex-col mt-5 font-roboto text-sm">
                          <Dropdown
                            options={[]}
                            onSelectedBranch={handleBranchChange}
                          />
                        </div>

                        <div className="flex w-full flex-col mt-5 font-roboto text-sm">
                          <label
                            htmlFor="form"
                            className="block text-m text-black font-roboto"
                          >
                            Actualice sus datos
                          </label>
                          <FormReservation
                            onReservationForm={handleUserChange}
                          />
                        </div>
                      </>

                      <div className="flex justify-start mt-6">
                        <button className="bg-purple-600 text-white px-4  text-base py-2 font-roboto rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-violet-500 ">
                          Cambiar reserva
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-457 lg:ml-3 p-5 rounded-lg bg-white lg:max-h-[25rem]">
                    <div className="flex flex-col items-center">
                      <label htmlFor="calendar">Selecciona un nuevo día</label>
                      <CalendarFull onChangeDate={handleDateChange} />
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </>
        </div>
      ) : null}
      {showModal === 1 ? <ModalUpdated /> : null}
    </>
  );
};

export default UpdateBooking;
