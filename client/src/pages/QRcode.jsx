import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
function QRcode() {
  const [qrValue, setQrValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, paymentMethod, customerName, email } = location.state;
  return (
    <div
      className="bg-[#101525] w-full h-full "
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="pt-20 text-white">
        <h1>QR Code Payment</h1>
        <p>Amount: {amount}</p>
        <p>Payment Method ID: {paymentMethod}</p>
        <p>Name: {customerName}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
}

export default QRcode;
