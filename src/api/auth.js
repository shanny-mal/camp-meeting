// File: src/api/auth.js
import API from "./api";

export function login(credentials) {
  return API.post("auth/token/", credentials).then((res) => {
    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);
    return fetchMe();
  });
}

export function signup(data) {
  return API.post("auth/signup/", data).then(() =>
    login({ username: data.username, password: data.password })
  );
}

export function fetchMe() {
  return API.get("auth/me/").then((res) => {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  });
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}
