import { Response } from "express";
import { components, operations } from "../../../api-spec/seaside-lemon-schema";
import { ExpressRequestWithAuthToken } from "../middleware/firebase-auth.middleware";
import { ConstituentContactFirebaseDocument, getConstituentContactCollectionRef } from "../database/constituent-contacts.firestore-collection";

type ConfirmUniqueEmailAddressForContactQueryParams = operations["ConfirmUniqueEmailForContact"]["parameters"]["query"];
type ConfirmUniqueEmailAddressForContactResponseBody = operations["ConfirmUniqueEmailForContact"]["responses"]["2XX"]["content"]["application/json"];

export async function ConfirmUniqueEmailAddressForContactApiRoute(
  req: ExpressRequestWithAuthToken<never, ConfirmUniqueEmailAddressForContactQueryParams>,
  res: Response<ConfirmUniqueEmailAddressForContactResponseBody>
): Promise<void> {
  const ConstituentContactCollectionRef = getConstituentContactCollectionRef();

  try {
    const query = await ConstituentContactCollectionRef.where("firebaseUserId", "==", req.firebaseAuthToken.uid).where("email", "==", req?.query?.email).get();

    const responseBody: ConfirmUniqueEmailAddressForContactResponseBody = {
      isUnique: query.docs.length === 0,
    };
    res.status(200).json(responseBody);
  } catch (error) {
    res.status(500);
  }
}
