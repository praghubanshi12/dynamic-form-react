import React, { useEffect } from 'react';

export default function ColumnSelect({updateValidation, renderTableComponent, isActive}) {
    useEffect(() => {
        // console.log("I am column select");
    })
  return <div hidden={!isActive}>
    <h1>I am column select</h1>
    <button onClick={renderTableComponent}>Show Table Now</button>
  </div>;
}
