import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/user";
import axios from "axios";
import Login from "./Component/Login";
import Counter from "./commons/Counter";
import Register from "./Component/Register";
import Home from "./Component/Home";
import CreateBranch from "./Component/CreateBranch";
import BookingPanel from "./Component/BookingPanel";
import NewOperator from "./Component/NewOperator";
import MyAccount from "./Component/MyAccount";

import Branches from "./Component/Branches";
import MyBookings from "./Component/MyBookings";
import Operators from "./Component/Operators";
import ChangePassword from "./Component/ChangePassword";
import ForgotPassword from "./Component/ForgotPassword";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const me = async () => {
    const { data } = await axios.post("http://localhost:3001/api/users/me", {
      token: window.localStorage.getItem("token"),
    });
    dispatch(setUser(data));
  };

  useEffect(() => {
    me();
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/createBranch" element={<CreateBranch />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/bookingPanel" element={<BookingPanel />} />
        <Route path="/operators" element={<Operators />} />
        <Route path="/newOperator" element={<NewOperator />} />
        <Route path="/changePassword/*" element={<ChangePassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {user.usertype === "admin" && (
          <>
            <Route path="/createBranch" element={<CreateBranch />} />
            <Route path="/branches" element={<Branches />} />
          </>
        )}
        {/* {user.usertype === "admin" && (
          <Route path="/newOperator" element={<NewOperator />} />
        )} */}
      </Routes>
    </div>
  );
}

export default App;
