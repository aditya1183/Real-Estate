// import React from "react";
// import { Sidebar } from "flowbite-react";
// import {
//   HiUser,
//   HiArrowSmRight,
//   HiDocumentText,
//   HiOutlineUserGroup,
//   HiAnnotation,
//   HiChartPie,
// } from "react-icons/hi";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { IoIosCreate } from "react-icons/io";
// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutUserStart,
//   signOutUserFailure,
//   signOutUserSuccess,
// } from "../redux/user/userSlice";

// const ProfileDashboardSidebar = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const [tab, setTab] = useState("");
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tabFromUrl = urlParams.get("tab");
//     if (tabFromUrl) {
//       setTab(tabFromUrl);
//     }
//   }, [location.search]);
//   const handleSignout = async () => {
//     try {
//       const res = await fetch("/api/user/signout", {
//         method: "POST",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signOutUserSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <Sidebar className="w-full md:w-56">
//       <Sidebar.Items>
//         <Sidebar.ItemGroup className="flex flex-col gap-1">
//           {currentUser && currentUser.isAdmin && (
//             <Link to="/dashboard?tab=dash">
//               <Sidebar.Item
//                 active={tab === "dash" || !tab}
//                 icon={HiChartPie}
//                 as="div"
//               >
//                 Dashboard
//               </Sidebar.Item>
//             </Link>
//           )}
//           <Link to="/dashboard?tab=profile">
//             <Sidebar.Item
//               active={tab === "profile"}
//               icon={HiUser}
//               label={currentUser.isAdmin ? "Admin" : "User"}
//               labelColor="dark"
//               as="div"
//             >
//               Profile
//             </Sidebar.Item>
//           </Link>
//           <Link to="/dashboard?tab=updateProfile">
//             <Sidebar.Item
//               active={tab === "updateProfile"}
//               icon={HiUser}
//               labelColor="dark"
//               as="div"
//             >
//               Profile Update
//             </Sidebar.Item>
//           </Link>
//           <Link to="/dashboard?tab=AdditionalDetails">
//             <Sidebar.Item
//               active={tab === "AdditionalDetails"}
//               icon={HiUser}
//               labelColor="dark"
//               as="div"
//             >
//               Additional Details
//             </Sidebar.Item>
//           </Link>
//           <Link to="/dashboard?tab=verifypasswordtodeleteaccount">
//             <Sidebar.Item
//               active={tab === "verifypasswordtodeleteaccount"}
//               icon={HiUser}
//               labelColor="dark"
//               as="div"
//             >
//               Delete Account
//             </Sidebar.Item>
//           </Link>
//           {currentUser.isAdmin && (
//             <Link to="/dashboard?tab=posts">
//               <Sidebar.Item
//                 active={tab === "posts"}
//                 icon={HiDocumentText}
//                 as="div"
//               >
//                 Posts
//               </Sidebar.Item>
//             </Link>
//           )}
//           {currentUser.isAdmin && (
//             <>
//               <Link to="/dashboard?tab=users">
//                 <Sidebar.Item
//                   active={tab === "users"}
//                   icon={HiOutlineUserGroup}
//                   as="div"
//                 >
//                   Users
//                 </Sidebar.Item>
//               </Link>
//               <Link to="/dashboard?tab=comments">
//                 <Sidebar.Item
//                   active={tab === "comments"}
//                   icon={HiAnnotation}
//                   as="div"
//                 >
//                   Comments
//                 </Sidebar.Item>
//               </Link>
//               {/* create post here  */}
//               <Link to="/create-post">
//                 <Sidebar.Item
//                   // active={tab === "comments"}
//                   icon={IoIosCreate}
//                   as="div"
//                 >
//                   Create Post
//                 </Sidebar.Item>
//               </Link>
//             </>
//           )}
//           <Sidebar.Item
//             icon={HiArrowSmRight}
//             className="cursor-pointer"
//             onClick={handleSignout}
//           >
//             Sign Out
//           </Sidebar.Item>
//         </Sidebar.ItemGroup>
//       </Sidebar.Items>
//     </Sidebar>
//   );
// };

// export default ProfileDashboardSidebar;

import React, { useEffect, useState } from "react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { IoIosCreate } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "../redux/user/userSlice";

const ProfileDashboardSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 h-full bg-gray-100 dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 text-lg font-bold text-gray-800 dark:text-gray-200">
          Dashboard
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2 px-4">
            {currentUser && currentUser.isAdmin && (
              <li>
                <Link
                  to="/dashboard?tab=dash"
                  className={`flex items-center space-x-3 p-2 rounded-md ${
                    tab === "dash" || !tab
                      ? "bg-purple-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <HiChartPie className="text-xl" />
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/dashboard?tab=profile"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  tab === "profile"
                    ? "bg-purple-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <HiUser className="text-xl" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=updateProfile"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  tab === "updateProfile"
                    ? "bg-purple-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <HiUser className="text-xl" />
                <span>Profile Update</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=AdditionalDetails"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  tab === "AdditionalDetails"
                    ? "bg-purple-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <HiUser className="text-xl" />
                <span>Additional Details</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=verifypasswordtodeleteaccount"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  tab === "verifypasswordtodeleteaccount"
                    ? "bg-purple-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <HiUser className="text-xl" />
                <span>Delete Account</span>
              </Link>
            </li>
            
            {currentUser.isAdmin && (
              <>
                <li>
                  <Link
                    to="/dashboard?tab=posts"
                    className={`flex items-center space-x-3 p-2 rounded-md ${
                      tab === "posts"
                        ? "bg-purple-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <HiDocumentText className="text-xl" />
                    <span>Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=users"
                    className={`flex items-center space-x-3 p-2 rounded-md ${
                      tab === "users"
                        ? "bg-purple-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <HiOutlineUserGroup className="text-xl" />
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=comments"
                    className={`flex items-center space-x-3 p-2 rounded-md ${
                      tab === "comments"
                        ? "bg-purple-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <HiAnnotation className="text-xl" />
                    <span>Comments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-post"
                    className="flex items-center space-x-3 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <IoIosCreate className="text-xl" />
                    <span>Create Post</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="p-4">
          <button
            onClick={handleSignout}
            className="flex items-center space-x-3 w-full p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            <HiArrowSmRight className="text-xl" />
            <span>Sign Out</span>
          </button>
        </div>
        </div>
        <div className="p-4">
          <button
            onClick={handleSignout}
            className="flex items-center space-x-3 w-full p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            <HiArrowSmRight className="text-xl" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
    
    </div>
  );
};

export default ProfileDashboardSidebar;
