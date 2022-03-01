import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../lib/utilities';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import Cookies from 'js-cookie';
import styles from '../styles/cms.module.css';
import styles2 from '../styles/cms2.module.css';

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
        //console.log(postData);
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
  const [ editMode, setEditMode ] = useState(false);
  const [ authorAcc, setAuthorAcc ] = useState({});

  useEffect(() => {
    setAuthorAcc(JSON.parse(Cookies.get("loginCredentials")).authorAcc);
  }, []);

  function saveProfileHandler() {
    axios.post('http://localhost:3000/api/dbQuery', { type: 'setAccountData', authorAcc: authorAcc })
    .then(response => {
      if (response.data.data) {
        const cookies = JSON.parse(Cookies.get("loginCredentials"));
        cookies.authorAcc = response.data.data;
        Cookies.set("loginCredentials", JSON.stringify(cookies));
      }
    })
  }

  function editProfileHandler(event) {
    const textInput = document.getElementById('profile-form').getElementsByTagName('input');
    if (!editMode) {
      event.target.innerHTML = "save";
      textInput[0].readOnly = false;
      textInput[1].readOnly = false;
      textInput[2].readOnly = false;
      textInput[3].readOnly = false;
      setEditMode(true);
    } else {
      let newAuthorAcc = authorAcc;
      newAuthorAcc.user = textInput[2].value;
      newAuthorAcc.email = textInput[1].value;
      newAuthorAcc.pass = (textInput[3].value == '') ? newAuthorAcc.pass : textInput[3].value;
      newAuthorAcc.name = textInput[0].value;
      event.target.innerHTML = "edit";
      textInput[0].readOnly = true;
      textInput[1].readOnly = true;
      textInput[2].readOnly = true;
      textInput[3].readOnly = true;
      setEditMode(false);
      setAuthorAcc(newAuthorAcc);
      saveProfileHandler();
    }
  }
  return (
    <div className={styles2.content}>
      <div className={styles2.container}>
        <div className={styles2.card}>
          <div className={styles2.info}> <span>Account Details</span> <button id="savebutton" onClick={(event) => editProfileHandler(event)}>edit</button> </div>
          <div id="profile-form" className={styles2.forms}>
            <div className={styles2.inputs}> <span><i className="fa-solid fa-person"></i> Full Name</span> <input type="text" readOnly defaultValue={authorAcc.name} /> </div>
            <div className={styles2.inputs}> <span><i className="fa-solid fa-envelope"></i> Email</span> <input type="text" readOnly defaultValue={authorAcc.email} /> </div>
            <div className={styles2.inputs}> <span><i className="fa-solid fa-address-card"></i> Username</span> <input type="text" readOnly defaultValue={authorAcc.user} /> </div>
            <div className={styles2.inputs}> <span><i className="fa-solid fa-calendar"></i> New Password</span> <input type="password" readOnly defaultValue="" /> </div>
          </div>
        </div>
      </div>
      <div className={styles2.edit_pp}>
        <div className={styles2.pp_text}>
          <i className="fa-solid fa-image-portrait"></i> Profile Picture
        </div>
        <hr /><br />
        <img src="https://i.imgur.com/V4RclNb.png" className={styles2.pp_cms} alt="Profile Picture" />
        <br /><br />
        <div className={styles2.upload_button}>
          <label className={styles2.custom_file_upload}>
            <input className={styles2.fileInput} type="file"/>
            <i className="fa-solid fa-upload"></i> Upload Image
          </label> 
        </div>
      </div>
    </div>
  );
}

export function Settings() {

}