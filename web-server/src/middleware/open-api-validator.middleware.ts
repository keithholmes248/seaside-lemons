import * as OpenApiValidator from "express-openapi-validator";
import { Express } from "express";

// import {} from "../../../api-spec/seaside-lemon-schema.json"

const PathToOpenApiSpec = "../../api-spec/seaside-lemon-schema.json";

export function registerOpenApiValidationMiddleware(app: Express): void {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: PathToOpenApiSpec,
      validateRequests: true, // (default)
      validateResponses: true, // false by default
    })
  );
}
