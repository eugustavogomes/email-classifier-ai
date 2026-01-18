const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/classify"
    : "/api/classify";

export async function classifyEmail(
  text: string,
  file: File | null
): Promise<any> {
  let response;
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
  } else {
    response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: text }),
    });
  }
  return response.json();
}