export const saveKey = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadKey = (key: string): unknown => {
  return JSON.parse(localStorage.getItem(key) || "null");
};

export const logoutFromStorage = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const removeKey = (key: string) => {
  localStorage.removeItem(key);
};
