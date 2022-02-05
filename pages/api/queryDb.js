import posts from '../../lib/database/models/posts.js';
import { dbConnect } from "../../lib/database/dbConnect";
import { fetchPostData, getAllPostIds } from "../../lib/posts";

export async function handler(req, res) {
  const { operation } = req.body;
  await dbConnect();
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'HTTP method not allowed'});
  }
  if (operation === 'C') {
    await posts.create(req.body.query);
  } else if (operation === 'R') {
    await posts.find(req.body.query);
  } else if (operation === 'U') {
    
  } else if (operation === 'D') {

  }

}