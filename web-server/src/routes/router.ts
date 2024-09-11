import { Express, Request, RequestHandler, Response } from "express";
import { CreateConstituentContactApiRoute } from "./create-constituent-contact";
import { SearchConstituentContactsApiRoute } from "./search-constituent-contacts";
import { authenticateFirebaseUserHandler } from "../middleware/firebase-auth.middleware";
import { ConfirmUniqueEmailAddressForContactApiRoute } from "./confirm-unique-email-address-for-contact";
import { CreateConstituentContactCsvApiRoute } from "./generate-contacts-csv";

function setupExpressRoutes(app: Express): void {
  app
    .all("*", authenticateFirebaseUserHandler)
    .post("/contacts", CreateConstituentContactApiRoute as unknown as RequestHandler)
    .get("/contacts", SearchConstituentContactsApiRoute as unknown as RequestHandler)
    .get("/contacts/confirm-unique-email", ConfirmUniqueEmailAddressForContactApiRoute as unknown as RequestHandler)
    .get("/contacts/csv-for-contacts", CreateConstituentContactCsvApiRoute as unknown as RequestHandler);
}

export default setupExpressRoutes;
