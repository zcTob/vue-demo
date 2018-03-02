import * as types from './mutations-types';
export const loading = ({commit}, data) => {
  commit(types.LOADING, data);
};

export const supermarketData = ({commit}, data) => {
  commit(types.SUPERMARKET_DATA, data);
};

export const setSearchHistory = ({commit}, data) => {
  commit(types.SET_SEARCH_HISTORY, data);
};
