import React, { Fragment, useEffect, useState, useRef, Suspense, lazy, useCallback } from 'react';
import { PrimaryLoading } from '../../UI/Icon';
import axios from 'axios';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const InfiniteScroll = () => {

    // State
    const [userList, setUserList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [itemPerPage] = useState(20);
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);

    // Ref
    const getContactListRef = useRef();
    const observerRef = useRef();

    getContactListRef.current = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const response = await axios.get(`https://api.github.com/search/users?q=dcoder&page=${pageNo}&per_page=${itemPerPage}`);
            const { data = null } = response;
            if (data) {
                if (userList.length + data.items.length === data.total_count) {
                    setHasMoreData(false);
                }
                setUserList(prevList => {
                    let userList = [
                        ...prevList,
                        ...data.items
                    ];
                    return userList;
                })
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getContactListRef.current();
    }, [pageNo])


    const contactListObserver = useCallback((contactElement) => {
        if (loading) return;
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        observerRef.current = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMoreData) {
                setPageNo(prevPageNo => prevPageNo + 1);
            }
        })
        if (contactElement) observerRef.current.observe(contactElement);
    }, [hasMoreData, loading])


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
                                <div className='infinite_card_body'>
                                    {
                                        userList.length > 0 &&
                                        userList.map((userInfo, index) => (
                                            <div key={index} ref={(userList.length - 1 === index && !loading) ? contactListObserver : null} className='infinite_card_body_item'>
                                                <img src={userInfo.avatar_url} className='infinite_card_body_img' loading='lazy' alt={userInfo.login} />
                                                <div className='infinite_card_body_name'>{userInfo.login}</div>
                                            </div>
                                        ))
                                    }
                                    {
                                        loading &&
                                        <PrimaryLoading
                                            cssClass={'infinite_card_loading'}
                                        />
                                    }
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
