export const refreshToken = async () => {
  const response = await fetch(`${process.env.SDK_BASE_URL!}/auth/refresh`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: process.env.SDK_TOKEN! }),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const { access_token, refresh_token } = await response.json();

  process.env.SDK_TOKEN = refresh_token;

  return access_token;
};
