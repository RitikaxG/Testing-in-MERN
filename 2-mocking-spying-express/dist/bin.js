import { app } from "./index.js";
// Since, we dont want the app to actually start when test are running.
// We move the lgic to listen on a port in separate file `bin.ts`
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
//# sourceMappingURL=bin.js.map