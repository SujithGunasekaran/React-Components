import React, { Fragment, Suspense, lazy, useState } from 'react';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));
const CommentBox = lazy(() => import('../../Components/Comments/CommentBox'));
const CommentList = lazy(() => import('../../Components/Comments/CommentList'));

const Comments = () => {

    // State
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);

    const insterNestedComments = (index, arr, comment, input, parentData) => {
        for (let i = index; i < arr.length; i++) {
            if (arr[i] === '') {
                comment[parentData.index].replies = [
                    ...comment[parentData.index].replies,
                    {
                        ...input,
                        index: comment[parentData.index].replies.length,
                        parent: `${parentData.parent}${parentData.index}-`
                    }
                ];
                return;
            }
            return insterNestedComments(i + 1, arr, comment[arr[i]].replies, input, parentData);
        }
    }

    const addComment = (input, parentData) => {
        if (parentData === null) {
            setComments(prevComments => {
                let comments = [
                    ...prevComments,
                    {
                        ...input,
                        index: prevComments.length
                    }
                ];
                return comments;
            })
        }
        else {
            if (!parentData.parent) {
                setComments(prevComments => {
                    let comments = prevComments.slice();
                    comments[parentData.index].replies = [
                        ...comments[parentData.index].replies,
                        {
                            ...input,
                            index: comments[parentData.index].replies.length,
                            parent: `${parentData.index}-`
                        }
                    ];
                    return comments;
                })
            }
            else {
                let parentArr = parentData.parent.split('-');
                setComments(prevComments => {
                    let comments = prevComments.slice();
                    insterNestedComments(0, parentArr, comments, input, parentData);
                    return comments;
                })
            }
        }
        setCommentCount(prevCount => prevCount + 1);
    }

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName={'Comments'}
                    githubUrl={'Comments'}
                />
            </Suspense>
            <div className='comment_page_main'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='comment_page_header'>
                                Comments {`(${commentCount})`}
                            </div>
                            <Suspense fallback={<div>Loading...</div>}>
                                <CommentBox
                                    parentInfo={null}
                                    addComment={addComment}
                                    height={150}
                                />
                            </Suspense>
                            <Suspense fallback={<div>Loading...</div>}>
                                <CommentList
                                    comments={comments}
                                    addComment={addComment}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}


export default Comments
