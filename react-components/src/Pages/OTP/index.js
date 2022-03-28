import React, { Fragment, useState, Suspense, lazy } from 'react';
import './style.css';


const PageNavigation = lazy(() => import('../../Components/PageNavigation'));
const PageHeader = lazy(() => import('../../Components/PageHeader'));


const OTPPage = () => {

    const [otpNumber, setOtpNumber] = useState(new Array(4).fill(''));
    const [activeInput, setActiveInput] = useState(0);

    const handleOtpChange = (e, idx) => {
        const { value } = e.target;
        console.log(idx);
        if (isNaN(value)) return;
        setOtpNumber(prevNumber => {
            let otpNumber = prevNumber.map((num, index) => idx === index ? value : num);
            return otpNumber;
        })
    }

    const handleKeyChange = (e, idx) => {
        const { nextElementSibling } = e.target;
        if (e.keyCode !== 8) {
            setActiveInput(idx + 1)
        }
    }

    console.log(otpNumber, activeInput);

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation />
            </Suspense>
            <div className='otp_page_main'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-5'>
                            <Suspense fallback={<div>Loading...</div>}>
                                <PageHeader
                                    PageName='OTP Component'
                                    githubUrl='OTP'
                                />
                            </Suspense>
                            <div className='otp_container'>
                                <div className='opt_heading'>Enter OTP send to you to verify the identity</div>
                                <div className='opt_box_container'>
                                    {
                                        otpNumber.map((num, index) => (
                                            <input
                                                key={index}
                                                value={num}
                                                focus={activeInput === index}
                                                tabIndex={`${index + 1}`}
                                                onChange={(e) => handleOtpChange(e, index)}
                                                onKeyDown={(e) => handleKeyChange(e, index)}
                                                className='otp_input_box'
                                            />
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


export default OTPPage;
