'use server'

import { NextApiRequest, NextApiResponse } from "next";
import { setCookie, deleteCookie } from "@/app/api/cookies/cookie";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Gets all cookies. It will return 200 on success, 404 if there's nothing to see.
export async function GET(req: Request, res: NextApiResponse): Promise<any> {
  const something = cookies().getAll();

  if (something) return NextResponse.json({ cookies: something }, { status: 200 });
  return NextResponse.json({ error: "nothing on cookies" }, { status: 404 });
}


// Creates a cookie. It will return 200 on success, 400 or 405 on failure.
export async function POST(req: Request, res: NextApiResponse): Promise<any> {
  if (req.method === "POST") {
    const ress = await req.json();
    const name = ress.name;
    const value = ress.value;
    const options = ress.options;

    if (!name || !value) {
      return NextResponse.json({
        message: "put the cookie in the jar",
      },
        { status: 405 }
      );
    }
    setCookie(name, value, options);
    return NextResponse.json({ message: "exito jiji" }, { status: 200 });
  } else {
    console.log("this is reqmethod", req.method);
    return NextResponse.json({ message: "is joever" }, { status: 404 });
  }
}

// Deletes a cookie. Returns 200 on success
export async function DELETE(req: Request, res: NextApiResponse): Promise<any> {

  const request = await req.json();
  const name = request.name;

  if (!name) {
    return NextResponse.json({
      message: "no cookie name huh",
    },
      { status: 405 }
    );
  }

  deleteCookie(name);
  return NextResponse.json({ message: "no more cookie.." }, { status: 200 });
} 