import React, { Fragment, useState } from 'react';
import AccordianItem from './AccordianItem';

const AccordianComponent = (props) => {

    //Props
    const { accordianList, single = false } = props;

    // State
    const [selectedAccordian, setSelectedAccordian] = useState(null);

    const handleAccordianSelect = (accordianInfo) => {
        setSelectedAccordian(prevValue => {
            if (prevValue === accordianInfo.id) {
                return null;
            }
            return accordianInfo.id;
        })
    }

    return (
        <Fragment>
            {
                accordianList.map((accordianInfo) => (
                    <div className='accordian_item' key={accordianInfo.id}>
                        <AccordianItem
                            accordianInfo={accordianInfo}
                            single={single}
                            selectedAccordian={selectedAccordian}
                            handleAccordianSelect={handleAccordianSelect}
                        />
                    </div>
                ))
            }
        </Fragment>
    )

}


export default AccordianComponent;
