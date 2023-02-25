import type { APIRoute } from "astro";
import { guestsAPI } from "../../../utils/axios";

export const post: APIRoute = async ({ url }) => {
  try {
    const id = url.searchParams.get("id");
    const { data } = await guestsAPI.post(`/guests/${id}/rsvp`, {
      rsvp: true,
    });
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
