import { Dayjs } from "dayjs";
import { operations, components } from "../../../api-spec/seaside-lemon-schema";
import { fetchWithAuth } from "./fetch";

export type CsvForContactsQueryParams = operations["csv-for-contacts"]["parameters"]["query"];
export type CsvForContactsResponseBody = operations["csv-for-contacts"]["responses"]["2XX"]["content"]["application/json"];

export type NewConstituentContact = components["schemas"]["NewConstituentContact"];

export async function CsvForContacts(beginDate?: Dayjs | null, endDate?: Dayjs | null): Promise<void> {
  const searchParams = new URLSearchParams();
  if (beginDate) {
    searchParams.set("createdatbegin", beginDate.valueOf().toString());
  }
  if (endDate) {
    searchParams.set("createdatend", endDate.valueOf().toString());
  }

  const requestOptions: RequestInit = {
    method: "GET",
  };

  const response = await fetchWithAuth("/contacts/csv-for-contacts", requestOptions, searchParams);
  const data = await response.text();

  var blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  var link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "contacts.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
