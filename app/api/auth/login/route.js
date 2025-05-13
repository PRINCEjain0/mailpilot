export async function GET() {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const redirect_url = process.env.REDIRECT_URL;
  const scope = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" ");

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", client_id);
  authUrl.searchParams.set("redirect_uri", redirect_url);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scope);

  return Response.redirect(authUrl.toString());
}
