
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingForm from "./BookingForm";

const availableTimes = ["17:00", "18:00", "19:00"];

function getFutureDate(daysAhead = 1) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function renderBookingForm() {
  const dispatch = jest.fn();
  const submitForm = jest.fn();

  render(
    <BookingForm
      availableTimes={availableTimes}
      dispatch={dispatch}
      submitForm={submitForm}
    />
  );

  return { dispatch, submitForm };
}

test("applies HTML5 validation attributes to the form fields", () => {
  renderBookingForm();

  const dateInput = screen.getByLabelText(/choose date/i);
  const timeSelect = screen.getByLabelText(/choose time/i);
  const guestsInput = screen.getByLabelText(/number of guests/i);
  const occasionSelect = screen.getByLabelText(/occasion/i);

  expect(dateInput).toBeRequired();
  expect(dateInput).toHaveAttribute("type", "date");
  expect(dateInput).toHaveAttribute("min");

  expect(timeSelect).toBeRequired();

  expect(guestsInput).toBeRequired();
  expect(guestsInput).toHaveAttribute("min", "1");
  expect(guestsInput).toHaveAttribute("max", "10");
  expect(guestsInput).toHaveAttribute("step", "1");

  expect(occasionSelect).toBeRequired();
});

test("disables the submit button when the form is invalid", () => {
  renderBookingForm();

  const submitButton = screen.getByRole("button", {
    name: /make your reservation/i,
  });

  expect(submitButton).toBeDisabled();
});

test("keeps the submit button disabled when the date is in the past", () => {
  renderBookingForm();

  const dateInput = screen.getByLabelText(/choose date/i);
  const submitButton = screen.getByRole("button", {
    name: /make your reservation/i,
  });

  const pastDate = getFutureDate(-1);

  fireEvent.change(dateInput, {
    target: { value: pastDate },
  });

  expect(submitButton).toBeDisabled();
});

test("keeps the submit button disabled when the number of guests is invalid", () => {
  renderBookingForm();

  const dateInput = screen.getByLabelText(/choose date/i);
  const timeSelect = screen.getByLabelText(/choose time/i);
  const guestsInput = screen.getByLabelText(/number of guests/i);
  const submitButton = screen.getByRole("button", {
    name: /make your reservation/i,
  });

  fireEvent.change(dateInput, {
    target: { value: getFutureDate() },
  });

  fireEvent.change(timeSelect, {
    target: { value: "17:00" },
  });

  fireEvent.change(guestsInput, {
    target: { value: "11" },
  });

  expect(submitButton).toBeDisabled();
});

test("enables the submit button when all fields are valid", () => {
  renderBookingForm();

  const dateInput = screen.getByLabelText(/choose date/i);
  const timeSelect = screen.getByLabelText(/choose time/i);
  const guestsInput = screen.getByLabelText(/number of guests/i);
  const occasionSelect = screen.getByLabelText(/occasion/i);

  const submitButton = screen.getByRole("button", {
    name: /make your reservation/i,
  });

  fireEvent.change(dateInput, {
    target: { value: getFutureDate() },
  });

  fireEvent.change(timeSelect, {
    target: { value: "18:00" },
  });

  fireEvent.change(guestsInput, {
    target: { value: "4" },
  });

  fireEvent.change(occasionSelect, {
    target: { value: "Anniversary" },
  });

  expect(submitButton).toBeEnabled();
});

test("submits the form data when all fields are valid", () => {
  const { submitForm } = renderBookingForm();

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: getFutureDate() },
  });

  fireEvent.change(screen.getByLabelText(/choose time/i), {
    target: { value: "18:00" },
  });

  fireEvent.change(screen.getByLabelText(/number of guests/i), {
    target: { value: "4" },
  });

  fireEvent.change(screen.getByLabelText(/occasion/i), {
    target: { value: "Anniversary" },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  );

  expect(submitForm).toHaveBeenCalledWith({
    date: getFutureDate(),
    time: "18:00",
    guests: 4,
    occasion: "Anniversary",
  });
});
