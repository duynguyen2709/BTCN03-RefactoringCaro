import React from 'react';
import '../index.css';

export default  function Square({ value, onClick }) {

    const text_color = value === "X" ?  "blue" : "red";

    return (
        <button className="square" onClick={onClick}>
            <span style={{
                color: text_color
            }}>
                {value}
            </span>
        </button>
    );
}