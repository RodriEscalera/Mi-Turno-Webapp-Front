import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import Login from "./Component/Login";
import Counter from "./Component/Counter";
import Register from "./Component/Register";
import Home from "./Component/Home";
import CreateBranch from "./Component/CreateBranch";
import BookingPanel from "./Component/BookingPanel";
import NewOperator from "./Component/NewOperator";
import MyBookings from "./Component/MyBookings";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/user";

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
        <Route path="/counter" element={<Counter />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/bookingPanel" element={<BookingPanel />} />
        <Route path="/newOperator" element={<NewOperator />} />
        {user.usertype === "admin" && (
          <Route path="/createBranch" element={<CreateBranch />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
