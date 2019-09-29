import React from 'react';
import '../index.css';

export default  function Square({ id, value, onClick }) {

    const text_color = value === "X" ?  "blue" : "red";

    return (
        <button className="square" id={id} onClick={onClick}>
            <span style={{
                color: text_color
            }}>
                {value}
            </span>
        </button>
    );
}