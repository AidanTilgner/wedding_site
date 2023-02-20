import type { APIRoute } from "astro";
import { guestsAPI } from "../../../utils/axios";

export const get: APIRoute = async () => {
  try {
    const { data } = await guestsAPI.get("/guests");
    console.log("data", data);
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify(err), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      status: 500,
    });
  }
};
