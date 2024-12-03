import "reflect-metadata";
import { app } from "./Infrastructure/Http/server";
import { appConfig } from "./config/config";

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
