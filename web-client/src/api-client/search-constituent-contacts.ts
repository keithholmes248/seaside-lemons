import { operations, components } from "../.././../api-spec/seaside-lemon-schema";
import { fetchWithAuth } from "./fetch";

export type SearchConstituentContactsQueryParams = operations["SearchConstituentContacts"]["parameters"]["query"];
export type SearchConstituentContactsResponseBody = operations["SearchConstituentContacts"]["responses"]["2XX"]["content"]["application/json"];
export type ConstituentContact = components["schemas"]["ConstituentContact"];

export async function searchConstituentContacts(
  page: number = 0,
  pageSize: number = 10,
  orderByField?: "givenName" | "familyName" | "email",
  orderByDirection?: "asc" | "desc",
  textFilter?: string
): Promise<SearchConstituentContactsResponseBody> {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page.toString());
  searchParams.set("pagesize", pageSize.toString());

  if (orderByField) {
    searchParams.set("orderbyfield", orderByField);

    if (orderByDirection) {
      searchParams.set("orderbydirection", orderByDirection);
    }
  }

  if (textFilter) {
    searchParams.set("filter", textFilter);
  }

  const requestOptions: RequestInit = {
    method: "get",
  };

  const response = await fetchWithAuth("/contacts", requestOptions, searchParams);
  const contacts = (await response.json()) as unknown as SearchConstituentContactsResponseBody;
  return contacts;
}
