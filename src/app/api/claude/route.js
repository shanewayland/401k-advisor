export async function POST(request) {
  const body = await request.json();

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
  };

  const usesWebSearch = body.tools?.some((t) => t.type === "web_search_20250305");
  if (usesWebSearch) {
    headers["anthropic-beta"] = "web-search-2025-03-05";
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log("Anthropic status:", response.status);
  console.log("Anthropic response:", JSON.stringify(data).slice(0, 500));
  return Response.json(data);
}
