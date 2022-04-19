import React, { Fragment, lazy, Suspense } from 'react';
import Button from 'react_mu_button'; // my own library built for testing purpose.
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));


const ButtonComponent = () => {

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='File Downloader'
                    githubUrl='FileDownloader'
                />
            </Suspense>
            <div className='button_main'>
                <Button
                    color="primary"
                    variant="outlined"
                >Outlined Button</Button>
                <Button
                    color="success"
                    variant="fill"
                >Success Button</Button>
                <Button
                    color="danger"
                    variant="fill"
                >Danger Button</Button>
                <Button
                    color="danger"
                    variant="fill"
                    disabled={true}
                >Disabled Button</Button>
            </div>
        </Fragment>
    )

}


export default ButtonComponent;
