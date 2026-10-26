
import BookingForm from "../components/BookingForm";

export default function BookingPage({
  availableTimes,
  dispatch,
  submitForm,
}) {
  return (
    <section className="booking-page">
      <p className="eyebrow">Little Lemon Restaurant</p>
      <h1>Reserve a Table</h1>
      <p>Book your table at Little Lemon.</p>

      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
}
