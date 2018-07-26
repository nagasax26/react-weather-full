import React from 'react'

const CommentBox = ({ username, comment, weatherId, commentId, removeComment }) => (
    <div className="comment">
        <i>{username} - {comment}</i>
        <div className="commnet__icon">
            <i onClick={() => {
                removeComment(weatherId, commentId);
            }} className="fa fa-trash"></i>
        </div>
    </div>
)

const CommentListBox = ({ weatherId, comments, removeComment }) =>
    (
        <div>
            {comments.map((comment, index) =>
                <CommentBox key={comment._id}
                    removeComment={removeComment}
                    weatherId={weatherId}
                    commentId={comment._id}
                    username={comment.username}
                    comment={comment.comment} />)}

        </div>
    );

export default CommentListBox;

