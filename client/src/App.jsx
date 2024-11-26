import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import VerifyPasswordtoDeleteAccount from "./pages/VerifyPasswordtoDeleteAccount";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/ResetPassword";

import Protuctedroute from "./components/Protuctedroute";
import AllUsers from "./Admin/AllUsers";
import SingleUserInfo from "./Admin/singleUserInfo";
import Admin from "./Admin/Admin";
import GetAllListings from "./Admin/GetAllListings";
import AdditionalDetails from "./pages/AdditionalDetails";
import Getalldeletedusers from "./Admin/Getalldeletedusers";
export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/search"
          element={
            <Protuctedroute>
              <Search />
            </Protuctedroute>
          }
        />
        <Route
          path="/listing/:listingId"
          element={
            <Protuctedroute>
              <Listing />
            </Protuctedroute>
          }
        />

        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} /> */}

        <Route
          element={
            <Protuctedroute>
              <PrivateRoute />
            </Protuctedroute>
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>

        <Route
          path="/veriftpasswordtodeleteaccount/:id"
          element={<VerifyPasswordtoDeleteAccount />}
        />
        <Route path="/forgottenpassword" element={<ForgottenPassword />} />
        <Route path="/resetpassword/" element={<ResetPassword />} />
        <Route path="/getalluser/" element={<AllUsers />} />
        <Route path="/singleuserInfo/:userId" element={<SingleUserInfo />} />
        <Route path="/getalllistings" element={<GetAllListings />} />
        <Route path="/additionaldetails" element={<AdditionalDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/alldeletedusers" element={<Getalldeletedusers />} />
      </Routes>
    </BrowserRouter>
  );
}
