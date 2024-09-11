import { operations, components } from "../.././../api-spec/seaside-lemon-schema";
import { fetchWithAuth } from "./fetch";

export type CreateConstituentContactsRequestBody = operations["CreateConstituentContact"]["requestBody"];
export type CreateConstituentContactsResponseBody = operations["CreateConstituentContact"]["responses"]["2XX"]["content"]["application/json"];

export type NewConstituentContact = components["schemas"]["NewConstituentContact"];

export async function CreateConstituentContacts(newConstituentContact: NewConstituentContact): Promise<CreateConstituentContactsResponseBody> {
  const requestOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(newConstituentContact),
  };

  const response = await fetchWithAuth("/contacts", requestOptions);
  const contacts = response.json() as unknown as CreateConstituentContactsResponseBody;
  return contacts;
}
