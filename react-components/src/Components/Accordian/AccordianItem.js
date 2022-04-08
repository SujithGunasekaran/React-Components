import React, { Fragment, useState } from 'react';
import { DownArrowIcon, UpArrowIcon } from '../../UI/Icon';

const AccordianItem = (props) => {

    // props
    const { accordianInfo } = props;

    // State
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <div className='accordian_item_container'>
                <div className='accordian_item_head_container'>
                    <div className='accordian_item_head_text'>{accordianInfo.heading}</div>
                    <div onClick={() => setOpen(!open)}>
                        {
                            open ?
                                <UpArrowIcon
                                    cssClass={'accordian_item_head_icon'}
                                />
                                :
                                <DownArrowIcon
                                    cssClass={'accordian_item_head_icon'}
                                />
                        }

                    </div>
                </div>
                <div className={`accordian_item_para ${open ? 'active' : ''}`}>{accordianInfo.detail}</div>
            </div>
        </Fragment>
    )

}


export default AccordianItem;
