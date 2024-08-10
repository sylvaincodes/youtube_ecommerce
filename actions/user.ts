import axios from "axios";

export async function getUserById(id: string | undefined) {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/user",
      {
        params: {
          user_id: id,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return error;
  }
}
