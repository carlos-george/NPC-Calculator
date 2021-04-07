import React, { InputHTMLAttributes } from 'react';
import { mask, unMask } from '../utils/FormatterUtils';

import '../styles/components/form-field.css';


interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
    name: string;
    value: string;
    hasError?: false;
    onChange: any;
    onBlur?: any;
    patterns?: string[];
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    onBlur,
    hasError,
    patterns,
    ...rest
}) => {

    const fieldId = `id_${name}`;

    const hasValue = Boolean(value.length);

    const handleOnChange = (event: any) => {


        if (patterns) {
            const originalValue = unMask(event.target.value);
            const maskedValue = mask(originalValue, patterns);

            event.target.value = maskedValue;
        }

        onChange(event);
    };

    return (
        <>
            <div id="form-wrapper">
                <input
                    id={fieldId}
                    type={type}
                    value={value}
                    name={name}
                    placeholder=" "
                    data-hasvalue={hasValue}
                    onChange={handleOnChange}
                    onBlur={onBlur}
                    style={hasError ? { borderColor: '#d93025' } : {}}
                    {...rest}
                />
                <label htmlFor={fieldId} style={hasError ? { color: '#d93025' } : {}}>
                    {label}
                </label>
            </div>
        </>
    );
}

export default FormField;