import React, { Fragment, useState, lazy, Suspense } from 'react';
import { DownArrowIcon, UpArrowIcon } from '../../UI/Icon';

const CommentBox = lazy(() => import('./CommentBox'));

const CommentItem = (props) => {

    // Props
    const { commentData, addComment } = props;

    // State
    const [replyOpen, setReplyOpen] = useState(false);
    const [hideComment, setHideComment] = useState(false);

    return (
        <Fragment>
            <div className='comment_item_container'>
                <div className='left'>
                    {
                        !hideComment ?
                            <div onClick={() => setHideComment(true)}>
                                <UpArrowIcon cssClass={'comment_item_icon'} />
                            </div>
                            :
                            <div onClick={() => setHideComment(false)}>
                                <DownArrowIcon cssClass={'comment_item_icon'} />
                            </div>
                    }
                </div>
                <div className='right'>
                    <div className='comment_item_header'>
                        <div className='comment_item_header_name'>{commentData.name}</div>
                        <div className='comment_item_header_date'>{commentData.date}</div>
                    </div>
                    <div className={`comment_item_body ${hideComment && 'hide'}`}>
                        {commentData.data}
                    </div>
                    <div className={`comment_item_footer ${hideComment && 'hide'}`}>
                        <div onClick={() => setReplyOpen(prevOpen => !prevOpen)} className='comment_item_footer_btn'>Reply</div>
                    </div>
                    {
                        replyOpen &&
                        <Suspense fallback={<div>Loading...</div>}>
                            <div className='comment_item_box'>
                                <CommentBox
                                    parentInfo={commentData}
                                    addComment={addComment}
                                    height={80}
                                    callback={() => setReplyOpen(false)}
                                />
                            </div>
                        </Suspense>
                    }
                    <div className={`${hideComment && 'child_hide'}`}>
                        {props.children}
                    </div>
                </div>

            </div>
        </Fragment>
    )

}


export default CommentItem;
