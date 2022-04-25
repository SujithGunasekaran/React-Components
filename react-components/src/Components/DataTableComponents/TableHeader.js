import React from 'react';
import { Pagination } from 'react_dev_library';
import useDebounceHooks from '../../Hooks/useDebounceHooks';


const TableHeader = (props) => {

    // Props
    const { totalLength, itemPerPage, handleNextPage, handleSearchData } = props;

    // Hooks
    const { debounceCallBack } = useDebounceHooks(handleSearchData, 400);


    return (
        <React.Fragment>
            <div className='data_table_header_container'>
                <Pagination
                    totalLength={totalLength}
                    itemPerPage={itemPerPage}
                    selectedPage={handleNextPage}
                    numberListPerSet={10}
                />
                <div className='data_table_header_pagination_search'>
                    <input
                        type='text'
                        placeholder='Search Email'
                        className='data_table_header_search_input'
                        onChange={(e) => debounceCallBack.call(e)}
                    />
                </div>
            </div>
        </React.Fragment>
    )

}

export default TableHeader;
