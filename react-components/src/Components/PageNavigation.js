import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const PageNavigation = () => {

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default PageNavigation;
