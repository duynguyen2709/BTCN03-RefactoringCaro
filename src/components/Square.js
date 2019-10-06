import React from 'react';
import '../index.css';

export default function Square({ id, value, onClick }) {
    // console.log("rerender square");

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