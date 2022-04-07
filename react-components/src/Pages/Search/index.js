import React, { Fragment, Suspense, lazy, useEffect, useCallback, useState, useMemo } from 'react';
import { PrimaryLoading } from '../../UI/Icon';
import useDebounceHooks from '../../Hooks/useDebounceHooks';
import axios from 'axios';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const Search = () => {

    // State
    const [countryList, setCountryList] = useState([]);
    const [searchedData, setSearchedData] = useState('');
    const [loading, setLoading] = useState(false);

    // Hooks
    const { debounceCallBack } = useDebounceHooks(setSearchedData, 400);


    const getCountryList = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://restcountries.com/v3.1/region/asia');
            const { data = null } = response;
            if (data) {
                setCountryList(data);
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }, [])


    useEffect(() => {
        getCountryList();
    }, [getCountryList])


    const countryInfo = useMemo(() => {
        let countryData = [];
        if (searchedData) {
            countryData = countryList.filter(country => country.name.common.trim().toLowerCase().includes(searchedData.toLocaleLowerCase()));
            return countryData;
        }
        return countryList;
    }, [countryList, searchedData])


    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='Search'
                    githubUrl='Search'
                />
            </Suspense>
            <div className='search_page_container'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-5'>
                            <div className='search_page_header'>
                                <input
                                    onChange={(e) => debounceCallBack.call(e)}
                                    placeholder='Search Country'
                                    className='search_page_header_input'
                                />
                            </div>
                            <div className='search_page_body'>
                                {
                                    loading &&
                                    <PrimaryLoading
                                        cssClass={'search_page_body_loading'}
                                    />
                                }
                                {
                                    countryInfo &&
                                    countryInfo.map(country => (
                                        <div key={country.fifa} className='search_page_body_item'>
                                            <img src={country?.flags?.svg ?? ''} loading='lazy' className='search_page_item_img' alt={country.name.common} />
                                            <div className='search_page_item_name'>{country?.name?.common ?? ''}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Search;
