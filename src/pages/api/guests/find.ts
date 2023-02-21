import type { APIRoute } from "astro";
import { guestsAPI } from "../../../utils/axios";

export const get: APIRoute = async ({ params, url }) => {
  try {
    const name = url.searchParams.get("name");

    if (name) {
      const { data } = await guestsAPI.get(`/guests/find?name=${name}`);
      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 200,
      });
    }

    return new Response(
      JSON.stringify({
        message: "No search terms provided",
      }),
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 404,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify(err), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      status: 500,
    });
  }
};
