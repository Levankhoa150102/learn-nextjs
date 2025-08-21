import React from 'react';
type CheckBoxProps = {
    id: string ;
    label: string;
}
function CheckBox({ id, label }: CheckBoxProps) {
    return (
        <div>
            <input type="checkbox" id={id} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default CheckBox;