import request from "supertest"; // starting server is offloaded to supertest lib
import { describe, it, expect, vi } from "vitest";
import { app } from "../index.js";
import { prismaClient } from "../__mocks__/db.js";

console.log(prismaClient.sum); // This will confirm that prismaClient is being mocked


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
        // prismaClient.sum.create returns a promise, 
        // we are mocking on returned promise 
        // we are telling that mocked fn `prismaClient.sum.create` should return an object with following keys and values
        prismaClient.sum.create.mockResolvedValue({
            id: String(1),
            a:1,
            b:2,
            sum:3
        })

        // prismaClient.sum : top level object
        // create : actual fn we want to spy on
        // spyOn : see what inputs was " prismaClient.sum.create " called with

        // This will allow us to expect on prismaClient.sum.create
        vi.spyOn(prismaClient.sum,"create");

        const res = await request(app).post("/sum").send({
            a:1,
            b:2
        })

        // If prismaClient.sum.create was not called with mockedValues this will throw Error
        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data : {
                a:1,
                b:2,
                sum:3
            }
            
        })

        expect(prismaClient.sum.create).toHaveBeenCalledTimes(1);

        expect(res.statusCode).toBe(200);
        expect(res.body.sum).toBe(3);
    })

    it("return status code 411 for incorrect inputs", async () => {
        const res = await request(app).post("/sum").send({});

        expect(res.statusCode).toBe(411);
    })
})

describe("GET /sum",() => {
    it("add 1 & 2 to expect 3",async () => {
        const res = await request(app).get("/sum").set({
            a:"1", // headers are passed as string
            b:"2"
        }).send();

        expect(res.statusCode).toBe(200)
        expect(res.body.sum).toBe(3);
    });

    it("return status code 411 for incorrect inputs",async () => {
        const res = await request(app).get("/sum").send();

         expect(res.statusCode).toBe(411);
     } )
 })