import { addAuthorAccount } from "../../lib/login";

export default async function registerHandler(req, res) {
  const { name, email, username, password } = req.body;
  const registerResult = await addAuthorAccount(email, username, password, name);
  res.status(200).json({ registerResult });
}