import { NextResponse } from "next/server";
import API_URL from "../../helpers/apiurl";

export async function middleware(req) {
  const token = req.cookies.token;
  let response = await fetch(`${API_URL}/auth/check-role`, {
    method: "GET",
    headers: {
      authorization: `${token}`,
    },
  });
  let data = await response.json();
  let role = data.role_id;
  if (req.nextUrl.pathname.includes("/admin") && role !== "admin") {
    console.log("aku jalan didalam if");
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
