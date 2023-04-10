import { prisma } from "../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const allMeme = await prisma.meme.findMany();

    return res.status(200).json(allMeme);
  }
};

export default handler;
