import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../commons/DropDown";
import FormReservation, { FormData } from "../commons/FormReservation";

interface Reservation {
  id: number;
  branch: string;
  date: Date;
  user: {
    time: string;
    fullName: string;
    email: string;
    phone: string;
  };
}

const UpdateBooking = () => {
  const dispatch = useDispatch();
  const bookingData = useSelector((state: any) => state.data);
  const user = useSelector((state: any) => state.user);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [userForm, setUserForm] = useState<FormData>({
    time: "",
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getOneBooking = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/booking/getOneBooking/${bookingData.id}`
      );
      setReservations(response.data);
    };
    getOneBooking();
  }, []);

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranch(event.target.value);
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
      await axios
        .put(`http://localhost:3001/api/booking/updateBooking/`)
        .then(() => {
          setSelectedReservation(null);
          setDate(new Date());
          setSelectedBranch("");
          setUserForm({
            time: "",
            fullName: "",
            email: "",
            phone: "",
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {" "}
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
                        <label htmlFor="calendar">
                          Selecciona un nuevo día
                        </label>
                        <Calendar onChange={handleDateChange} value={date}  className="border-none" />
                      </div>
                    </div>
            </div>
          </section>
        </form>
      </>
    </div>
  );
};

export default UpdateBooking;
