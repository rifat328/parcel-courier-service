import axios from "axios";
const createParcel = async (formData) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const route = process.env.NEXT_PUBLIC_API_CREATE_PARCEL_ROUTE;

  try {
    const response = await axios.post(`${baseURL}${route}`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default createParcel;
