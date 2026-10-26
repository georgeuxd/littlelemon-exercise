
import { initializeTimes, updateTimes } from "./bookingReducer";

beforeEach(() => {
  window.fetchAPI = jest.fn(() => [
    "17:00",
    "18:00",
    "19:00",
  ]);
});

afterEach(() => {
  delete window.fetchAPI;
});

test("initializeTimes returns the available times from the API", () => {
  const result = initializeTimes();

  expect(window.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  expect(result).toEqual(["17:00", "18:00", "19:00"]);
});

test("updateTimes returns the available times for the selected date", () => {
  const selectedDate = "2026-10-27";

  const result = updateTimes(
    ["17:00", "18:00"],
    {
      type: "UPDATE_TIMES",
      date: selectedDate,
    }
  );

  expect(window.fetchAPI).toHaveBeenCalledWith(
    new Date(selectedDate)
  );
  expect(result).toEqual(["17:00", "18:00", "19:00"]);
});
