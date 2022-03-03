import axios from "axios";

const BASE_URL = "http://localhost:5555/api/";

const readFun = async (items) => {
  try {
    const res = await axios.get(BASE_URL + items, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res;
    
  } catch (error) {
    return error;
  }
};

const createFun = async (items, data) => {
  try {
    const res = await axios.post(BASE_URL + items, JSON.stringify(data), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

const updateFun = async (items, id, data) => {
  try {
    const res = await axios.put(
      BASE_URL + items + "/" + id,
      JSON.stringify(data),
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    return error;
  }
};

const deleteFun = async (items, id) => {
  try {
    const res = await axios.delete(BASE_URL + items + "/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

const useCRUD = () => {
  return { readFun, createFun, updateFun, deleteFun };
};

export default useCRUD;