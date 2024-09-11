import { FirebaseClientAuth } from "@/firebase/client-firebase";

const URL_BASE = "http://localhost:4000";

export async function fetchWithAuth(urlPath: string, requestOptions: RequestInit, urlSearchParams?: URLSearchParams): Promise<Response> {
  if (!FirebaseClientAuth.currentUser) {
    throw new Error("User not Authenticated");
  }

  const url = new URL(`${URL_BASE}${urlPath}`);

  if (urlSearchParams) {
    urlSearchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  const headers = new Headers(requestOptions.headers);

  const token = await FirebaseClientAuth.currentUser.getIdToken();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  requestOptions.headers = headers;

  console.log("requestOptions:", requestOptions);
  return fetch(url, requestOptions);
}
