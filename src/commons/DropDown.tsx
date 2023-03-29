import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBookingData } from "../store/bookingData";

interface DropDownProps {
  options: string[];
  onSelectedBranch: (branch: any) => void;
}

type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

const Dropdown = (props: DropDownProps) => {
  const [array, setArray] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/branches/allbranches")
      .then((res) => res.data)
      .then((branch) => setArray(branch))

      .catch((error) => {
        console.log("este es el error!!", error);
      });
  }, []);

  const handleSelect = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    setSelectedBranch(target.value);
    props.onSelectedBranch(target.value);
    //dispatch(setBookingData({field:"branch", data:target.value}))
  };

  return (
    <div className="relative w-full">
      <select
        required
        className="w-full p-2.5 text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:border-purple-600 focus:ring-0 "
        onChange={handleSelect}
      >
        <option selected></option>
        {array.length === 0
          ? null
          : array?.map((option: any, i) => (
              <option key={i} value={option._id}>
                {option.name}
              </option>
            ))}
      </select>
    </div>
  );
};

export default Dropdown;
