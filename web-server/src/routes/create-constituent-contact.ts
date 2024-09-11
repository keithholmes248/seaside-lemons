import { Response } from "express";
import { components } from "../../../api-spec/seaside-lemon-schema";
import { ExpressRequestWithAuthToken } from "../middleware/firebase-auth.middleware";
import { ConstituentContactFirebaseDocument, getConstituentContactCollectionRef } from "../database/constituent-contacts.firestore-collection";
import { Timestamp } from "firebase-admin/firestore";

type CreateConstituentContactRequestBody = components["schemas"]["NewConstituentContact"];
type CreateConstituentContactResponseBody = components["schemas"]["ConstituentContact"];

export async function CreateConstituentContactApiRoute(
  req: ExpressRequestWithAuthToken<CreateConstituentContactRequestBody>,
  res: Response<CreateConstituentContactResponseBody>
): Promise<void> {
  const ConstituentContactCollectionRef = getConstituentContactCollectionRef();

  console.log("requestBody", req.body);

  const constituentContactFirebaseDocument: ConstituentContactFirebaseDocument = {
    firebaseUserId: req.firebaseAuthToken.uid,
    createdAt: Timestamp.now(),

    email: req.body.email.toLowerCase(),
    givenName: req.body.givenName,
    familyName: req.body.familyName,
    fullName: `${req.body.givenName} ${req.body.familyName}`.trim(),
    initials: `${req?.body?.givenName?.charAt(0)}${req?.body?.familyName?.charAt(0)}`.trim(),
  };

  try {
    await ConstituentContactCollectionRef.add(constituentContactFirebaseDocument);

    const responseBody: CreateConstituentContactResponseBody = {
      givenName: constituentContactFirebaseDocument.givenName,
      familyName: constituentContactFirebaseDocument.familyName,
      fullName: constituentContactFirebaseDocument.fullName,
      initials: constituentContactFirebaseDocument.initials,
      email: constituentContactFirebaseDocument.email,
    };
    res.status(200).json(responseBody);
  } catch (error) {
    res.status(500);
  }
}
