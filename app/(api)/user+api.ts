import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  const sql = neon(`${process.env.DATAVBASE_URL}`);

  const { name, email, clerkId } = await req.json();

  if (!name || !email || !clerkId) {
    return Response.json(
      { error: "Missing required fieled" },
      { status: 400 }
    );
  }

  try {
    const res = await sql`
    INSERT INTO users(
    name,
    email,
    clerk_id)
    VALUES(
    ${name},
    ${email},
    ${clerkId})
    `;

    return new Response(JSON.stringify({ data: res }), {
      status: 201,
    });
  } catch (error) {
    console.log("[USER_POST]", error);
    return Response.json({ error: error }, { status: 500 });
  }
}
