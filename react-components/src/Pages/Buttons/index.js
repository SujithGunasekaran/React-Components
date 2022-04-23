import React, { Fragment, lazy, Suspense } from 'react';
import { Button } from 'react_dev_library';
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
                    mode="primary"
                    variant="outlined"
                >Outlined Button</Button>
                <Button
                    mode="success"
                    variant="fill"
                >Success Button</Button>
                <Button
                    mode="danger"
                    variant="fill"
                    onClick={() => console.log("Hello")}
                >Danger Button</Button>
                <Button
                    mode="danger"
                    variant="fill"
                    disabled={true}
                >Disabled Button</Button>
                <Button
                    variant="fill"
                    shape="sharp"
                >sharp Button</Button>
                <Button
                    className='footer_btn'
                >Custom Button</Button>
            </div>
        </Fragment>
    )

}


export default ButtonComponent;
