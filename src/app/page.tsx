import { App } from "@/components/App";

export default async function Home() {
  const topics = await fetch(`${process.env.SDK_BASE_URL!}/topics`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.SDK_TOKEN!,
    },
  }).then((res) => res.json());

  return <App topics={topics} />;
}
