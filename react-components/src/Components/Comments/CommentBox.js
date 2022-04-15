import React, { Fragment, useState } from 'react';
import { uuid } from '../../Util';

const CommnetBox = (props) => {

    // Props
    const { parentInfo, addComment, height, callback = null } = props;

    // State
    const [commentInput, setCommentInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        if (errorMessage) {
            setErrorMessage('');
        }
        setCommentInput(e.target.value);
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentInput.trim() === '') {
            setErrorMessage('Please enter some comment');
        }
        let input = {
            id: uuid(),
            name: 'John',
            data: commentInput,
            parent: null,
            replies: [],
            date: '2 hours ago'
        };
        addComment(input, parentInfo);
        setCommentInput('');
        if (callback) {
            callback();
        }
    }

    return (
        <Fragment>
            <div className='comment_box_container'>
                <form onSubmit={(e) => handleCommentSubmit(e)}>
                    <textarea
                        value={commentInput}
                        style={{ height: `${height}px` }}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="what are your thoughts ?"
                        className='comment_box_input'
                    />
                    <div className='comment_box_footer'>
                        <div className='comment_box_error'>
                            {errorMessage ? errorMessage : ''}
                        </div>
                        <button className='comment_box_submit_btn' type='submit'>Add Comment</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )

}


export default CommnetBox;
