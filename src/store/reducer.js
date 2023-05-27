const reducer = (state, action) => {
  console.log({ action });
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        dark_mode: !state.dark_mode,
      };

    case 'SET_COUNTRIES':
      return {
        ...state,
        countries: action.value,
        countryName: null,
      };

    case 'SET_COUNTRY_NAME':
      return {
        ...state,
        countryName: action.value,
      };

    case 'UNSET_COUNTRIES':
      return {
        ...state,
        countries: [],
      };
    default:
      return state;
  }
};

export default reducer;
