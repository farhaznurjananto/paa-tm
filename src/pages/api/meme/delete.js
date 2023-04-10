import { prisma } from "../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.body;

    const deleteMeme = await prisma.meme.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: "Meme has been deleted!" });
  } else {
    return res.status(404).json({ message: "Your request is not allowed!" });
  }
};

export default handler;
