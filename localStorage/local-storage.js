export const getLocalStorageObject = (str) => {
  localStorage.getItem(str);
};
export const setLocalStorageObject = (str, obj) => {
  localStorage.setItem(str, JSON.stringify(obj));
};
export const removeLocalStorageObject = (str) => {
  localStorage.removeItem(str);
};
export const clearLocalStorage = () => {
  localStorage.clear();
};
