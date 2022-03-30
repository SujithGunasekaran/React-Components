import React, { Fragment, Suspense, lazy } from 'react';
import { OpenEyeIcon, CloseEyeIcon } from '../../UI/Icon';
import useSignupHooks from '../../Hooks/useSignupHookes';
import './style.css';

const PageNavigation = lazy(() => import('../../Components/PageNavigation'));

const Signup = () => {

    // Hooks
    const {
        toggleEye,
        formData,
        formError,
        formSuccess,
        passwordValidity,
        showEyeIcon,
        hideEyeIcon,
        handleInputChange,
        handleFormSubmit
    } = useSignupHooks();

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <PageNavigation
                    pageName={'Signup Component'}
                    githubUrl={'Signup'}
                />
            </Suspense>
            <div className='container-fluid'>
                <div className='row justify-content-md-center'>
                    <div className='col-md-5'>
                        <div className='signup_page_container'>
                            <div className='row justify-content-md-center'>
                                <div className='col-md-9'>
                                    <div className='signup_page_header sans_font text_white_one text_14'>
                                        Create Account
                                    </div>
                                    {
                                        formSuccess &&
                                        <div className='form_success'>Form Saved Successfully!</div>
                                    }
                                    <form onSubmit={(e) => handleFormSubmit(e)}>
                                        <div className='signup_page_form_container'>
                                            <input
                                                type='text'
                                                name='Name'
                                                value={formData?.Name ?? ''}
                                                placeholder='Name'
                                                className='signup_page_form_input'
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            {
                                                formError['Name_Error'] && <div className='form_error'>{formError['Name_Error']}</div>
                                            }
                                            <input
                                                type='email'
                                                name='Email'
                                                value={formData?.Email ?? ''}
                                                placeholder='Email Address'
                                                className='signup_page_form_input'
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            {
                                                formError['Email_Error'] && <div className='form_error'>{formError['Email_Error']}</div>
                                            }
                                            <div className='signup_page_password_form'>
                                                <input
                                                    type={toggleEye ? 'text' : 'password'}
                                                    name='Password'
                                                    value={formData?.Password ?? ''}
                                                    placeholder='Password'
                                                    className='signup_page_form_input password'
                                                    onChange={(e) => handleInputChange(e)}
                                                />
                                                {
                                                    toggleEye ?
                                                        <CloseEyeIcon
                                                            cssClass={'password_icon'}
                                                            onClickHandler={() => hideEyeIcon()}
                                                        />
                                                        :
                                                        <OpenEyeIcon
                                                            cssClass={'password_icon'}
                                                            onClickHandler={() => showEyeIcon()}
                                                        />
                                                }
                                            </div>
                                            {
                                                formError['Password_Error'] && <div className='form_error'>{formError['Password_Error']}</div>
                                            }
                                            <div className='signup_form_password_info'>
                                                <div className='signup_form_password_info_title'>Password must contain : </div>
                                                <ul className='signup_form_password_info_ul'>
                                                    <li className={passwordValidity.character ? 'active' : ''}>Have Atleast 8 character</li>
                                                    <li className={passwordValidity.number ? 'active' : ''}>Have Atleast 1 number</li>
                                                    <li className={passwordValidity.special ? 'active' : ''}>Have Atleast 1 special character</li>
                                                </ul>
                                            </div>
                                            <button type='submit' className='signup_page_form_btn'>Create Account</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Signup;
