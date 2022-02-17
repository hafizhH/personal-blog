import styles from '../styles/cms.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../lib/utilities';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { nextWednesday } from 'date-fns';

export function Dashboard() {
  const [ postList, setPostList ] = useState([]);
  
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/dbQuery',
      data: {}
      //headers: { 'Content-Type': 'multipart/form-data', 'X-CSRFToken': sessionStorage.getItem('csrftoken') },
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.data.data);
        setPostList(response.data.data);
        console.log(postList);
      }
    }).catch((e) => {
      console.log(e.message);
    });
  }, []);
  
  return (
    <div className={styles.contentContainer}>
      <div className={styles.leftContent}>
        <ul className={styles.postList}>
          {postList.map((postData, index) => {
            return (
              <li className={styles.postListItem} key={index}>
                <div className={styles.thumbContainer}>
                  <img src={postData.thumbImg} />
                </div>
                <div className={styles.postDetails}>
                  <div>ID : {postData.postId}</div>
                  <div>Title : {postData.title}</div>
                  <div>Post date : {formatDate(postData.date)}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.rightContent}>
        
      </div>
    </div>
  );
}

export function PostList({ setPage }) {
  const [ postList, setPostList ] = useState([]);
  
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/dbQuery',
      data: { type: 'getAllPostsData' }
      //headers: { 'Content-Type': 'multipart/form-data', 'X-CSRFToken': sessionStorage.getItem('csrftoken') },
    }).then((response) => {
      if (response.status === 200) {
        setPostList(response.data.data);
      }
    }).catch((e) => {
      console.log(e.message);
    });
  }, []);

  return (
    <div className={styles.contentContainer}>
      <div className={styles.leftContent}>
        <ul className={styles.postList}>
          {postList.map((postData, index) => {
            return (
              <li className={styles.postListItem} key={index} onClick={() => setPage('PostEditor%%' + postData.postId)}>
                <div className={styles.thumbContainer}>
                  <img src={postData.thumbImg} />
                </div>
                <div className={styles.postDetails}>
                  <div>ID : {postData.postId}</div>
                  <div>Title : {postData.title}</div>
                  <div>Post date : {formatDate(postData.date)}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.rightContent}>
        
      </div>
    </div>
  );
}

export function PostEditor({ postId }) {
  const [ postData, setPostData ] = useState({});
  
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/dbQuery',
      data: { type: 'fetchPostData', postId: postId }
      //headers: { 'Content-Type': 'multipart/form-data', 'X-CSRFToken': sessionStorage.getItem('csrftoken') },
    }).then((response) => {
      if (response.status === 200) {
        setPostData(response.data.data);
        console.log(postData);
      }
    }).catch((e) => {
      console.log(e.message);
    });
  }, []);

  function autoGrow(element) {
    element.style.height = (element.scrollHeight)+"px";
  }

  async function mdToHtml(mdContent) {
    const matterResult = matter(mdContent);
    const processedPostContent = await remark().use(html).process(matterResult.content);
    const postHtmlContent = processedPostContent.toString();
    return postHtmlContent;
  }

  async function handleInputChange(element) {
    let newPostData = postData;
    newPostData.htmlContent = await mdToHtml(element.value);
    setPostData(newPostData);
  }

  function getHTMLContent() {
    const ret = postData.htmlContent;
    return { __html: ret };
  }
  
  return (
    <div className={styles.contentContainer}>
      <div className={styles.postMetaContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.thumbContainer2}>
            <img src={postData.thumbImg} />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div>
            <label>Title : </label>
            <input type="text" name="title" placeholder="Post Title..." defaultValue={postData.title}/>
          </div>
          <div>
            <label>Date : </label>
            <input type="date" name="date" defaultValue={postData.date} />
          </div>
          <div>
            <label>Post ID : </label>
            <input type="text" name="postId" defaultValue={postData.id} />
          </div>
        </div>
      </div>
      <div className={styles.postEditorContainer}>
        <div className={styles.toolboxContainer}>
          
        </div>
        <div className={styles.editorContainer}>
          <textarea id="mdContent" defaultValue={postData.mdContent} onFocus={() => autoGrow(document.getElementById('mdContent'))} onInput={(event) => {autoGrow(document.getElementById('mdContent')); handleInputChange(event.target)}}/>
          <div key={postData.id} className={styles.previewContent} dangerouslySetInnerHTML={getHTMLContent()} />
        </div>
      </div>
    </div>
  );
}

export function ManageProfile() {

}

export function Settings() {

}