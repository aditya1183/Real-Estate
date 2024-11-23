import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import axios from "axios";

SwiperCore.use([Navigation]);

export default function AllListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copiedListing, setCopiedListing] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await axios(`/api/admin/getalllistings`);
        const data = await res.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        console.log(data);
        setListings(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/admin/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
      } else {
        alert("Failed to delete the listing.");
      }
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("An error occurred while deleting the listing.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          All Listings
        </h1>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl">Something went wrong!</p>
        )}

        {!loading && listings.length === 0 && (
          <p className="text-center my-7 text-2xl">No listings found.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[250px] rounded-lg"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold">
                  {listing.name} - $
                  {listing.offer
                    ? listing.discountPrice.toLocaleString("en-US")
                    : listing.regularPrice.toLocaleString("en-US")}
                  {listing.type === "rent" && " / month"}
                </p>
                {/* <button
                  className="bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => handleDelete(listing._id)}
                >
                  Delete
                </button> */}
              </div>
              <p className="text-gray-600 text-sm flex items-center mt-2">
                <FaMapMarkerAlt className="text-green-700 mr-2" />
                {listing.address}
              </p>
              <div className="flex gap-4 my-2">
                <p className="bg-red-900 text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 text-white text-center p-1 rounded-md">
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
              <div className="flex items-center justify-between mt-4">
                <button
                  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/listing/${listing._id}`
                    );
                    setCopiedListing(listing._id);
                    setTimeout(() => setCopiedListing(null), 2000);
                  }}
                >
                  <FaShare />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => handleDelete(listing._id)}
                >
                  Delete
                </button>
                {copiedListing === listing._id && (
                  <p className="text-sm text-green-600">Link copied!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
