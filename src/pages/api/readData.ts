import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const info = JSON.parse(await fs.readFile(process.cwd() + "/public/data.txt", 'utf8'));
  console.log(info)
  res.status(200).json({ data: info });
};

export default handler;
