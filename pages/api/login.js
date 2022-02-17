import { autoLogin, login } from "../../lib/login";
import { serialize } from 'cookie';

export default async function loginHandler(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    const loginCredentials = JSON.parse(req.cookies['loginCredentials']);
    const data = await autoLogin(loginCredentials.cookie);
    res.status(200).json(data);
  } else {
    const data = await login(username, password);
    if (data) {
      res.setHeader('Set-Cookie', serialize('loginCredentials', JSON.stringify(data.authorAcc), { maxAge: 1800, path: '/' })).status(200).status(200).json(data);
    } else {
      res.status(200).json(data);
    }
  }
}