import { getAllPostsData, fetchPostData } from "../../lib/posts";

export default async function handler(req, res) {
  const { type } = req.body;
  let data = {};
  if (type === 'getAllPostsData') {
    data = await getAllPostsData();
  } else if (type === 'fetchPostData') {
    const { postId } = req.body;
    data = await fetchPostData(postId);
  }

  await res.status(200).json({ data: data });
}