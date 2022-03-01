import cookie from 'js-cookie';
import dbConnect from '../../lib/database/dbConnect';
import { getAllPostsData, fetchPostData } from "../../lib/posts";
const authors = require('../../lib/database/models/authors')();

export default async function handler(req, res) {
  const { type } = req.body;
  let data = {};
  if (type === 'getAllPostsData') {
    data = await getAllPostsData();
  } else if (type === 'fetchPostData') {
    const { postId } = req.body;
    data = await fetchPostData(postId);
  } else if (type === 'fetchAccountData') {
    const { user } = cookie.get('loginCredentials');
    await dbConnect();
    data = await authors.findOne({ user: user}).exec();
  }

  await res.status(200).json({ data: data });
}