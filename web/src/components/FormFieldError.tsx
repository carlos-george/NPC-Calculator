import React from 'react';

interface FormErrorProps {
    error: string
}

export default function FormFieldError({ error }: FormErrorProps) {
    return (
        <span style={{
            marginLeft: '10px',
            color: '#d93025',
            position: 'relative',
            top: '-20px',
            fontSize: '12px'
        }}>{error}</span>
    );
}