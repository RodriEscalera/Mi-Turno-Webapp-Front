import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import QRGenerator from "../commons/PdfDocument/QrGenerator";
import DocumentPDF from "../commons/PdfDocument/DocumentPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import cruz from "../assets/icons/cruzRoja.svg";
import llave from "../assets/icons/llaveInglesa.svg";
import DeleteBooking from "../commons/alerts/DeleteBooking";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [lastBooking, setLastBooking] = useState<any>({});
  const [showModal, setShowModal] = useState(0);
  const [render, setRender] = useState(false);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    getBooking();
  }, [user]);

  useEffect(() => {
    if (lastBooking._id) {
      setRender(true);
    }
  }, [lastBooking]);

  const getBooking = async () => {
    const { data } = await axios.get<any, any>(
      `http://localhost:3001/api/booking/getLastBooking/${user.id}`
    );
    setLastBooking(data);
  };
  const asyncFunction = () => {
    return setShowModal(1);
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:3001/api/booking/deleteBooking/${lastBooking._id}`
      )
      .then((res) => console.log(res))
      .then(() => navigate("/myBookings"))
      .catch((err) => console.log(err));
  };

  const editFunction = (id: any) => {
    navigate(`/updateBooking?bookingId=${lastBooking._id}`);
  };

  const asyncFunctionCloseModal = () => {
    return setShowModal(0);
  };
  console.log(lastBooking);

  return (
    <>
      <div className="absolute hidden">
        <QRGenerator
          value={lastBooking._id}
          documentId={`qr_${lastBooking._id}`}
        />
      </div>
      <div className="mt-14 mx-24 px-8 h-screen">
        <div className="">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className="mx-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 3H32C34.7614 3 37 5.23858 37 8V32C37 34.7614 34.7614 37 32 37H8C5.23858 37 3 34.7614 3 32V8C3 5.23858 5.23858 3 8 3ZM0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8ZM28.7148 13.629L18.5 23.8438L12.7852 18.129C12.3947 17.7385 11.7615 17.7385 11.371 18.129L10.629 18.871C10.2385 19.2615 10.2385 19.8947 10.629 20.2852L17.4219 27.0781L17.8088 27.4482C18.1954 27.818 18.8046 27.818 19.1912 27.4482L19.5781 27.0781L30.871 15.7852C31.2615 15.3947 31.2615 14.7615 30.871 14.371L30.129 13.629C29.7385 13.2385 29.1053 13.2385 28.7148 13.629Z"
              fill="#CC6AFF"
            />
          </svg>
          <p className="text-center text-violet mt-7 text-[1.625rem] font-roboto font-bold ">
            ¡Gracias por tu reserva!
          </p>
          <p className="text-center mt-6 text-sm font-roboto px-24">
            En hasta 5 minutos, recibirás un correo electrónico en{" "}
            <span>{lastBooking.email}</span> con todos los detalles de tu
            reservación. Recordá revisar tu buzón de correo no deseado o
            promociones.
          </p>
          {render ? (
            <button className="flex items-center justify-center max-w-sm px-10 py-3 m-auto mt-6 mb-10 text-base font-roboto text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-violet-500 mb-5 ">
              <PDFDownloadLink
                fileName={`${lastBooking.fullName}_turno.pdf`}
                document={
                  <DocumentPDF
                    id={`qr_${lastBooking._id}`}
                    data={lastBooking}
                  />
                }
              >
                ¿Quéres imprimir tu comprobante?
              </PDFDownloadLink>
            </button>
          ) : null}
        </div>
        <hr className=" border-gray-300" />
        <div className="flex flex-row mt-6">
          <div className="mr-1 w-4/5">
            <p className="text-[1.625rem] font-roboto font-bold">
              Reserva <span className="text-violet">#{lastBooking._id}</span>
            </p>
            <p className="text-sm font-roboto font-semibold mt-2">
              Hecho el {lastBooking.createdAt} hs para el {lastBooking.date} a
              las {lastBooking.time} hs.
            </p>
            <div className="grid grid-cols-2 mt-20 text-sm font-roboto font-normal">
              <div className="">
                <p className="mb-2 text-base font-bold">
                  {lastBooking.fullName}
                </p>
                <p className=" mb-1 text-grey8">
                  <span className="font-semibold ">Mail: </span>
                  {lastBooking.email}
                </p>
                <p className="text-grey8">
                  <span className="font-semibold">Teléfono: </span>
                  {lastBooking.phone}
                </p>
              </div>
              <div>
                <p className="mb-2 text-base font-bold">Reserva</p>
                <p className="mb-1 text-grey8">
                  <span className="font-semibold">Sucursal: </span>
                  {lastBooking.branch ? lastBooking.branch.name : ""}
                </p>
                <p className="text-grey8">
                  <span className="font-semibold">Horario: </span>
                  {lastBooking.time} hs
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-1 w-1/5 p-auto">
            <button
              className="flex bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto rounded-lg px-6 py-2 m-2 mb-1 text-center items-center text-base justify-center"
              type="button"
              onClick={editFunction}
            >
              <img className="mr-2" src={llave} alt="" />
              Editar reserva
            </button>
            <button
              className="flex bg-violetSecondary hover:bg-violetSecondaryHover text-error font-semibold font-roboto rounded-lg px-6 py-2 m-2 mt-1 text-center items-center text-base justify-center"
              type="button"
              onClick={asyncFunction}
            >
              <img className="mr-2" src={cruz} alt="" /> Cancelar reserva
            </button>
          </div>
        </div>
      </div>
      {showModal === 1 ? (
        <DeleteBooking
          handleDelete={handleDelete}
          asyncFunctionCloseModal={asyncFunctionCloseModal}
        />
      ) : null}
    </>
  );
};

export default Booking;
