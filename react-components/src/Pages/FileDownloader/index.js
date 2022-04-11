import React, { Fragment, lazy, Suspense } from 'react';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const images = [
    {
        id: 1,
        thumb:
            "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=427&q=80 427w",
        file:
            "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?rnd=" +
            Math.random(),
        filename: "image-1.jpg",
    },
    {
        id: 2,
        thumb:
            "https://images.unsplash.com/photo-1604164388977-1b6250ef26f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80 401w",
        file:
            "https://images.unsplash.com/photo-1604164388977-1b6250ef26f3?rnd=" +
            Math.random(),
        filename: "image-2.jpg",
    },
    {
        id: 3,
        thumb:
            "https://images.unsplash.com/photo-1604264849633-67b1ea2ce0a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
        file:
            "https://images.unsplash.com/photo-1604264849633-67b1ea2ce0a4?rnd=" +
            Math.random(),
        filename: "image-3.jpg",
    },
];

const FileDownloader = () => {

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='File Downloader'
                    githubUrl='FileDownloader'
                />
            </Suspense>
            <div className='file_download_page_main'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='file_download_page_container'>
                                <div className='row'>
                                    {
                                        images.map((imageInfo) => (
                                            <div key={imageInfo.id} className='col-md-4 file_download_page_item'>
                                                <img src={imageInfo.thumb} className='file_download_page_img' loading='lazy' alt={imageInfo.thumb} />
                                                <button className='file_download_page_btn'>Download</button>
                                            </div>
                                        ))
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


export default FileDownloader;
