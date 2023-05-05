import React from 'react';

function Popup(props) {
  return (
    <div className="popup" style={{ display: props.show ? 'block' : 'none' }}>
      <div className="popup-content">
        <button className="close" onClick={props.onClose}>&times;</button>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Popup;
