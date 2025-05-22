import prisma from "@/lib/prisma";
function getCookies(req) {
  const cookie = req.headers.get("cookie") || "";
  const cookieObj = {};
  cookie.split(";").forEach((item) => {
    const [key, value] = item.split("=").map((v) => v?.trim());
    if (key && value) {
      cookieObj[key] = decodeURIComponent(value);
    }
  });
  return cookieObj;
}

export async function GET(req) {
  const cookies = getCookies(req);
  const userEmail = cookies.userEmail;

  if (!userEmail) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const emails = await prisma.email.findMany({
      where: {
        email: userEmail,
      },
    });
    if (!emails) {
      return new Response("No emails found", { status: 404 });
    }
    return new Response(JSON.stringify(emails));
  } catch (err) {
    console.error("Error fetching emails:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
