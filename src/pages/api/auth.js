import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

const JWT_SECRET = "my_secret_key_is_always_true";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "Email and password are required!" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(402).json({ message: "Incorrect email or password!" });
    }

    const passUser = await compare(password, user.password);

    if (!passUser) {
      return res.status(403).json({ message: "Incorrect email or password!" });
    }

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ token });
  }
};

export default handler;
