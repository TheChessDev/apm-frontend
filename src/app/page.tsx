import { App } from "@/components/App";

export default async function Home() {
  const topics = await fetch("http://localhost:3000/topics", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiVGhlQ2hlc3NEZXYiLCJpYXQiOjE3NDI3OTY1NjUsImV4cCI6MTc0MzY5NjU2NX0.-Q-g4OEubCxLSdqwmHNOvQ7hQky1Kk30O5J35DZTJyU",
    },
  }).then((res) => res.json());

  return <App topics={topics} />;
}
