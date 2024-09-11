import { operations, components } from "../../../api-spec/seaside-lemon-schema";
import { fetchWithAuth } from "./fetch";

export type ConfirmUniqueEmailForContactQueryParams = operations["ConfirmUniqueEmailForContact"]["parameters"]["query"];
export type ConfirmUniqueEmailForContactResponseBody = operations["ConfirmUniqueEmailForContact"]["responses"]["2XX"]["content"]["application/json"];

export type NewConstituentContact = components["schemas"]["NewConstituentContact"];

export async function confirmUniqueEmailForContact(email: string): Promise<boolean> {
  const searchParams = new URLSearchParams();
  searchParams.set("email", email);

  const requestOptions: RequestInit = {
    method: "GET",
  };

  const response = await fetchWithAuth("/contacts/confirm-unique-email", requestOptions, searchParams);
  const data = (await response.json()) as unknown as ConfirmUniqueEmailForContactResponseBody;
  return data.isUnique as boolean;
}
