import axios from "axios";
import { Buffer } from "buffer";

const BASE_URL = "http://localhost:5555/api/auth/";

const auth = async (url, req) => {
  try {
    const res = axios.post(BASE_URL + url, JSON.stringify(req), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res;
  } catch (error) {
    return await error;
  }
};

const parseToken = () => {
  let token = localStorage.getItem("token");
  console.log("token storage", token);

  if (token != null) {
    var base64Payload = token.split(".")[1];
    var payload = Buffer.from(base64Payload, "base64");

    let data = JSON.parse(payload.toString());

    console.log(data);

    return data;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.clear();
};

const useAUTH = () => {
  return { auth, parseToken, logout };
};

export default useAUTH;
