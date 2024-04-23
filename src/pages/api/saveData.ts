import { INote } from "@/utils/types";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: { [key: number]: INote } = req.body;
  await fs.writeFile(process.cwd() + "/public/data.txt", JSON.stringify(data));
  res.status(200).json({ message: "success" });
};

export default handler;
