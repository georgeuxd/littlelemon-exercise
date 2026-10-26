
import { useState } from "react";
import "./BookingForm.css";

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
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const errors = {
    date: !date
      ? "Please select a reservation date."
      : !isDateValid
        ? "Choose today or a future date."
        : "",
    time: !time
      ? "Please select an available time."
      : !isTimeValid
        ? "Choose a time available for the selected date."
        : "",
    guests: !guests
      ? "Please enter the number of guests."
      : !isGuestsValid
        ? "Choose between 1 and 10 guests."
        : "",
    occasion: !isOccasionValid ? "Please select an occasion." : "",
  };

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
    setSubmitted(true);

    if (!isFormValid) {
      return;
    }

    submitForm({
      date,
      time,
      guests: Number(guests),
      occasion,
    });
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="booking-form__row">
        <div className="booking-form__field">
          <label htmlFor="res-date">Date</label>
          <input
            type="date"
            id="res-date"
            value={date}
            min={todayString}
            onChange={handleDateChange}
            required
            aria-invalid={submitted && Boolean(errors.date)}
            aria-describedby={submitted && errors.date ? "date-error" : undefined}
            className={
              submitted && errors.date
                ? "booking-form__control booking-form__control--error"
                : "booking-form__control"
            }
          />
          {submitted && errors.date && (
            <p className="booking-form__error" id="date-error" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        <div className="booking-form__field">
          <label htmlFor="res-time">Time</label>
          <select
            id="res-time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
            aria-invalid={submitted && Boolean(errors.time)}
            aria-describedby={submitted && errors.time ? "time-error" : undefined}
            className={
              submitted && errors.time
                ? "booking-form__control booking-form__control--error"
                : "booking-form__control"
            }
          >
            <option value="" disabled>
              Select time
            </option>
            {availableTimes.map((availableTime) => (
              <option key={availableTime} value={availableTime}>
                {availableTime}
              </option>
            ))}
          </select>
          {submitted && errors.time && (
            <p className="booking-form__error" id="time-error" role="alert">
              {errors.time}
            </p>
          )}
        </div>
      </div>

      <div className="booking-form__row">
        <div className="booking-form__field">
  <label id="guests-label">Guests</label>

  <div
    className={`booking-form__stepper ${
      submitted && errors.guests
        ? "booking-form__stepper--error"
        : ""
    }`}
  >
    <button
      type="button"
      className="booking-form__stepper-button"
      onClick={() =>
        setGuests((current) =>
          String(Math.max(1, Number(current) - 1))
        )
      }
      disabled={Number(guests) <= 1}
      aria-label="Decrease number of guests"
    >
      <span aria-hidden="true">−</span>
    </button>

    <div
  className="booking-form__stepper-value"
  aria-live="polite"
  aria-labelledby="guests-label"
  aria-describedby={
    submitted && errors.guests ? "guests-error" : undefined
  }
>
      <span className="booking-form__stepper-number">{guests}</span>
      <span className="booking-form__stepper-unit">
        {Number(guests) === 1 ? "guest" : "guests"}
      </span>
    </div>

    <button
      type="button"
      className="booking-form__stepper-button"
      onClick={() =>
        setGuests((current) =>
          String(Math.min(10, Number(current) + 1))
        )
      }
      disabled={Number(guests) >= 10}
      aria-label="Increase number of guests"
    >
      <span aria-hidden="true">+</span>
    </button>
  </div>

  {submitted && errors.guests && (
    <p className="booking-form__error" id="guests-error" role="alert">
      {errors.guests}
    </p>
  )}
</div>

        <fieldset className="booking-form__field booking-form__occasion">
          <legend>Occasion</legend>
          <div
            className="booking-form__toggle-group"
            role="radiogroup"
            aria-label="Choose an occasion"
            aria-describedby={
              submitted && errors.occasion ? "occasion-error" : undefined
            }
          >
            {["Birthday", "Anniversary"].map((option) => (
              <label
                key={option}
                className={
                  occasion === option
                    ? "booking-form__toggle booking-form__toggle--selected"
                    : "booking-form__toggle"
                }
              >
                <input
                  type="radio"
                  name="occasion"
                  value={option}
                  checked={occasion === option}
                  onChange={(event) => setOccasion(event.target.value)}
                  required
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {submitted && errors.occasion && (
            <p className="booking-form__error" id="occasion-error" role="alert">
              {errors.occasion}
            </p>
          )}
        </fieldset>
      </div>

      <button
        type="submit"
        className={
          isFormValid
            ? "booking-form__submit"
            : "booking-form__submit booking-form__submit--disabled"
        }
        aria-disabled={!isFormValid}
        aria-label="On Click"
      >
        Make Your reservation
      </button>
    </form>
  );
}
