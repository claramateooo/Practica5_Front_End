import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "https://deno.land/std/http/cookie.ts";
import ChangeColor from "../islands/ChangeColor.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const username = cookies.username || "";
    return ctx.render({ username });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const username = form.get("username");
    const headers = new Headers();
    if (typeof username === "string") {
      setCookie(headers, {
        name: "username",
        value: username,
        path: "/",
        httpOnly: true,
        sameSite: "Strict",
      });
    }

    headers.set("Location", "/profile");
    return new Response(null, { status: 303, headers });
  },
};

const Home=(props:PageProps<{ username: string }>)=>{
  const { username } = props.data;
  return (
    <div>
        <ChangeColor/>
      {username ? (
        <h1>Hola, {username}</h1>
      ) : (
        <form method="POST">
          <input name="username" placeholder="Introduce tu nombre" />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};
export default Home;
