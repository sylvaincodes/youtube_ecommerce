import axios from "axios";

export async function getProductBySlug(slug: string) {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/products",
      {
        params: {
          slug: slug,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return error;
  }
}
