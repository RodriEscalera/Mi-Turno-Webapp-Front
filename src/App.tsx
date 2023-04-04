import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/user";
import axios from "axios";
import Login from "./Component/Login";
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
import Booking from "./Component/Booking";
import ViewPDF from "./commons/PdfDocument/ViewPDF";
import UpdateBooking from "./Component/UpdateBooking";
import UpdateOperator from "./Component/UpdateOperator";
import OperatorBooking from "./Component/OperatorBooking";
import UpdateBranch from "./Component/UpdateBranch";

function App(): JSX.Element {
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const me = async () => {
    const { data } = await axios.post("http://localhost:3001/api/users/me", {
      token: window.localStorage.getItem("token"),
    });
    dispatch(setUser(data));
  };

  useEffect(() => {
    if (token) {
      me();
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/bookingPanel" element={<BookingPanel />} />
        <Route path="/changePassword/*" element={<ChangePassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/updateBooking/*" element={<UpdateBooking />} />
        <Route path="/operatorBooking" element={<OperatorBooking />} />

        {user.usertype === "admin" && (
          <>
            <Route path="/createBranch" element={<CreateBranch />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/updateOperator/:id" element={<UpdateOperator />} />
            <Route path="/newOperator" element={<NewOperator />} />
            <Route path="/operators" element={<Operators />} />
            <Route path="/updateBranch/*" element={<UpdateBranch />} />
          </>
        )}
        {user.usertype === "operator" && (
          <Route path="/operatorBooking" element={<OperatorBooking />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
