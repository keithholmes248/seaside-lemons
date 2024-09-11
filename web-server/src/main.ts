import express from "express";
import initExpressServer from "./init-server";
import setupExpressRoutes from "./routes/router";
import setupExpress from "./security";
import { initFirebase } from "./init-firebase";
import { registerOpenApiValidationMiddleware } from "./middleware/open-api-validator.middleware";
import { initializeFirestore } from "firebase-admin/firestore";

const app = express();

initFirebase();

initExpressServer(app);
setupExpress(app, express);
setupExpressRoutes(app);

registerOpenApiValidationMiddleware(app);
