import React, { Fragment, useState } from 'react';
import { DownArrowIcon, UpArrowIcon } from '../../UI/Icon';

const AccordianItem = (props) => {

    // props
    const { accordianInfo, single, selectedAccordian, handleAccordianSelect } = props;

    // State
    const [open, setOpen] = useState(false);

    const handleAccordian = (accordianInfo) => {
        setOpen(!open);
        if (single) {
            handleAccordianSelect(accordianInfo);
        }
    }

    const onActive = single ? (selectedAccordian === accordianInfo.id) : (open);

    return (
        <Fragment>
            <div className='accordian_item_container' onClick={() => handleAccordian(accordianInfo)}>
                <div className='accordian_item_head_container'>
                    <div className='accordian_item_head_text'>{accordianInfo.heading}</div>
                    {
                        onActive ?
                            <UpArrowIcon
                                cssClass={'accordian_item_head_icon'}
                            />
                            :
                            <DownArrowIcon
                                cssClass={'accordian_item_head_icon'}
                            />
                    }

                </div>
                <div className={`accordian_item_para ${onActive ? 'active' : ''}`}>{accordianInfo.detail}</div>
            </div>
        </Fragment>
    )

}


export default AccordianItem;
