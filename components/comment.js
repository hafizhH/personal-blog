import { formatDate, toLocalTZISOString } from "../lib/utilities";
import { useEffect, useState } from "react";
import { Children } from "react/cjs/react.production.min";
import axios from "axios";
import Cookies from "js-cookie";

export default function Comment({ commentsProp, postData }) {
  const [comments, setComments] = useState(commentsProp);

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <br/>
      <div>
        <CommentList comments={comments} setComments={setComments} postId={postData.id}/>
      </div>
    </div>
  );
}

function CommentList({ comments, setComments, postId }) {
  const [enabled, setEnabled] = useState({ visibility: false, replyTo: '', targetIndex: [] });
  
  function handlePostComment(replyFrom, replyTo, replyText, targetIndex) {
    let newComments = comments;
    let date = toLocalTZISOString(new Date()).split('T')[0];
    console.log(postId);
    if (targetIndex.length == 0)
      newComments.push({ from: replyFrom, date: date, text: replyText, reply: []});
    else
      newComments[targetIndex[0]].reply.push({ from: replyFrom, to: replyTo, date: date, text: replyText });
    axios.post('/api/dbQuery', { type: 'updateCommentData', postId: postId, comments: newComments })
    .then(response => {
      setComments(newComments);
    })
  }

  return (
    <>
      <a className="comment-link-m" onClick={() => { setEnabled({ visibility: true, replyTo: 'Post', targetIndex: []}) }}>Leave a comment</a>
      <br></br>
      <CommentInput enabled={enabled} setEnabled={setEnabled} handlePostComment={handlePostComment}/>
      <br></br>
      <div className="comment-list">
        {comments.map((comment, index) => {
          return (
            <div key={[index]}>
              <div className="comment-item">
                <div className="d-flex flex-row user-info">
                  <img className="rounded-circle" src="https://i.imgur.com/V4RclNb.png" width="40"/>
                  <div className="d-flex flex-column justify-content-start ml-2">
                    <span className="d-block font-weight-bold name">&nbsp;&nbsp;{comment.from}</span><span className="date text-black-50">
                    &nbsp;&nbsp;&nbsp;&nbsp;Posted on {formatDate(comment.date)}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="comment-text">{comment.text}</p>
                </div>
                <a className="comment-link-s" onClick={() => { setEnabled({ visibility: true, replyTo: comment.from, targetIndex: [index] }) }}>Reply</a>
              </div>
              {/*<CommentInput enabled={enabled} setEnabled={setEnabled} />*/}
              <br></br>
              {comment.reply.map((reply, index2) => {
                return (
                  <div className="reply-item" key={[index, index2]}>
                    <div className="d-flex flex-row user-info">
                      <img className="rounded-circle" src="https://i.imgur.com/V4RclNb.png" width="40"/>
                      <div className="d-flex flex-column justify-content-start ml-2">
                        <span className="d-block font-weight-bold name">&nbsp;&nbsp;{reply.from}</span><span className="date text-black-50">
                        &nbsp;&nbsp;&nbsp;&nbsp;Posted on {formatDate(reply.date)}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="comment-text"><span className="reply-tag">{'@' + reply.to + ' '}</span>{reply.text}</p>
                    </div>
                    <a className="comment-link-s" onClick={() => { setEnabled({ visibility: true, replyTo: reply.from, targetIndex: [index, index2] }) }}>Reply</a>
                  </div>
                );  
              })}
              <br></br>
            </div>
          );
        })}
      </div>
    </>
  );
}

function CommentInput({ enabled, setEnabled, handlePostComment }) {
  const [replyFrom, setReplyFrom] = useState((Cookies.get("loginCredentials")) ? JSON.parse(Cookies.get("loginCredentials")).authorAcc.name : 'Anonymous');
  const [replyTo, setReplyTo] = useState('');
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    setReplyTo(enabled.replyTo);
  }, [enabled])

  return (
    <div className={(enabled.visibility) ? "comment-input" : "hidden"}>
      <div> {/*className="d-flex flex-row align-items-start">*/}
        <label>Display Name : &nbsp;
          <input type="text" defaultValue={replyFrom} placeholder="Your name" onChange={(event) => setReplyFrom(event.target.value)} />
        </label><br/>
        <label>Reply To : &nbsp;
          <input type="text" readOnly value={replyTo} placeholder="Reply to..." onChange={(event) => setReplyTo(event.target.value)} />
        </label><br/>
        <textarea id="reply-text" className="form-control ml-1 shadow-none textarea" defaultValue={replyText} placeholder="Add a comment..." onChange={(event) => setReplyText(event.target.value)}></textarea>
      </div>
      <br></br>
      <div className="mt-2 text-right"><button className="btn btn-primary btn-sm shadow-none" type="button" onClick={() => { handlePostComment(replyFrom, replyTo, replyText, enabled.targetIndex); setEnabled({ visibility: false, replyTo: '', targetIndex: [] }) }}>Post</button>
        &nbsp;&nbsp;
        <button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button" onClick={() => { setEnabled({ visibility: false, replyTo: '', targetIndex: [] }) }}>Cancel</button>
      </div>
    </div>
  );
}