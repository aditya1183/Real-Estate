import React from "react";
import ProfileDashboardSidebar from "./ProfileDashboardSidebar";
import ProfileDashboardupdateprofile from "./ProfileDashboardupdateprofile.jsx";
import ProfileDashboarAdditionalDetail from "./ProfileDashboardAddionalDetails";
import BasicProfile from "./BasicProfile";
import VerifyPasswordtoDeleteAccount from "../pages/VerifyPasswordtoDeleteAccount.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Profiledashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <ProfileDashboardSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <BasicProfile />}
      {/* posts... */}

      {/* users */}
      {tab === "additionaldetails" && <ProfileDashboarAdditionalDetail />}
      {/* comments  */}
      {/* {tab === "comments" && <DashComments />} */}
      {/* dashboard comp */}
      {/* {tab === "" && <DashboardComp />} */}
      {tab == "updateProfile" && <ProfileDashboardupdateprofile />}
      {tab == "AdditionalDetails" && <ProfileDashboarAdditionalDetail />}
      {tab == "verifypasswordtodeleteaccount" && (
        <VerifyPasswordtoDeleteAccount />
      )}
    </div>
  );
};

export default Profiledashboard;
