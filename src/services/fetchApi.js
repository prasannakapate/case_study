export async function getData(url) {
  const response = await fetch(url);
  if (response.ok) return response.json();
  throw response;
}
