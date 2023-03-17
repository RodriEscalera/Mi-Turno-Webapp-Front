import React, { useEffect, useState } from "react";

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
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    time: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
          className="w-full p-2.5 text-gray-500 bg-white border rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
          onChange={handleChange}
          required
        >
          <option value=""></option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
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
            className="w-full text-sm p-2.5 text-gray-500 bg-white border rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
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
            className="w-full text-sm w-full p-2.5 text-gray-500 bg-white border rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
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
          className="w-full text-sm p-2.5 text-gray-500 bg-white border rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0"
          id="email"
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default FormReservation;
