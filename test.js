import React, { useEffect, useRef } from 'react';
import { Button } from '@mui/material';

const MyComponent = () => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const rect = buttonRef.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            console.log('Button is above the fold');
        }
    }, []);

    return (
        <Button ref={buttonRef} variant="contained">
            Click Me
        </Button>
    );
};

export default MyComponent;
