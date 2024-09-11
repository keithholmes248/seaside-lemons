import { Response } from "express";
import { components, operations } from "../../../api-spec/seaside-lemon-schema";
import { ExpressRequestWithAuthToken } from "../middleware/firebase-auth.middleware";
import { ConstituentContactFirebaseDocument, getConstituentContactCollectionRef } from "../database/constituent-contacts.firestore-collection";
import { AggregateQuery } from "firebase-admin/firestore";

type SearchConstituentContactsQueryParams = operations["SearchConstituentContacts"]["parameters"]["query"];
type SearchConstituentContactsResponseBody = operations["SearchConstituentContacts"]["responses"]["2XX"]["content"]["application/json"];
type ConstituentContact = components["schemas"]["ConstituentContact"];

export async function SearchConstituentContactsApiRoute(
  req: ExpressRequestWithAuthToken<never, SearchConstituentContactsQueryParams>,
  res: Response<SearchConstituentContactsResponseBody>
): Promise<void> {
  const ConstituentContactCollectionRef = getConstituentContactCollectionRef();
  const userId = req?.firebaseAuthToken?.uid;
  const queryParams = req.query;

  const page = Number(queryParams?.page) || 0;
  const pageSize = Number(queryParams?.pagesize) || 10;
  const startAt = page * pageSize;

  let documentQuery = ConstituentContactCollectionRef.where("firebaseUserId", "==", userId).offset(startAt).limit(pageSize);

  const filter = queryParams?.filter;
  if (filter) {
    documentQuery = documentQuery.where("fullName", ">=", filter).where("fullName", "<=", filter + "\uf8ff");
  }

  let countQuery:
    | AggregateQuery<
        {
          count: FirebaseFirestore.AggregateField<number>;
        },
        ConstituentContactFirebaseDocument,
        FirebaseFirestore.DocumentData
      >
    | undefined = undefined;

  const hasCount = queryParams?.count !== undefined;
  const countBoolean = (queryParams?.count as unknown as string) === "true";
  const count = hasCount ? countBoolean : true;
  if (count) {
    if (filter) {
      countQuery = ConstituentContactCollectionRef.where("fullName", ">=", filter)
        .where("fullName", "<=", filter + "\uf8ff")
        .where("firebaseUserId", "==", userId)
        .count();
    } else {
      countQuery = ConstituentContactCollectionRef.where("firebaseUserId", "==", userId).count();
    }
  }

  const orderByField = queryParams?.orderbyfield;
  const orderByDirection = queryParams?.orderbydirection;
  if (orderByField) {
    console.log("orderBy: ", orderByField, orderByDirection);
    documentQuery = documentQuery.orderBy(orderByField, orderByDirection);
  }

  try {
    const querySnapshot = await documentQuery.get();
    const countSnapshot = count ? await countQuery?.get() : undefined;

    const responseBody: SearchConstituentContactsResponseBody = {
      count: countSnapshot?.data()?.count,
      results: [],
    };

    querySnapshot.forEach((document) => {
      const documentData = document.data();
      const apiData: ConstituentContact = {
        givenName: documentData.givenName,
        familyName: documentData.familyName,
        fullName: documentData.fullName,
        initials: documentData.initials,
        email: documentData.email,
      };
      responseBody?.results?.push(apiData);
    });
    res.status(200).json(responseBody);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
