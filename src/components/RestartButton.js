import React from 'react';
import '../index.css';

const RestartButton = React.memo(({onClick}) => {
  return <div className="restart-button">
    <button type="button" className="restart" onClick={onClick}>
      Chơi lại
    </button>
  </div>;
});

export default RestartButton;