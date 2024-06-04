import React, { useEffect, useState} from "react";

import { IoIosClose } from "react-icons/io";

interface ErrorWarningProps {
    type: number; // 0 = Error, 1 = Warning
    message: string;
    onClose: () => void;
}

export default function ErrorMsg({type, message, onClose}: ErrorWarningProps): JSX.Element {

    const [isVisible, setIsVisible] = useState(true);

    const errorWarningStyle = {
        position: 'fixed' as 'fixed',
        bottom: 0,
        right: 0,
        backgroundColor: type === 0 ? '#f56565' : 'yellow', // softer red color
        padding: '1rem',
        maxWidth: '300px',
        borderRadius: '10px',
        color: 'white',
        zIndex: 1000,
        alignItems: 'center',
        margin: '1rem',
        transition: 'transform 0.3s ease-in-out',
        transform: isVisible ? 'translateX(0)' : 'translateX(120%)',
    };

    const closeIconStyle = {
        cursor: 'pointer',
        fontSize: '2rem',
        margin: '-1rem',
        display: 'flex',
        justifyContent: 'flex-end',
    };

    useEffect(() => {
        if (!isVisible) {
            const timer = setTimeout(onClose, 300); // Wait for the animation to finish before removing the component
            return () => { clearTimeout(timer); };
        }
    }, [isVisible, onClose]);


    return(
        <div style={errorWarningStyle}>
            <div style={closeIconStyle} onClick={()=> {setIsVisible(false)}}>
                <IoIosClose />
            </div>
            <div>
                <h1><strong>Error: </strong>{message}</h1>
            </div>

        </div>
    )
}