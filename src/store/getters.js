export const cartLength = (state) => {
  return state.cartLength;
};

export const getSearchHistory = (state) => {
  if (state.searchHistory.length === 0) {
    var his = window.localStorage.getItem('searchHistory');
    if (!his) {
      return state.searchHistory;
    } else {
      return his.split(',');
    }
  } else {
    return state.searchHistory;
  }
};
