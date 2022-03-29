import React, { Fragment, useState, Suspense, lazy, useEffect, useRef } from 'react';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const OTPPage = () => {

    // State
    const [otpNumber, setOtpNumber] = useState([]);
    const [verifiedOtp, setVerifiedOtp] = useState(null);

    // ref
    const constructOtpInputRef = useRef(null);

    constructOtpInputRef.current = () => {
        setOtpNumber(() => {
            let otpNumber = [];
            for (let i = 0; i < 4; i++) {
                otpNumber.push({
                    id: `${i}`,
                    otp: ''
                });
            }
            return otpNumber;
        })
    }

    useEffect(() => {
        constructOtpInputRef.current();
    }, [])


    const handleOtpChange = (e, otpInfo) => {
        const { value } = e.target;
        if (isNaN(value) || +value > 9) return;
        setOtpNumber(prevNumber => {
            let otpNumber = prevNumber.map((info) => info.id === otpInfo.id ? { ...info, otp: value } : info);
            return otpNumber;
        })
    }

    const removePrevValue = (targetElement) => {
        const { id } = targetElement;
        const currentIndex = id.split('-')[1];
        setOtpNumber(prevNumber => {
            let otpNumber = prevNumber.map((info) => info.id === currentIndex ? { ...info, otp: '' } : info);
            return otpNumber;
        })
    }

    const focusPrevInput = (targetElement) => {
        const { id } = targetElement;
        const currentIndex = id.split('-')[1];
        if (+currentIndex === 0) return;
        document.querySelector(`#otp-${currentIndex - 1}`).focus();
    }

    const handleKeyChange = (e) => {
        if (e.keyCode === 8) {
            const { target } = e;
            e.preventDefault();
            removePrevValue(target);
            focusPrevInput(target);
        }
    }

    const handleInputChange = (e) => {
        const { nextSibling } = e.target;
        if (nextSibling) {
            nextSibling.focus();
        }
    }

    const resetOtpNumber = () => {
        constructOtpInputRef.current();
        setVerifiedOtp(null);
    }

    const verifiyOtpNumber = () => {
        let result = '';
        otpNumber.forEach(info => {
            result += info.otp;
        })
        if (result === '') {
            setVerifiedOtp(null);
            return;
        };
        setVerifiedOtp(result);
    }

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName='OTP Component'
                    githubUrl='OTP'
                />
            </Suspense>
            <div className='otp_page_main'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-5'>
                            <div className='otp_container'>
                                <div className='opt_heading'>Enter OTP send to you to verify the identity</div>
                                <div className='opt_box_container'>
                                    {
                                        otpNumber.map((otpInfo) => (
                                            <input
                                                id={`otp-${otpInfo.id}`}
                                                key={otpInfo.id}
                                                value={otpInfo.otp}
                                                onChange={(e) => handleOtpChange(e, otpInfo)}
                                                onKeyDown={(e) => handleKeyChange(e)}
                                                onInput={(e) => handleInputChange(e)}
                                                className='otp_input_box'
                                            />
                                        ))
                                    }
                                </div>
                                {
                                    verifiedOtp &&
                                    <div className='otp_form_verify'>Entered Otp - {verifiedOtp}</div>
                                }
                                <div className='otp_form_footer'>
                                    <button className='otp_form_btn cancel' onClick={() => resetOtpNumber()}>Cancel</button>
                                    <button className='otp_form_btn' onClick={() => verifiyOtpNumber()}>Verify</button>
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
