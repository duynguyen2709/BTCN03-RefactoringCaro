import React from 'react';
import '../index.css';

export default function Square({ id, value, onClick }) {

    const textColor = value === "X" ?  "blue" : "red";

    return (
        <button type="button" className="square" id={id} onClick={onClick}>
            <span style={{
                color: textColor
            }}>
                {value}
            </span>
        </button>
    );
}