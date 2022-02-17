import { formatDate } from "../lib/utilities";
import { useState } from "react";
import { Children } from "react/cjs/react.production.min";

export default function Comment(comments) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <br/>
      <div>
        <a className="comment-link-m" onClick={() => { setVisibility(true) }}>Leave a comment</a>
        <CommentInput visible={visibility} setVisibility={setVisibility}/>
        <br></br><br></br>
        <CommentList comments={comments.comments} />
      </div>
    </div>
  );
}

function CommentList({ comments }) {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="comment-list">
      {comments.map((comment, index) => {
        return (
          <>
            <div className="comment-item" key={index}>
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
              <a className="comment-link-s" onClick={() => { setVisibility(true) }}>Reply</a>
            </div>
            <CommentInput visible={visibility} setVisibility={setVisibility} />
            <br></br>
            {comment.reply.map((reply, index2) => {
              return (
                <div className="reply-item" key={index2}>
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
                  <a className="comment-link-s" onClick={() => { setVisibility(true) }}>Reply</a>
                </div>
              );  
            })}
          </>
        );
      })}
    </div>
  );
}

function CommentInput({ visible, setVisibility }) {
  return (
    <div className={(visible) ? "comment-input" : "hidden"}>
      <div className="d-flex flex-row align-items-start">
        <textarea className="form-control ml-1 shadow-none textarea" placeholder="Add a comment..."></textarea>
      </div>
      <br></br>
      <div className="mt-2 text-right"><button className="btn btn-primary btn-sm shadow-none" type="button" onClick={() => {  }}>Post</button>
        &nbsp;&nbsp;
        <button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button" onClick={() => { setVisibility(false) }}>Cancel</button>
      </div>
    </div>
  );
}