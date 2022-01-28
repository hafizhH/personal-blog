import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
//All methods related to post data fetching/processing

const postsDirPath = path.join(process.cwd(),'posts');

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirPath);
  return fileNames.map(fileName => {
    return {
      params: {
        postId: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getAllPostsData() {
  const postFilenames = fs.readdirSync(postsDirPath);
  const allPostsData = await Promise.all(postFilenames.map(async (postFilename) => {
    const postId = postFilename.replace(/\.md$/, '');
    const postDataPath = path.join(postsDirPath, postId+'.md');
    let fileContent;
    if (fs.existsSync(postDataPath)) {
      fileContent = fs.readFileSync(postDataPath, 'utf-8');
    } else {
      return null;
    }
    const matterResult = matter(fileContent);
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
  const postDataPath = path.join(postsDirPath, postId+'.md');
  let fileContent;
  if (fs.existsSync(postDataPath)) {
    fileContent = fs.readFileSync(postDataPath, 'utf-8');
  } else {
    return null;
  }
  const matterResult = matter(fileContent);
  const processedPostContent = await remark().use(html).process(matterResult.content);
  const postHtmlContent = processedPostContent.toString();
  //console.log(postHtmlContent);
  return {
    id: postId,
    htmlContent: postHtmlContent,
    ...matterResult.data
  }
}