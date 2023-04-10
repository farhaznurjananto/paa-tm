import { verify, sign } from "jsonwebtoken";

const JWT_SECRET = "my_secret_key_is_always_true";

export function authMiddleware(handler) {
  return async (req, res) => {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return res.status(401).json({ message: "Invalid authorization header!" });
    }

    const token = authorizationHeader.replace("Bearer ", "");

    try {
      const decoded = verify(token, JWT_SECRET);

      const now = Math.floor(Date.now() / 1000);

      const expiresAt = decoded.exp;

      if (expiresAt - now < 60 * 30) {
        const newToken = sign({ ...decoded, exp: now * 60 * 60 }, JWT_SECRET);
        res.setHeader("Authorization", `Bearer ${newToken}`);
      }

      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
}
