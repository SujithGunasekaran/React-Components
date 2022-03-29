import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const PageNavigation = (props) => {

    // props
    const { pageName, githubUrl } = props;

    return (
        <Fragment>
            <div className='page_header_main'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='page_head_navigation'>
                                <Link to='/'>
                                    <i className="fas fa-chevron-left arrow_icon"></i>
                                    Home
                                </Link>
                                <div className='page_head_info'>
                                    <div className='page_head_title'>{pageName}</div>
                                    <a href={`https://github.com/SujithGunasekaran/React-Components/tree/main/react-components/src/Pages/${githubUrl}`} target='_blank' rel="noreferrer">
                                        <button className='page_head_github_btn'>Source Code</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default PageNavigation;
