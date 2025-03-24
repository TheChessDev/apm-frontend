import { App } from "@/components/App";
import { refreshToken } from "@/lib/refreshToken";

export default async function Home() {
  const accessToken = await refreshToken();

  const topics = await fetch(`${process.env.SDK_BASE_URL!}/topics`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());

  return <App topics={topics} />;
}
