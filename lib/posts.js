import matter from 'gray-matter';
import mongoose from 'mongoose';
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
    const { postId, markdownContent, title, date, author, thumbImg, previewContent } = post;
    //const matterResult = matter(markdownContent);
    const processedPostContent = await remark().use(html).process(previewContent);
    const processedPreviewContent = processedPostContent.toString();
    //const processedPreviewContent = markdown.toHTML(previewContent);
    return { postId, processedPreviewContent, title, date, author, thumbImg, previewContent }
  }));
  return allPostsData;
}

export async function getLatestPostsData() {
  await dbConnect();
  let allPosts = await posts.find({}, 'postId title date author thumbImg previewContent markdownContent').exec();
  allPosts.sort((post1, post2) => {
    if (post1.date > post2.date) return -1;
    if (post1.date < post2.date) return 1;
    return 0;
  });
  const allPostsData = await Promise.all(allPosts.slice(0, 3).map(async (post) => {
    const { postId, markdownContent, title, date, author, thumbImg, previewContent } = post;
    //const matterResult = matter(markdownContent);
    const processedPostContent = await remark().use(html).process(previewContent);
    const processedPreviewContent = processedPostContent.toString();
    //console.log("Post : " + post);
    //const processedPreviewContent = markdown.toHTML(previewContent);
    return { postId, processedPreviewContent, title, date, author, thumbImg, previewContent }
  }));
  return allPostsData;
}

export async function fetchPostData(postId) {
  await dbConnect();
  let post = await posts.findOne({ postId: postId }, '_id postId title date author thumbImg previewContent markdownContent comments').exec();
  const { _id, markdownContent, title, date, author, thumbImg, previewContent, comments } = post;
  //console.log(post);
  //const matterResult = matter(markdownContent);
  const processedPostContent = await remark().use(html).process(markdownContent);
  const postHtmlContent = processedPostContent.toString();
  //const postHtmlContent = markdown.toHTML(markdownContent);
  return {
    postId,
    htmlContent: postHtmlContent,
    markdownContent: markdownContent,
    comments: JSON.stringify(comments),
    _id: _id.toString(), title, date, author, thumbImg, previewContent
  }
}

export async function searchPost(keywords) {
  await dbConnect();
  let keywordsArr = keywords.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"").replace(/\s{2,}/g," ").split(' ');
  const exp = keywordsArr.map((keyword) => '('+keyword+')').toString().replace(',', '|');
  const regex = RegExp(exp, 'gi');
  console.log(exp);
  console.log(regex);
  let searchResult = await posts.find({ markdownContent: regex }).exec();
  const searchResultData = await Promise.all(searchResult.map(async (post) => {
    const { postId, markdownContent, title, date, author, thumbImg, previewContent } = post;
    const processedPostContent = await remark().use(html).process(previewContent);
    const processedPreviewContent = processedPostContent.toString();
    return { postId, processedPreviewContent, title, date, author, thumbImg, previewContent }
  }));
  return searchResultData;
}

export async function addPostData(postData) {
  await dbConnect();
  let addResult;
  const checkPostId = await posts.findOne({ postId: postData.postId }).exec();
  if (checkPostId) return false;
  posts.create(postData, function (err, post) {
    if (err) {
      console.log(err.message);
      return false;
    }
  })
  return postData;
}

export async function deletePostData(_id) {
  await posts.findByIdAndRemove(mongoose.Types.ObjectId(_id), function(err, doc) {
    if (err) {
      console.log(err.message);
      return false;
    }
    return true
  });
}

export async function updatePostData(postData) {
  const { postId, title, date, thumbImg, previewContent, markdownContent } = postData;
  await dbConnect();
  const updateResult = await posts.findByIdAndUpdate(mongoose.Types.ObjectId(postData._id), { $set: { postId: postId, title: title, date: date, thumbImg: thumbImg, previewContent: previewContent, markdownContent: markdownContent } }, { new: true }).exec();
  return updateResult;
}

export async function updateComments(postId, newComments) {
  await dbConnect();
  const postData = await posts.findOneAndUpdate({ postId: postId }, { $set: { comments: newComments } }, { new: true }).exec();
  return postData.comments;
}