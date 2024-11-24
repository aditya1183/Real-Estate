// import React, { useState } from "react";
// import AllUsers from "./AllUsers";
// import GetAllListings from "./GetAllListings";

// const Admin = () => {
//   // State to manage the active section
//   const [activeSection, setActiveSection] = useState("users");

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="bg-gray-800 text-white w-64 p-6">
//         <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
//         <nav className="space-y-4">
//           {/* Button for All Users */}
//           <button
//             onClick={() => setActiveSection("users")}
//             className={`w-full py-2 px-4 rounded text-left ${
//               activeSection === "users"
//                 ? "bg-gray-700"
//                 : "bg-gray-800 hover:bg-gray-600"
//             }`}
//           >
//             All Users
//           </button>
//           {/* Button for All Listings */}
//           <button
//             onClick={() => setActiveSection("listings")}
//             className={`w-full py-2 px-4 rounded text-left ${
//               activeSection === "listings"
//                 ? "bg-gray-700"
//                 : "bg-gray-800 hover:bg-gray-600"
//             }`}
//           >
//             All Listings
//           </button>
//           <button
//             onClick={() => setActiveSection("deletedusers")}
//             className={`w-full py-2 px-4 rounded text-left ${
//               activeSection === "deletedusers"
//                 ? "bg-gray-700"
//                 : "bg-gray-800 hover:bg-gray-600"
//             }`}
//           >
//             All Deleted Users
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">
//             {activeSection === "users" ? "Manage Users" : "Manage Listings"}
//           </h1>
//           {/* Button to Add New */}
//           {activeSection === "listings" && (
//             <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//               Add New Listing
//             </button>
//           )}
//         </div>

//         {activeSection === "users" ? (
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <AllUsers />
//           </div>
//         ) : (
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <GetAllListings />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Admin;

import React, { useState } from "react";
import AllUsers from "./AllUsers";
import GetAllListings from "./GetAllListings";
import DeletedUsers from "./Getalldeletedusers"; // Import the new component
import { useEffect } from "react";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("users");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("users")}
            className={`w-full py-2 px-4 rounded text-left ${
              activeSection === "users"
                ? "bg-gray-700"
                : "bg-gray-800 hover:bg-gray-600"
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setActiveSection("listings")}
            className={`w-full py-2 px-4 rounded text-left ${
              activeSection === "listings"
                ? "bg-gray-700"
                : "bg-gray-800 hover:bg-gray-600"
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => setActiveSection("deletedusers")}
            className={`w-full py-2 px-4 rounded text-left ${
              activeSection === "deletedusers"
                ? "bg-gray-700"
                : "bg-gray-800 hover:bg-gray-600"
            }`}
          >
            All Deleted Users
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeSection === "users"
              ? "Manage Users"
              : activeSection === "listings"
              ? "Manage Listings"
              : "Deleted Users"}
          </h1>
        </div>

        {/* Conditional Rendering */}
        {
          activeSection === "users" ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <AllUsers />
            </div>
          ) : activeSection === "listings" ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <GetAllListings />
            </div>
          ) : activeSection === "deletedusers" ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <DeletedUsers />
            </div>
          ) : null // Handle cases where no section is active
        }
      </main>
    </div>
  );
};

export default Admin;
