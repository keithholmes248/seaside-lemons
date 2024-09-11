import cors from "cors";
import { Express } from "express";

const setupExpressSecurity = (app: Express, express: any) =>
  app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }));

export default setupExpressSecurity;
