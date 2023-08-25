import type { APIRoute } from "astro";
import { guestsAPI } from "../../../utils/axios";

export const get: APIRoute = async () => {
  try {
    const response = await guestsAPI.get("/seating-chart/by-table");
    const data = response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Error",
        error: error,
      }),
      {
        status: 500,
      }
    );
  }
};
