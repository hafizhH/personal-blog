import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import dbConnect from './database/dbConnect';

const posts = require('./database/models/posts')();
//All methods related to post data fetching/processing

export async function getAllPostIds() {
  await dbConnect();
  const allPosts = await posts.find({}).exec();
  return allPosts.map(post => {
    return {
      params: {
        postId: post.postId
      }
    }
  })
}

export async function getAllPostsData() {
  await dbConnect();
  let allPosts = await posts.find({}).exec();
  const allPostsData = await Promise.all(allPosts.map(async (post) => {
    const { postId, markdownContent } = post;
    const matterResult = matter(markdownContent);
    const processedPostContent = await remark().use(html).process(matterResult.data.previewContent);
    const processedPreviewContent = processedPostContent.toString();
    return {
      postId,
      processedPreviewContent,
      ...matterResult.data
    }
  }));
  return allPostsData;
}

export async function fetchPostData(postId) {
  await dbConnect();
  let fileContent = await posts.findOne({ postId: postId }).exec();
  const matterResult = matter(fileContent.markdownContent);
  const processedPostContent = await remark().use(html).process(matterResult.content);
  const postHtmlContent = processedPostContent.toString();
  return {
    id: postId,
    htmlContent: postHtmlContent,
    ...matterResult.data
  }
}