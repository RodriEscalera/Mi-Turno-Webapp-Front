import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface FormProps {
  onReservationForm: (data: any) => void;
}

export interface FormData {
  fullName: string;
  phone: string;
  email: string;
  time: string;
}

const FormReservation = ({ onReservationForm }: FormProps) => {
  const horariosDefault = [
    "10:00hs",
    "11:00hs",
    "12:00hs",
    "13:00hs",
    "14:00hs",
    "15:00hs",
    "16:00hs",
    "17:00hs",
  ];
  const [render, setRender] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    time: "",
  });
  const [availableShifts, setAvailableShifts] =
    useState<string[]>(horariosDefault);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookingInGeneral = useSelector((state: any) => state.bookingInGeneral);

  const bringSchedule = async () => {
    //   console.log("ejecutando...");
    const { data } = await axios.post(
      "http://localhost:3001/api/booking/getScheduleOfBooking",
      {
        date: bookingInGeneral.date,
        branch: bookingInGeneral.branch,
      }
    );
    if (data.length > 0) {
      let container: any = [];
      horariosDefault.forEach((element) => {
        data.forEach((fechas: any) => {
          //  console.log("COMPARAMOS: " + element + " CON: " + fechas);
          if (element !== fechas) {
            container.push(element);
          }
        });
        setAvailableShifts(container);
      });
    }
    return new Promise(function (resolve, reject) {
      setRender(false);
      setTimeout(() => {
        setRender(true);
      }, 500);
    });
  };

  useEffect(() => {
    setAvailableShifts(horariosDefault);
    setRender(false);
  }, [bookingInGeneral.branch]);

  useEffect(() => {
    setAvailableShifts(horariosDefault);

    bringSchedule();

    console.log("Se ejecuto!");
  }, [bookingInGeneral.date]);

  useEffect(() => {
    onReservationForm(form);
  }, [form]);

  return (
    <div className="relative w-full">
      <div>
        <label
          htmlFor="time"
          className="block text-sm text-black font-roboto mb-2"
        >
          Hora
        </label>
        <select
          name="time"
          id="time"
          className="w-full p-2.5 text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
          onChange={handleChange}
          required
        >
          <option value=""></option>
          {render
            ? availableShifts.map((element) => (
                <option value={element}>{element}</option>
              ))
            : null}
        </select>
      </div>
      <div className=" mt-5 grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm text-black font-roboto mb-2"
          >
            Nombre y Apellido
          </label>
          <input
            name="fullName"
            type="text"
            id="fullName"
            className="w-full text-sm p-2.5 text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm text-black font-roboto mb-2"
          >
            Teléfono
          </label>
          <input
            name="phone"
            type="text"
            id="phone"
            className="w-full text-sm p-2.5 text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mt-5">
        <label
          htmlFor="email"
          className="block text-sm text-black font-roboto mb-2"
        >
          Email
        </label>
        <input
          name="email"
          type="email"
          className="w-full text-sm p-2.5 text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
          id="email"
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default FormReservation;
