import React, { Fragment } from 'react';


const PageHeader = (props) => {

    // props
    const { PageName, githubUrl } = props;

    return (
        <Fragment>
            <div className='page_head_info'>
                <div className='page_head_title'>{PageName}</div>
                <a href={`https://github.com/SujithGunasekaran/React-Components/tree/main/react-components/src/Pages/${githubUrl}`} target='_blank' rel="noreferrer">
                    <button className='page_head_github_btn'>Source Code</button>
                </a>
            </div>
        </Fragment>
    )

}


export default PageHeader;
