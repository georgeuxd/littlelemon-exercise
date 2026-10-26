
export function initializeTimes() {
  const today = new Date();

  return window.fetchAPI(today);
}

export function updateTimes(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES":
      return window.fetchAPI(new Date(action.date));

    default:
      return state;
  }
}
