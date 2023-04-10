import { hash } from "bcrypt";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({ message: "All conditions are mandatory!" });
    }

    const existUser = await prisma.user.findUnique({ where: { email } });

    if (existUser) {
      return res.status(402).json({ message: "E-mail already exists!" });
    }

    const hashedPass = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });

    return res.status(200).json({ message: "Account added successfully!" });
  }
}
