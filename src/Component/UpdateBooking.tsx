import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../commons/DropDown";
import FormReservation, { FormData } from "../commons/FormReservation";
import { setUpdateBookingData } from "../store/bookingData";
import useQuery from "../Hooks/useQuery";
import ModalUpdated from "../commons/alerts/ModalUpdated";

interface Branch {
  id: string;
}

const UpdateBooking = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(0);
  const updateBookingData = useSelector((state: any) => state.data);
  const user = useSelector((state: any) => state.user);
  const query = useQuery();
  const bookingId = query.get("bookingId");
  const [reservations, setReservations] = useState<any>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch>();
  const [date, setDate] = useState<Date>(new Date());
  const [userForm, setUserForm] = useState<FormData>({
    time: "",
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    getReservation();
  }, [updateBookingData]);

  const getReservation = async () => {
    try {
      const { data } = await axios.get<any>(
        `http://localhost:3001/api/booking/getOneBooking/${bookingId}`
      );
      setReservations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBranchChange = (branch: Branch) => {
    setSelectedBranch(branch);
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
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
          date: date?.toLocaleDateString(),
          time: userForm.time,
          fullName: userForm.fullName,
          email: userForm.email,
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
                    <>
                      <label htmlFor="branch-select">
                        Elige una nueva sucursal
                      </label>
                      <div className="flex w-full flex-col mt-5 font-roboto text-sm">
                        <Dropdown
                          options={[]}
                          onSelectedBranch={handleBranchChange}
                        />
                      </div>

                      <div className="flex w-full flex-col mt-5 font-roboto text-sm">
                        <FormReservation onReservationForm={handleUserChange} />
                      </div>
                    </>

                    <div className="flex justify-start mt-6">
                      <button className="bg-purple-600 text-white px-4  text-base py-2 font-roboto rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-violet-500 ">
                        Cambiar reserva
                      </button>
                    </div>
                  </div>
                </div>
                <div className="lg:w-457 lg:ml-3 p-5 rounded-lg bg-white lg:max-h-[21rem]">
                  <div className="flex flex-col items-center">
                    <label htmlFor="calendar">Selecciona un nuevo día</label>
                    <Calendar
                      onChange={handleDateChange}
                      value={date}
                      className="border-none"
                    />
                  </div>
                </div>
              </div>
            </section>
          </form>
        </>
      </div>
      {showModal === 1 ? <ModalUpdated /> : null}
    </>
  );
};

export default UpdateBooking;
