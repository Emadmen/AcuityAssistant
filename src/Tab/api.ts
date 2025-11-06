const API_BASE = import.meta.env.VITE_API_BASE ?? ""; // keep empty now

export async function sendChat(text: string) {
  if (!API_BASE) {
    // graceful no-backend mode
    return `🧪 Demo mode: (no backend yet) You said: ${text}`;
  }

  const resp = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!resp.ok) throw new Error(await resp.text());
  const { reply } = await resp.json();
  return reply;
}