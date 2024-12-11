
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Paymentsdetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  // Fetch payment details
  useEffect(() => {
    const fetchPayments = async () => {
      const email = currentUser.email;
      try {
        const response = await axios.post(
          "api/payment/getallpaymentsdetailsbyemail",
          { email }
        );
        setPayments(response.data.payments);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payment details.");
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Purchases</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>PURCHASE DESCRIPTION</th>
            <th style={styles.th}>PRODUCT TYPE</th>
            <th style={styles.th}>ORDER ID</th>
            <th style={styles.th}>PURCHASE DATE</th>
            <th style={styles.th}>INVOICE</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} style={styles.tr}>
              <td style={styles.td}>{payment.listingname}</td>
              <td style={styles.td}>{payment.listingtype}</td>
              <td style={styles.td}>{payment.razorpay_order_id}</td>
              <td style={styles.td}>
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td style={styles.td}>
                <button style={styles.button}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "40px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "14px",
    border: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    textAlign: "center",
    fontSize: "14px",
    border: "1px solid #ddd",
  },
  tr: {
    transition: "background-color 0.3s ease",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    color: "#007bff",
    backgroundColor: "transparent",
    border: "1px solid #007bff",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#333",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
};

export default Paymentsdetails;
