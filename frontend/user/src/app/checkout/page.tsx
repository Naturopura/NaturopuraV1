"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AiFillCreditCard,
  AiFillGoogleCircle,
  AiFillBank,
} from "react-icons/ai";
import mango from "@/assets/yellow-mango.png";
import apple from "@/assets/apple.png";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("Lydia George");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "Lydia George",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobileNo: "",
  });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState(null);

  const togglePaymentDetails = (method) => {
    setExpandedPayment(expandedPayment === method ? null : method);
  };

  const handleEdit = (address) => {
    setAddressForm(address);
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = () => {
    console.log("Updated Address:", addressForm);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="w-full mx-auto mt-20 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Section */}
        <div className="lg:col-span-2 border rounded-lg shadow-md -space-y-6">
          {/* Delivery Address */}
          <div className="p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Select a delivery address
              </h2>
              {/* Add New Address Button */}
              <button
                onClick={() => setShowAddAddress(true)}
                className="flex items-center font-semibold space-x-2 bg-[#7FA200] text-white px-4 py-2 rounded-lg"
              >
                <span>Add a new address</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4 border border-gray-500 p-4 rounded-lg mt-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="address"
                    value="Lydia George"
                    checked={selectedAddress === "Lydia George"}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="form-radio text-[#7FA200]"
                  />
                  <div>
                    <p className="font-semibold">Lydia George</p>
                    <p className="text-gray-500 font-semibold">
                      23475 Glacier View Dr, Eagle River, Alaska 99577, USA
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleEdit({
                      fullName: "Lydia George",
                      streetAddress: "23475 Glacier View Dr",
                      city: "Eagle River",
                      state: "Alaska",
                      zipCode: "99577",
                      mobileNo: "",
                    })
                  }
                  className="text-lg font-medium text-[#7FA200] hover:underline relative -top-2"
                >
                  Edit
                </button>
              </label>

              <hr className="border-t border-gray-300 my-4" />

              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="address"
                    value="George Clooney"
                    checked={selectedAddress === "George Clooney"}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="form-radio text-[#7FA200]"
                  />
                  <div>
                    <p className="font-semibold">George Clooney</p>
                    <p className="text-gray-500 font-semibold">
                      3448 Ile De France St #242, Fort Wainwright, Alaska 99703,
                      USA
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleEdit({
                      fullName: "George Clooney",
                      streetAddress: "3448 Ile De France St #242",
                      city: "Fort Wainwright",
                      state: "Alaska",
                      zipCode: "99703",
                      mobileNo: "",
                    })
                  }
                  className="text-lg font-medium text-[#7FA200] hover:underline relative -top-2"
                >
                  Edit
                </button>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Choose Payment Method
            </h2>
            <div className="space-y-4">
              {/* Card Payment */}
              <div
                className={`p-4 rounded-lg border ${
                  paymentMethod === "card"
                    ? "border-gray-500"
                    : "border-gray-300"
                } cursor-pointer`}
                onClick={() => {
                  setPaymentMethod("card");
                  togglePaymentDetails("card");
                }}
              >
                <label className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => {}}
                      className="form-radio text-[#7FA200] pointer-events-none"
                    />
                    <AiFillCreditCard className="w-6 h-6" />
                    <span className="font-medium">Debit/Credit Card</span>
                  </div>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      expandedPayment === "card" ? "rotate-0" : "-rotate-90"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                {expandedPayment === "card" && (
                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardDetails.cardNumber}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        value={cardDetails.expiryDate}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiryDate: e.target.value,
                          })
                        }
                        className="w-1/2 p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value,
                          })
                        }
                        className="w-1/2 p-2 border rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Google Pay */}
              <div
                className={`p-4 rounded-lg border ${
                  paymentMethod === "gpay"
                    ? "border-gray-500"
                    : "border-gray-300"
                } cursor-pointer`}
                onClick={() => {
                  setPaymentMethod("gpay");
                  togglePaymentDetails("gpay");
                }}
              >
                <label className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <input
                      type="radio"
                      name="payment"
                      value="gpay"
                      checked={paymentMethod === "gpay"}
                      onChange={() => {}}
                      className="form-radio text-[#7FA200] pointer-events-none"
                    />
                    <AiFillGoogleCircle className="h-6 w-6" />
                    <span className="font-medium">Google Pay (GPay)</span>
                  </div>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      expandedPayment === "gpay" ? "rotate-0" : "-rotate-90"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                {expandedPayment === "gpay" && (
                  <div className="mt-4 flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter UPI ID"
                      className="w-1/3 p-2 border rounded"
                    />
                    <button className="px-4 py-2 bg-[#7FA200] font-semibold text-white rounded">
                      Verify
                    </button>
                  </div>
                )}
              </div>

              {/* PhonePe */}
              <div
                className={`p-4 rounded-lg border ${
                  paymentMethod === "phonepe"
                    ? "border-gray-500"
                    : "border-gray-300"
                } cursor-pointer`}
                onClick={() => {
                  setPaymentMethod("phonepe");
                  togglePaymentDetails("phonepe");
                }}
              >
                <label className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <input
                      type="radio"
                      name="payment"
                      value="phonepe"
                      checked={paymentMethod === "phonepe"}
                      onChange={() => {}}
                      className="form-radio text-[#7FA200] pointer-events-none"
                    />
                    <AiFillBank className="h-6 w-6" />
                    <span className="font-medium">PhonePe</span>
                  </div>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      expandedPayment === "phonepe" ? "rotate-0" : "-rotate-90"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                {expandedPayment === "phonepe" && (
                  <div className="mt-4 flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter UPI ID"
                      className="w-1/3 p-2 border rounded"
                    />
                    <button className="px-4 py-2 bg-[#7FA200] font-semibold text-white rounded">
                      Verify
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 mt-0.5 rounded-lg border space-y-6 shadow-md">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="border border-gray-300 rounded-lg">
            <div className="flex items-center p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Image
                  width={100}
                  height={100}
                  src={mango}
                  alt="Plush toys for babies"
                  className="w-16 h-16 rounded-md object-cover border-2 border-gray-300"
                />
                <div>
                  <p className="font-semibold mb-2">Mango</p>
                  <p className="font-semibold">₹25.20</p>{" "}
                  {/* Moved the price here */}
                </div>
              </div>
              <div className="flex items-center border border-gray-300 rounded-xl ml-36 mt-5 space-x-2">
                <button className="px-2 py-1 text-xl rounded">-</button>
                <span className="text-xl">1</span>
                <button className="px-2 py-1 text-xl rounded">+</button>
              </div>
            </div>

            <div className="flex items-center p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Image
                  width={100}
                  height={100}
                  src={apple}
                  alt="Cute monster baby toys"
                  className="w-16 h-16 rounded-md object-cover border-2 border-gray-300"
                />
                <div>
                  <p className="font-semibold mb-2">Apple</p>
                  <p className="font-semibold">₹45.20</p>{" "}
                  {/* Moved the price here */}
                </div>
              </div>
              <div className="flex items-center border border-gray-300 rounded-xl space-x-2 ml-36 mt-5">
                <button className="px-2 py-1 text-xl rounded">-</button>
                <span className="text-xl">1</span>
                <button className="px-2 py-1 text-xl rounded">+</button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg space-y-2 border border-gray-300">
            <p className="text-gray-500 font-semibold">
              Price Details (2 Items)
            </p>
            <div className="flex justify-between">
              <p className="text-lg">1 x Mango</p>
              <p className="text-lg">₹25.20</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg">1 x Apple</p>
              <p className="text-lg">₹45.20</p>
            </div>

            <div className="border-t pt-2 flex justify-between text-xl font-semibold">
              <p>Total Amount</p>
              <p>₹70.04</p>
            </div>
          </div>

          <button className="w-full bg-[#7FA200] text-white py-3 font-semibold rounded-lg">
            Proceed to pay →
          </button>
        </div>
      </div>

      {/* Add New Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Add a New Address
            </h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
            />
            <input
              type="number"
              placeholder="Mobile Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="State"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddAddress(false)}
                className="px-4 py-2 bg-gray-300 font-semibold hover:bg-gray-400 rounded-lg text-gray-800"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#7FA200] font-semibold rounded-lg text-white">
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 z-50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Update Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                value={addressForm.fullName}
                onChange={handleFormChange}
                placeholder="Full Name"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                name="streetAddress"
                value={addressForm.streetAddress}
                onChange={handleFormChange}
                placeholder="Street Address"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                name="city"
                value={addressForm.city}
                onChange={handleFormChange}
                placeholder="City"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                name="state"
                value={addressForm.state}
                onChange={handleFormChange}
                placeholder="State"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                name="zipCode"
                value={addressForm.zipCode}
                onChange={handleFormChange}
                placeholder="Zip Code"
                className="w-full border p-2 rounded-lg"
              />
              <input
                type="text"
                name="mobileNo"
                value={addressForm.mobileNo}
                onChange={handleFormChange}
                placeholder="Mobile No"
                className="w-full border p-2 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 font-semibold border border-gray-300 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#7FA200] font-semibold text-white rounded-lg hover:bg-[#6d8c00]"
              >
                Update Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
