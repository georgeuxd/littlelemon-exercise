import { Link, useLocation } from "react-router-dom";

export default function ConfirmedBooking() {
  const location = useLocation();
  const booking = location.state;

  function formatDate(dateString) {
    if (!dateString) return "Not provided";

    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <section className="booking-page confirmation-page">
      <div className="confirmation-page__icon" aria-hidden="true">
        ✓
      </div>

      <p className="eyebrow">Little Lemon Restaurant</p>
      <h1>Booking Confirmed!</h1>

      <p className="confirmation-page__intro">
        Thank you for your reservation. We look forward to welcoming you
        to Little Lemon.
      </p>

      {booking ? (
        <div className="confirmation-page__details">
          <h2>Your reservation details</h2>

          <dl className="confirmation-page__list">
            <div>
              <dt>Date</dt>
              <dd>{formatDate(booking.date)}</dd>
            </div>

            <div>
              <dt>Time</dt>
              <dd>{booking.time}</dd>
            </div>

            <div>
              <dt>Guests</dt>
              <dd>
                {booking.guests}{" "}
                {booking.guests === 1 ? "person" : "people"}
              </dd>
            </div>

            <div>
              <dt>Occasion</dt>
              <dd>{booking.occasion}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p>
          Reservation details are not available. You can return to the
          homepage and make a new reservation.
        </p>
      )}

      <Link to="/" className="confirmation-page__button">
        Back to Homepage
      </Link>
    </section>
  );
}