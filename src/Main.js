
import { useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import { initializeTimes, updateTimes } from "./utils/bookingReducer";

export default function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  const navigate = useNavigate();

function submitForm(formData) {
  const isSubmitted = window.submitAPI(formData);

  if (isSubmitted) {
    navigate("/confirmed", {
      state: formData,
    });
  }
}

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />

        <Route
          path="/confirmed"
          element={<ConfirmedBooking />}
        />
      </Routes>
    </main>
  );
}
