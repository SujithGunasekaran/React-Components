import React, { Fragment } from 'react';
import CommentItem from './CommentItem';

const CommentList = (props) => {

    // Props
    const { comments, addComment } = props;

    const constructCommentList = (commentData) => {
        if (commentData.replies.length > 0) {
            let commentList = [];
            commentList = commentData.replies.map((commentInfo) => {
                return constructCommentList(commentInfo);
            });
            return (
                <div key={commentData.id}>
                    <CommentItem
                        commentData={commentData}
                        addComment={addComment}
                    >
                        {commentList}
                    </CommentItem>
                </div>

            )
        }
        else {
            return (
                <div key={commentData.id}>
                    <CommentItem
                        commentData={commentData}
                        addComment={addComment}
                    />
                </div>
            )
        }
    }

    return (
        <Fragment>
            {
                comments.length > 0 &&
                comments.map((commentInfo) => {
                    return constructCommentList(commentInfo);
                })
            }
        </Fragment>
    )

}


export default CommentList;
