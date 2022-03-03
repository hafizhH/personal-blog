import mongoose from 'mongoose';
import dbConnect from '../../lib/database/dbConnect';
import { getAllPostsData, fetchPostData, updateComments, updatePostData, addPostData, deletePostData } from "../../lib/posts";

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
    await dbConnect();
    data = await authors.findOneAndUpdate({ _id: mongoose.Types.ObjectId(authorAcc._id ) }, {$set: { user: authorAcc.user, email: authorAcc.email, name: authorAcc.name } }, {new: true}).exec();
    console.log('data: ' + data);
  } else if (type === 'updateCommentData') {
    const { postId, comments } = req.body;
    await dbConnect();
    data = await updateComments(postId, comments);
  } else if (type === 'updatePostData') {
    const { postData } = req.body;
    if (postData._id == '') {
      delete postData._id;
      data = await addPostData(postData);
    } else
      data = await updatePostData(postData);
  } else if (type === 'deletePostData') {
      const { _id } = req.body;
      data = await deletePostData(_id);
  }
  await res.status(200).json({ data: data });
}