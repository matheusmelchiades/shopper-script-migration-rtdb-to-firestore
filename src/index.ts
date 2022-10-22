import "./services/firebase";

import { Migrator } from "./migrators/migrator.abstract";
import migrators from "./migrators";

(async () => {
  const executers = Object.entries(migrators).map(
    ([name, migrator]: [string, Migrator]): Promise<void> => {
      return new Promise((resolve, reject) => {
        console.log("\n# EXECUTING MIGRATOR: ", name);

        migrator
          .run()
          .then(() => {
            console.log("# MIGRATOR COMPLETED: ", name);
            return resolve();
          })
          .catch((error) => {
            console.log("# MIGRATOR FAILED: ", name);
            console.log();
            console.log(error);
            return resolve();
          });
      });
    }
  );

  await Promise.all(executers);

  console.log("\n# ALL MIGRATORS COMPLETED");
  process.exit(0);
})();
