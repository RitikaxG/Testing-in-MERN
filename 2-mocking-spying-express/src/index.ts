import express from "express";
import { z } from "zod";
import { prismaClient } from "./db.js";

export const app = express();
app.use(express.json());

const inputSum = z.object({
    a:z.number(),
    b:z.number()
})


app.post("/sum",async (req,res) => {
    const parsedResponse = inputSum.safeParse(req.body);

    if(!parsedResponse.success){
        // Early return
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const { a,b } = parsedResponse.data;
    const ans = a + b;

    const dbResponse = await prismaClient.sum.create({
        data:{
            a,
            b,
            sum : ans
        }
    })

    console.log(dbResponse);

    res.status(200).json({
        message : "Success",
        sum : ans,
        id: dbResponse.id // This will return runtime error
    })

})

app.get("/sum",async (req,res) => {
    const parsedResponse = inputSum.safeParse({
        a:Number(req.headers["a"]),
        b:Number(req.headers["b"])
    })

    if(!parsedResponse.success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const sum = parsedResponse.data.a + parsedResponse.data.b;

    await prismaClient.sum.create({
        data : {
            a : parsedResponse.data.a,
            b : parsedResponse.data.b,
            sum
        }
    })

    return res.status(200).json({
        message : "Success",
        sum
    })
})