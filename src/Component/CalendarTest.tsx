import React from "react";

import { DayPicker } from "react-day-picker";

export default function CalendarTest() {
  const [selected, setSelected] = React.useState<Date>();

  console.log(selected?.toLocaleDateString());
  return (
    <div className="h-[100vh] flex justify-center items-center ">
      <DayPicker mode="single" selected={selected} onSelect={setSelected} />
    </div>
  );
}
