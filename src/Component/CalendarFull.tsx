import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
interface Props {
  onChangeDate: (date: Date) => void;
}
export default function CalendarTest({ onChangeDate }: Props) {
  const [selectedDate, setSelectedDate] = useState<any>({ initial: true });
  const [month, setMonth] = useState<any>({ initial: true });
  const [soldOutBookings, setSoldOutBookings] = useState<any[]>([]);
  const bookingInGeneral = useSelector((state: any) => state.bookingInGeneral);
  const handle = (date: any) => {
    let bool = false;
    for (let i = 0; i < soldOutBookings.length; i++) {
      if (date.toLocaleString() === soldOutBookings[i].toLocaleString()) {
        bool = true;
      }
    }
    return bool;
  };

  ///////////////////////////////////////////////////////

  const dateFormatYMD = (fecha: Date | any) => {
    let year = fecha.getUTCFullYear();
    let month = fecha.getUTCMonth() + 1;
    let day = fecha.getUTCDate();

    let yearString = year.toString();
    let monthString = ("0" + month).slice(-2);
    let dayString = ("0" + day).slice(-2);

    let fechaFormateada = `${yearString}-${monthString}-${dayString}`;

    return fechaFormateada;
  };

  ////////////////////////////////////////////////////////

  const getSoldOutBookings = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/booking/getSoldOutBookingPerMonth",
        {
          date: month.initial
            ? dateFormatYMD(new Date())
            : dateFormatYMD(month.$d),
          branch: bookingInGeneral.branch,
        }
      );

      setSoldOutBookings(data.map((element: any) => dayjs(element)));
    } catch (err) {
      console.log(err);
    }
  };
  //console.log(bookingInGeneral);
  useEffect(() => {
    getSoldOutBookings();
  }, [month, bookingInGeneral?.branch]);
  useEffect(() => {
    getSoldOutBookings();
  }, []);

  const handleMonthChange = (newValue: any) => {
    setMonth(newValue);
  };

  const handleDayChange = (newValue: any) => {
    const format: any = dateFormatYMD(newValue.$d);
    onChangeDate(format);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["StaticDatePicker"]}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate || new Date()}
          shouldDisableDate={handle}
          onChange={handleDayChange}
          onMonthChange={handleMonthChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
