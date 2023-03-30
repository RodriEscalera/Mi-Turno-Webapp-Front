import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
interface Props {
  onChangeDate: (date: Date) => void;
}
export default function CalendarTest({ onChangeDate }: Props) {
  const [selectedDate, setSelectedDate] = useState<any>({ initial: true });
  const [month, setMonth] = useState<any>({ initial: true });
  const [soldOutBookings, setSoldOutBookings] = useState<any[]>([]);

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
          branch: "6421cb7a5804e40086776e95",
        }
      );

      setSoldOutBookings(data.map((element: any) => dayjs(element)));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSoldOutBookings();
  }, [month]);
  useEffect(() => {
    getSoldOutBookings();
  }, []);

  const handleMonthChange = (newValue: any) => {
    setMonth(newValue);
  };

  const handleDayChange = (newValue: any) => {
    onChangeDate(newValue);
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
