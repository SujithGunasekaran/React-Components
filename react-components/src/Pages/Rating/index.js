import React, { Fragment, Suspense, lazy, useState, useMemo } from 'react';
import { StarIcon } from '../../UI/Icon';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const Rating = () => {

    // State
    const [hoveredRating, setHoveredRating] = useState(0);
    const [rate, setRate] = useState(0);
    const [starCount] = useState(5);

    const starItem = useMemo(() => {
        let starRating = [];
        for (let i = 1; i <= starCount; i++) {
            let item = (
                <span
                    onMouseEnter={() => setHoveredRating(i)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRate(i)}
                    key={i}
                >
                    <StarIcon
                        cssClass={`star_page_icon ${hoveredRating === 0 ? (rate >= i ? 'active' : '') : (hoveredRating >= i ? 'active' : '')}`}
                    />
                </span>
            )
            starRating.push(item);
        }
        return starRating;
    }, [rate, hoveredRating, starCount])

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='Star Rating'
                    githubUrl='Rating'
                />
            </Suspense>
            <div className='star_page_container'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-5'>
                            <div className='star_rating_container'>
                                {starItem}
                            </div>
                            <div className='star_rating_text'>Rating - {rate}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}


export default Rating;
