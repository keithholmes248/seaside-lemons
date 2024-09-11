import { Express } from "express";

const initExpressServer = (app: Express) => {
  const APP_PORT = 4000;

  app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
  });
};

export default initExpressServer;
