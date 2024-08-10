import axios from "axios";

export async function getOrdersByUserId(id: string | undefined) {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/order",
      {
        params: {
          user: id,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return error;
  }
}
