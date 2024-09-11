import { Express, Request, Response, NextFunction } from "express";
import FirebaseAdmin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export type ExpressRequestWithAuthToken<RequestBody = any, QueryParams = any> = Request<any, any, RequestBody, QueryParams> & {
  firebaseAuthToken: DecodedIdToken;
};

export async function authenticateFirebaseUserHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const rawIdToken = req.headers.authorization;
  const strippedHeader = rawIdToken?.replace("Bearer ", "");

  if (!strippedHeader) {
    res.status(401);
    next(new Error("No Token Provided"));
  } else {
    try {
      const decodedToken = await FirebaseAdmin.auth().verifyIdToken(strippedHeader);
      (req as ExpressRequestWithAuthToken).firebaseAuthToken = decodedToken;
      next();
    } catch (error) {
      console.log("Error verifying ID token:", error);
      res.status(401);
      next(error);
    }
  }
}
