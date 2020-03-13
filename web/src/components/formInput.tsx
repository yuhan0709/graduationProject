import React from 'react';

interface InputProps {
    value: string
}
const FormInput = (props: InputProps) => {
    return <input style={{ width: '200px' }} value={props.value} />
}

export default FormInput;