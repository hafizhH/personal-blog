import mongoose from 'mongoose';
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
  } else if (type === 'setAccountData') {
    const { authorAcc } = req.body;
    //console.log(authorAcc);
    await dbConnect();
    data = await authors.findOneAndUpdate({ _id: mongoose.Types.ObjectId(authorAcc._id ) }, {$set: { user: authorAcc.user, email: authorAcc.email, name: authorAcc.name } }, {new: true}).exec();
    console.log('data: ' + data);
  }
  await res.status(200).json({ data: data });
}