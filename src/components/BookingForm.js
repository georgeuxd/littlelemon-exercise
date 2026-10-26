
import { useState } from "react";

export default function BookingForm({
  availableTimes,
  dispatch,
  submitForm,
}) {
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("1");
  const [occasion, setOccasion] = useState("Birthday");

  const isDateValid = date !== "" && date >= todayString;
  const isTimeValid = availableTimes.includes(time);
  const isGuestsValid =
    guests !== "" &&
    Number.isInteger(Number(guests)) &&
    Number(guests) >= 1 &&
    Number(guests) <= 10;
  const isOccasionValid = ["Birthday", "Anniversary"].includes(occasion);

  const isFormValid =
    isDateValid &&
    isTimeValid &&
    isGuestsValid &&
    isOccasionValid;

  function handleDateChange(event) {
    const selectedDate = event.target.value;

    setDate(selectedDate);
    setTime("");

    dispatch({
      type: "UPDATE_TIMES",
      date: selectedDate,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const formData = {
      date,
      time,
      guests: Number(guests),
      occasion,
    };

    submitForm(formData);
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        min={todayString}
        onChange={handleDateChange}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
        required
      >
        <option value="" disabled>
          Select a time
        </option>
        {availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        step="1"
        value={guests}
        onChange={(event) => setGuests(event.target.value)}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(event) => setOccasion(event.target.value)}
        required
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <button
  type="submit"
  className="button-primary"
  aria-label="Make your reservation"
  disabled={!isFormValid}
>
  Make Your reservation
</button>
    </form>
  );
}
