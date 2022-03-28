import React, { Fragment } from 'react';
import { PageInfo } from './PageInfo';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => {

    return (
        <Fragment>
            <div className='home_main'>
                <div className='container-fluid'>
                    <div className='row'>
                        {
                            PageInfo.map((info) => (
                                <div className='col-md-3 home_card'>
                                    <Link to={info.url}>
                                        <div className='home_card_container'>
                                            <div className='home_card_text'>
                                                {info.PageName}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Home;
