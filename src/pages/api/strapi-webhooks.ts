import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type ResponseData = {
  message: string;
};

const cors = Cors({
  methods: ["POST", "GET", "HEAD", "GET", "PUT"],
  origin: "*",
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    console.log(req.body);
    res.status(200).json({ message: "POST" });
  } else if (req.method === "PUT") {
    console.log(req.body);
    res.status(200).json({ message: "PUT" });
  } else if (req.method === "GET") {
    res.status(200).json({ message: "GET" });
  }
}
