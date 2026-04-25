import axios from "axios";
export default async function fetchParcelsByStatus({ queryKey }) {
  const [_key, status] = queryKey;

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const route = process.env.NEXT_PUBLIC_API_GET_ALL_PARCELS_ROUTE;

  try {
    const response = await axios.get(`${baseURL}${route}?status=${status}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
