import request from "supertest"; // starting server is offloaded to supertest lib
import { describe, it, expect, vi } from "vitest";
import { app } from "../index.js";
// vi.mock("../db",()=> ({
//     prismaClient : { // mock prismaClient that should be an object with key "sum"
//         // sum should be an object with key "create"
//         sum : {
//             create : vi.fn() // Empty fn 
//         }
//     }
// }))
// This will understand that it has to pick up mocked prismaClient from __mocks__/db.ts
vi.mock("../db");
describe("POST /sum", () => {
    it("add 1 & 2 to expect 3", async () => {
        const res = await request(app).post("/sum").send({
            a: 1,
            b: 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.sum).toBe(3);
    });
    it("return status code 411 for incorrect inputs", async () => {
        const res = await request(app).post("/sum").send({});
        expect(res.statusCode).toBe(411);
    });
});
describe("GET /sum", () => {
    it("add 1 & 2 to expect 3", async () => {
        const res = await request(app).get("/sum").set({
            a: "1", // headers are passed as string
            b: "2"
        }).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.sum).toBe(3);
    });
    it("return status code 411 for incorrect inputs", async () => {
        const res = await request(app).get("/sum").send();
        expect(res.statusCode).toBe(411);
    });
});
//# sourceMappingURL=sum.test.js.map