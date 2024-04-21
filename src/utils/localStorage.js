export const getToken = (key) => localStorage.getItem(key) || null;
export const getCurrentUser = (key) => localStorage.getItem(key) || '';
export const getEmail = (key) => localStorage.getItem(key) || '';
export const getToggler = (key) => JSON.parse(localStorage.getItem(key) || false);
export const getSearchValues = (key) => localStorage.getItem(key) || '';
export const getSearchValueSaved = (key) => localStorage.getItem(key) || '';