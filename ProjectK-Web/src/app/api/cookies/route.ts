import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "@/app/utils/cookie";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// It will return 200 on success
export async function GET(req: Request, res: NextApiResponse): Promise<any> {
  const something = cookies().getAll();
  return NextResponse.json({ cookies: something });
}

// It will return 200 on success, 400 or 405 on failure.
export async function POST(req: Request, res: NextApiResponse): Promise<any> {
  if (req.method === "POST") {
    const ress = await req.json();
    const name = ress.name;
    const value = ress.value;
    const options = ress.options;
    console.log("received name n value: ", name, value);

    if (!name || !value) {
      console.log("name: ", name);
      return NextResponse.json({
        message: "put the cookie in the jar, beaner",
      },
      {status: 405}
    );
    }

    setCookie(res, name, value, options);
    return NextResponse.json({ message: "exito jiji" }, {status: 200});
  } else {
    console.log("this is reqmethod", req.method);
    return NextResponse.json({ message: "is joever" }, {status: 404});
  }
}
