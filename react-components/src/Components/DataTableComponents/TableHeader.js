import React, { Fragment, useEffect, useMemo, useState, useRef } from 'react';
import { DoubleLeftArrow, DoubleRightArrow, LeftArrow, RightArrow } from '../../UI/Icon';
import useDebounceHooks from '../../Hooks/useDebounceHooks';


const TableHeader = (props) => {

    // Props
    const { totalLength, itemPerPage, handleNextPage, handleSearchData } = props;

    // State
    const [totalPageNumber, setTotalPageNumber] = useState(0);
    const [totalSet, setTotalSet] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [currentSelectedPage, setCurrentSelectedPage] = useState(1);
    const [numberPerPage] = useState(10);

    // Hooks
    const { debounceCallBack } = useDebounceHooks(handleSearchData, 400);

    // Ref
    const handlePageNumberClick = useRef();

    useEffect(() => {

        let pageNumberLength = Math.floor(totalLength / itemPerPage);
        setCurrentPageNumber(1);
        setTotalPageNumber(pageNumberLength);
        setTotalSet(Math.ceil(pageNumberLength / numberPerPage));

    }, [totalLength, itemPerPage, numberPerPage])


    handlePageNumberClick.current = (pageNumber) => {
        handleNextPage(pageNumber);
        setCurrentSelectedPage(pageNumber);
    }

    const nextPage = () => {
        let nextPageSet = (currentPageNumber) * numberPerPage + 1;
        if (currentSelectedPage + 1 === nextPageSet) {
            setCurrentPageNumber(currentPageNumber + 1);
        }
        handleNextPage(currentSelectedPage + 1);
        setCurrentSelectedPage(currentSelectedPage + 1);
    }

    const previousPage = () => {
        let previousPageSet = (currentPageNumber - 1) * numberPerPage;
        if (currentSelectedPage - 1 === previousPageSet) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
        handleNextPage(currentSelectedPage - 1);
        setCurrentSelectedPage(currentSelectedPage - 1);
    }

    const nextPageSet = () => {
        let pageNumber = (currentPageNumber) * numberPerPage + 1;
        setCurrentSelectedPage(pageNumber);
        handleNextPage(pageNumber);
        setCurrentPageNumber(currentPageNumber + 1);
    }

    const previousPageSet = () => {
        let previousPageSet = (currentPageNumber - 1) * numberPerPage;
        setCurrentSelectedPage(previousPageSet);
        handleNextPage(previousPageSet);
        setCurrentPageNumber(currentPageNumber - 1);
    }

    const pageItem = useMemo(() => {
        const startIndex = (currentPageNumber - 1) * numberPerPage + 1;
        const endIndex = ((currentPageNumber - 1) * numberPerPage) + numberPerPage;
        const pageItemList = [];
        for (let i = startIndex; i <= endIndex; i++) {
            if (i > totalPageNumber) continue;
            pageItemList.push(
                <div key={i} className={`data_table_header_pagination_number ${currentSelectedPage === i ? 'active' : ''}`} onClick={() => handlePageNumberClick.current(i)}>{i}</div>
            )
        }
        return pageItemList;
    }, [currentPageNumber, numberPerPage, totalPageNumber, currentSelectedPage]);


    return (
        <Fragment>
            <div className='data_table_header_container'>
                <div className='data_table_header_pagination_container'>
                    <div className={`data_table_header_pagination_icon ${currentPageNumber === 1 ? 'disabled' : ''}`} onClick={() => previousPageSet()}>
                        <DoubleLeftArrow
                            cssClass={'icon'}
                        />
                    </div>
                    <div className={`data_table_header_pagination_icon ${currentSelectedPage === 1 ? 'disabled' : ''}`} onClick={() => previousPage()}>
                        <LeftArrow
                            cssClass={'icon'}
                        />
                    </div>
                    {pageItem ? pageItem : ''}
                    <div className={`data_table_header_pagination_icon ${currentSelectedPage === totalPageNumber ? 'disabled' : ''}`} onClick={() => nextPage()}>
                        <RightArrow
                            cssClass={'icon'}
                        />
                    </div>
                    <div className={`data_table_header_pagination_icon ${currentPageNumber === totalSet ? 'disabled' : ''}`} onClick={() => nextPageSet()}>
                        <DoubleRightArrow
                            cssClass={'icon'}
                        />
                    </div>
                </div>
                <div className='data_table_header_pagination_search'>
                    <input
                        type='text'
                        placeholder='Search Email'
                        className='data_table_header_search_input'
                        onChange={(e) => debounceCallBack.call(e)}
                    />
                </div>
            </div>
        </Fragment>
    )

}

export default TableHeader;
