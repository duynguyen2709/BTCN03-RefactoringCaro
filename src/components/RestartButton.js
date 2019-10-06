import React from 'react';
import '../index.css';

export default function RestartButton({ onClick })  {

    return (
        <div className="restart-button">
        <button type="button" className="restart" onClick={onClick}>
            Chơi lại
        </button>
        </div>
    );
}