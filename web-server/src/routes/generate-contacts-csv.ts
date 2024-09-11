import { Response } from "express";
import { components, operations } from "../../../api-spec/seaside-lemon-schema";
import { ExpressRequestWithAuthToken } from "../middleware/firebase-auth.middleware";
import { ConstituentContactFirebaseDocument, getConstituentContactCollectionRef } from "../database/constituent-contacts.firestore-collection";
import { Timestamp } from "firebase-admin/firestore";

type ConfirmUniqueEmailAddressForContactQueryParams = operations["csv-for-contacts"]["parameters"]["query"];

export async function CreateConstituentContactCsvApiRoute(
  req: ExpressRequestWithAuthToken<never, ConfirmUniqueEmailAddressForContactQueryParams>,
  res: Response<string>
): Promise<void> {
  const ConstituentContactCollectionRef = getConstituentContactCollectionRef();
  const userId = req?.firebaseAuthToken?.uid;
  const queryParams = req?.query;

  let query = ConstituentContactCollectionRef.where("firebaseUserId", "==", userId).orderBy("createdAt", "desc");

  if (queryParams?.createdatbegin) {
    query = query.where("createdAt", ">=", Timestamp.fromMillis(Number(queryParams?.createdatbegin)));
  }

  if (queryParams?.createdatend) {
    query = query.where("createdAt", "<=", Timestamp.fromMillis(Number(queryParams?.createdatend)));
  }

  const querySnapshot = await query.get();

  let csvData = ["Email", "Given Name", "Family Name", "Created At"].join(",") + "\r\n";

  querySnapshot.docs.forEach((contactDocument) => {
    const documentData = contactDocument.data();

    csvData += [documentData.email, documentData.givenName, documentData.familyName, documentData.createdAt.toDate().toString()].join(",") + "\r\n";
  });

  res
    .set({
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="contacts.csv"`,
    })
    .send(csvData);
}
