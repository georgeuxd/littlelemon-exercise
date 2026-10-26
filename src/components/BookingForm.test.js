
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

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: getFutureDate() },
  });

  fireEvent.change(screen.getByLabelText(/time/i), {
    target: { value: "18:00" },
  });

  fireEvent.change(screen.getByLabelText(/guests/i), {
    target: { value: "4" },
  });

  fireEvent.click(screen.getByLabelText(/anniversary/i));
}

test("applies HTML5 validation attributes to form fields", () => {
  renderBookingForm();

  const dateInput = screen.getByLabelText(/date/i);
  const timeSelect = screen.getByLabelText(/time/i);
  const guestsInput = screen.getByLabelText(/guests/i);
  const birthdayRadio = screen.getByLabelText(/birthday/i);
  const anniversaryRadio = screen.getByLabelText(/anniversary/i);

  expect(dateInput).toHaveAttribute("type", "date");
  expect(dateInput).toBeRequired();
  expect(dateInput).toHaveAttribute("min");

  expect(timeSelect).toBeRequired();

  expect(guestsInput).toHaveAttribute("type", "number");
  expect(guestsInput).toHaveAttribute("min", "1");
  expect(guestsInput).toHaveAttribute("max", "10");
  expect(guestsInput).toHaveAttribute("step", "1");
  expect(guestsInput).toBeRequired();

  expect(birthdayRadio).toHaveAttribute("type", "radio");
  expect(anniversaryRadio).toHaveAttribute("type", "radio");
  expect(birthdayRadio).toHaveAttribute("name", "occasion");
  expect(anniversaryRadio).toHaveAttribute("name", "occasion");
  expect(birthdayRadio).toBeRequired();
  expect(anniversaryRadio).toBeRequired();
});

test("shows validation errors after submitting an empty form", () => {
  renderBookingForm();

  fireEvent.click(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  );

  expect(
    screen.getByText("Please select a reservation date.")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Please select an available time.")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Please select an occasion.")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  ).toHaveAttribute("aria-disabled", "true");
});

test("keeps the form invalid when the selected date is in the past", () => {
  renderBookingForm();

  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: getFutureDate(-1) },
  });

  fireEvent.change(screen.getByLabelText(/time/i), {
    target: { value: "18:00" },
  });

  fireEvent.click(screen.getByLabelText(/birthday/i));

  fireEvent.click(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  );

  expect(
    screen.getByText("Choose today or a future date.")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  ).toHaveAttribute("aria-disabled", "true");
});

test("shows an error when the number of guests is invalid", () => {
  renderBookingForm();

  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: getFutureDate() },
  });

  fireEvent.change(screen.getByLabelText(/time/i), {
    target: { value: "18:00" },
  });

  fireEvent.change(screen.getByLabelText(/guests/i), {
    target: { value: "11" },
  });

  fireEvent.click(screen.getByLabelText(/birthday/i));

  fireEvent.click(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  );

  expect(
    screen.getByText("Choose between 1 and 10 guests.")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  ).toHaveAttribute("aria-disabled", "true");
});

test("enables the button when all fields are valid", () => {
  renderBookingForm();

  fillValidForm();

  expect(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  ).toHaveAttribute("aria-disabled", "false");
});

test("calls dispatch when the reservation date changes", () => {
  const { dispatch } = renderBookingForm();
  const selectedDate = getFutureDate();

  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: selectedDate },
  });

  expect(dispatch).toHaveBeenCalledWith({
    type: "UPDATE_TIMES",
    date: selectedDate,
  });
});

test("submits valid booking data", () => {
  const { submitForm } = renderBookingForm();

  fillValidForm();

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

  expect(submitForm).toHaveBeenCalledTimes(1);
});

test("does not submit invalid booking data", () => {
  const { submitForm } = renderBookingForm();

  fireEvent.click(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  );

  expect(submitForm).not.toHaveBeenCalled();
});
