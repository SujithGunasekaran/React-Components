import React, { Fragment, Suspense, lazy, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));
const TableHeader = lazy(() => import('../../Components/DataTableComponents/TableHeader'));

const DataTable = () => {

    // State
    const [commentsList, setCommentsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(20);
    const [totalLength, setTotalLength] = useState(0);
    const [searchedData, setSearchedData] = useState('');

    // ref
    const getCommentDataRef = useRef();
    const tableHeaderRef = useRef();

    // Table Header
    tableHeaderRef.current = [
        { key: '1', Name: 'No', id: 'id' },
        { key: '2', Name: 'Name', id: 'name' },
        { key: '3', Name: 'Email', id: 'email' },
        { key: '4', Name: 'Comment', id: 'body' }
    ];

    getCommentDataRef.current = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
            setCommentsList(response.data);
            setTotalLength(response.data.length);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCommentDataRef.current();
    }, [])


    const handleNextPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleSearchData = useCallback((input) => {
        setSearchedData(input);
    }, [])

    const headerData = useMemo(() => {
        const header = [];
        for (let i = 0; i < tableHeaderRef.current.length; i++) {
            const { key, Name } = tableHeaderRef.current[i];
            header.push(
                <th key={key} scope="col">{Name}</th>
            )
        }
        return header;
    }, [])


    const commentsData = useMemo(() => {
        let comments = [];
        if (searchedData) {
            comments = commentsList.filter((info) => info.email.toLowerCase().includes(searchedData.toLowerCase()));
            setTotalLength(comments.length);
        }
        else {
            comments = commentsList;
        }
        setTotalLength(comments.length);
        return comments.slice((currentPage - 1) * itemPerPage, ((currentPage - 1) * itemPerPage) + itemPerPage);
    }, [commentsList, itemPerPage, currentPage, searchedData])


    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='Data Table'
                    githubUrl='DataTable'
                />
            </Suspense>
            <div className='data_table_main'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <Suspense fallback={<div>Loading...</div>}>
                                <TableHeader
                                    totalLength={totalLength}
                                    itemPerPage={itemPerPage}
                                    handleNextPage={handleNextPage}
                                    handleSearchData={handleSearchData}
                                />
                            </Suspense>
                            <table className="table table-striped table-dark data_table_container">
                                <thead>
                                    <tr>{headerData}</tr>
                                </thead>
                                <tbody>
                                    {
                                        commentsData.map((commentInfo) => (
                                            <tr key={commentInfo.id}>
                                                <th scope='row'>{commentInfo.id}</th>
                                                <td>{commentInfo.name}</td>
                                                <td>{commentInfo.email}</td>
                                                <td>{commentInfo.body}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}


export default DataTable;
