import React, { useEffect, useState } from "react";
import Dropdown from "../commons/DropDown";
import Steps from "./utils/Steps";
import { Button } from "../commons/Button";
import TurnoCalendar from "../commons/TurnoCalendar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBookingData } from "../store/bookingData";
import FormReservation from "../commons/FormReservation";
import axios from "axios";
import Counter from "../commons/Counter";
import { FormData } from "../commons/FormReservation";
import { useNavigate } from "react-router-dom";
import ModalCheck from "../commons/alerts/ModalCheck";
import CalendarFull from "../Component/CalendarFull";

interface Branch {
  id: number;
}

const BookingPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedDate, setSelectedDate] = useState<any | null>("");
  const [selectedForm, setSelectedForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    time: "",
  });

  const bookingData = useSelector((state: any) => state.bookingInGeneral);

  useEffect(() => {
    dispatch(setBookingData({ field: "branch", data: selectedBranch }));
    dispatch(
      setBookingData({
        field: "date",
        data: selectedDate,
      })
    );
    dispatch(setBookingData({ field: "time", data: selectedForm.time }));
    dispatch(
      setBookingData({ field: "fullName", data: selectedForm.fullName })
    );
    dispatch(setBookingData({ field: "phone", data: selectedForm.phone }));
    dispatch(setBookingData({ field: "email", data: selectedForm.email }));
    dispatch(setBookingData({ field: "available", data: null }));
  }, [selectedBranch, selectedDate, selectedForm, dispatch]);

  const handleOnChangeBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setCurrentStep(2);
  };

  const handleOnChangeDate = (date: any) => {
    setSelectedDate(date);
    setCurrentStep(3);
  };

  const handleOnChangeForm = (form: FormData) => {
    setSelectedForm(form);
    if (
      form.fullName === "" ||
      form.phone === "" ||
      form.email === "" ||
      form.time === ""
    ) {
      setCurrentStep(3);
    } else {
      setCurrentStep(4);
    }
  };
  const user = useSelector((state: any) => state.user);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/booking/createBooking",
        {
          branch: bookingData.branch,
          user: user.id,
          date: bookingData.date,
          time: bookingData.time,
          fullName: bookingData.fullName,
          phone: bookingData.phone,
          email: bookingData.email,
          available: bookingData.available,
        }
      );

      dispatch(setBookingData({ field: "available", data: data }));
      setShowModal(1);
    } catch (error) {
      setShowModal(2);
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="bg-grey1 h-[180vh] w-full px-5 md:h-screen lg:px-10">
          <div className="w-full flex justify-start">
            <h1 className="w-full font-roboto text-xl text-start font-semibold mt-9 mb-5 lg:ml-40 ">
              Hacer una reserva
            </h1>
          </div>

          <div className=" lg:flex lg:justify-center w-full sm:flex sm:flex-wrap ">
            <div className="flex flex-col rounded-lg lg:w-679 lg:h-auto lg:mr-8 lg:py-8 lg:px-10 lg:mb-5 mb-2 p-5 bg-white ">
              <div className="flex justify-start flex-col mt-2 ">
                <h1 className="font-roboto text-lg font-semibold mb-1 text-start ">
                  Reserva
                </h1>

                {!selectedBranch && (
                  <h2 className="block text-sm text-black font-roboto">
                    Seleccioná tu sucursal
                  </h2>
                )}
                {selectedBranch && !selectedDate && (
                  <h2 className="block text-sm text-black font-roboto">
                    Seleccioná el día en el calendario
                  </h2>
                )}
                {selectedBranch && selectedDate && (
                  <h2 className="block text-sm text-black font-roboto">
                    Completá el formulario
                  </h2>
                )}

                <div className="flex w-full mt-6 font-roboto text-sm font-normal">
                  {currentStep > 1 ? (
                    <Steps icon="check" text="Elegí tu sucursal" />
                  ) : (
                    <Steps
                      icon="1"
                      text="Elegí tu sucursal"
                      bgColor={currentStep >= 1 ? "bg-violet" : "bg-grey4"}
                      textColor={
                        currentStep >= 1 ? "text-violet" : "text-grey4"
                      }
                    />
                  )}

                  {currentStep > 2 && selectedBranch ? (
                    <Steps icon="check" text="Elegí el día" />
                  ) : (
                    <Steps
                      icon="2"
                      text="Seleccioná el día"
                      bgColor={currentStep >= 2 ? "bg-violet" : "bg-grey4"}
                      textColor={
                        currentStep >= 2 ? "text-violet" : "text-grey4"
                      }
                    />
                  )}

                  {currentStep > 3 && selectedDate && selectedForm ? (
                    <Steps icon="check" text="Completá el formulario" />
                  ) : (
                    <Steps
                      icon="3"
                      text="Completá el formulario"
                      bgColor={currentStep >= 3 ? "bg-violet" : "bg-grey4"}
                      textColor={
                        currentStep >= 3 ? "text-violet" : "text-grey4"
                      }
                    />
                  )}
                </div>
                <div className="flex w-full flex-col mt-5 font-roboto text-sm">
                  <h2 className="mb-2">Sucursal</h2>
                  <Dropdown
                    options={[]}
                    onSelectedBranch={handleOnChangeBranch}
                  />
                </div>
                {selectedDate && (
                  <div className="flex w-full flex-col mt-5 font-roboto text-sm">
                    <FormReservation onReservationForm={handleOnChangeForm} />
                  </div>
                )}

                {selectedBranch &&
                selectedDate &&
                selectedForm &&
                currentStep >= 4 ? (
                  <div className="flex justify-start mt-6">
                    <Button enable={true} />
                  </div>
                ) : (
                  <div className="flex justify-start mt-6">
                    <Button enable={false} />
                  </div>
                )}
              </div>
            </div>
            {selectedBranch && (
              <div className="lg:w-457 lg:ml-3 p-5  rounded-lg bg-white lg:max-h-[23rem]">
                <div className="flex flex-col items-center">
                  <CalendarFull onChangeDate={handleOnChangeDate} />
                  {selectedDate && (
                    <p className="w-457 text-center py-4 font-roboto rounded-b-lg bg-white">
                      Fecha seleccionada: {selectedDate}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </form>
      {showModal === 1 ? <ModalCheck /> : null}
      <div className="opacity-50 bg-violetHover shadow-timer fixed bottom-0 right-0 rounded-lg text-white text-base font-roboto m-1 p-1 md:m-8 md:p-2 md:opacity-100">
        <Counter />
      </div>
    </>
  );
};

export default BookingPanel;
