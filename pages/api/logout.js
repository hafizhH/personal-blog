import { logout } from "../../lib/login";
import { serialize } from 'cookie';

export default async function logoutHandler(req, res) {
  const loginCredentials = JSON.parse(req.cookies['loginCredentials']);
  let logoutResult;
  console.log(loginCredentials.cookie)
  if (loginCredentials.cookie) {
    logoutResult = await logout(loginCredentials.cookie);
  }
  res.status(200).json(logoutResult);
}