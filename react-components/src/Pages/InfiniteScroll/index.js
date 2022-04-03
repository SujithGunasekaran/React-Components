import React, { Fragment, useEffect, useState, useCallback, Suspense, lazy } from 'react';
import axios from 'axios';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const InfiniteScroll = () => {

    // State
    const [userList, setUserList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);


    const getContactList = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=dcoder&page=${pageNo}&per_page=${itemPerPage}`);
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }, [])


    useEffect(() => {
        getContactList();
    }, [getContactList])



    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='Infinite Scrolling'
                    githubUrl='InfiniteScroll'
                />
            </Suspense>
            <div className='infinite_page_main'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-5'>
                            <div className='infinite_card_container'>
                                <div className='infinite_card_header'>
                                    <div className='infinite_card_header_title'>User List</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default InfiniteScroll;
