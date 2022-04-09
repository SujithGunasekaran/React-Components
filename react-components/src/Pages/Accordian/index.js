import React, { Fragment, lazy, Suspense } from 'react';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));
const AccordianComponent = lazy(() => import('../../Components/Accordian'));

const Accordian = () => {

    let accordianList = [
        {
            id: '1',
            heading: 'Accordian - 1',
            detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: '2',
            heading: 'Accordian - 2',
            detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer. A arcu cursus vitae congue mauris. Consequat interdum varius sit amet. Blandit cursus risus at ultrices mi tempus imperdiet. Tellus integer feugiat scelerisque varius. Dui id ornare arcu odio ut sem nulla. Cras semper auctor neque vitae tempus quam pellentesque. Ut etiam sit amet nisl. Accumsan sit amet nulla facilisi morbi tempus iaculis. Diam quis enim lobortis scelerisque fermentum. Habitasse platea dictumst vestibulum rhoncus est.'
        },
        {
            id: '3',
            heading: 'Accordian - 3',
            detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a. Placerat in egestas erat imperdiet. Viverra nibh cras pulvinar mattis nunc. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Orci ac auctor augue mauris augue. Eget mauris pharetra et ultrices neque. Adipiscing at in tellus integer feugiat. Venenatis tellus in metus vulputate eu scelerisque. Proin fermentum leo vel orci porta non pulvinar neque. Morbi leo urna molestie at. Pretium quam vulputate dignissim suspendisse in est ante in nibh. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Eu mi bibendum neque egestas congue quisque. At urna condimentum mattis pellentesque id.'
        }
    ]

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='Accordian'
                    githubUrl='Accordian'
                />
            </Suspense>
            <div className='accordian_container'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-5'>
                            <div className='accordian_title'>Single Option Accordian</div>
                            <AccordianComponent
                                accordianList={accordianList}
                                single={true}
                            />
                            <div className='accordian_title'>Multiple Option Accordian</div>
                            <AccordianComponent
                                accordianList={accordianList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}


export default Accordian;
