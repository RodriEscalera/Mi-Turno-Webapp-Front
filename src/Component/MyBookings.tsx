import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import download from "../assets/icons/download.svg";
import bin from "../assets/icons/delete.svg";
import QRGenerator from "../commons/PdfDocument/QrGenerator";
import DocumentPDF from "../commons/PdfDocument/DocumentPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeleteBooking from "../commons/alerts/DeleteBooking";
import { useNavigate } from "react-router";

function MyBookings() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>([]);
  const [showModal, setShowModal] = useState(0);
  const [idBooking, setIdBooking] = useState("");
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    getBooking();
  }, [user]);

  const getBooking = async () => {
    try {
      const { data } = await axios.get<any, any>(
        `http://localhost:3001/api/booking/getBookingOfUser/${user.id}`
      );
      setBooking(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFunction = (id: any) => {
    setIdBooking(id);
    return setShowModal(1);
  };

  const editFunction = (id: any) => {
    setIdBooking(id);

    navigate(`/updateBooking?bookingId=${id}`);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/api/booking/deleteBooking/${idBooking}`)
      .then((res) => console.log(res))
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const asyncFunctionCloseModal = () => {
    return setShowModal(0);
  };
  return (
    <>
      <div className="absolute hidden">
        {booking.length === 0
          ? null
          : booking.map((shift: any, key: any) => (
              <QRGenerator
                key={key}
                value={shift._id}
                documentId={`qr_${shift._id}`}
              />
            ))}
      </div>
      <section className="h-screen w-full p-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="w-full font-roboto text-xl font-semibold p-2 mt-3 mb-3 text-start ">
            Reservas
          </h1>

          <div className="lg:flex lg:flex-wrap">
            {booking.length === 0
              ? null
              : booking.map((turno: any, i: any) => (
                  <div className=" p-2 lg:w-full md:w-1/2" key={i}>
                    <div className="justify-between w-full flex items-center border-gray-200 border p-6 rounded-lg">
                      <div className="w-4/5 grid grid-cols-1 lg:flex flex-row justify-between">
                        <div className="w-1/4">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            Nombre y Apellido
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">
                            {turno.fullName}
                          </p>
                        </div>
                        <div className="w-1/4">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            Reserva
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">
                            {turno.date} - {turno.time}
                          </p>
                        </div>
                        <div className="w-1/4">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            Sucursal
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">
                            {turno.branch.name}
                          </p>
                        </div>
                        <div className="w-1/4">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            N° de la reserva
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">
                            {turno._id.slice(0, 20)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto rounded px-3 py-1.5 text-center inline-flex items-center"
                          onClick={() => editFunction(booking[i]._id)}
                        >
                          Editar
                        </button>

                        <button className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto rounded px-3 py-1.5 text-center inline-flex items-center">
                          <PDFDownloadLink
                            fileName={`${turno.fullName}_turno.pdf`}
                            document={
                              <DocumentPDF
                                id={`qr_${turno._id}`}
                                data={turno}
                              />
                            }
                          >
                            <img src={download} alt="" />
                          </PDFDownloadLink>
                        </button>

                        <button
                          className="bg-red-300 hover:bg-red-400 text-violet font-semibold font-roboto rounded px-3 py-1.5 text-center inline-flex items-center"
                          onClick={() => deleteFunction(booking[i]._id)}
                        >
                          <img src={bin} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
      {showModal === 1 ? (
        <DeleteBooking
          asyncFunction={deleteFunction}
          handleDelete={handleDelete}
          asyncFunctionCloseModal={asyncFunctionCloseModal}
        />
      ) : null}
    </>
  );
}

export default MyBookings;
