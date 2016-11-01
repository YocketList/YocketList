import React from 'react';
import HistoryItem from './historyitem';
const testData = require('../server/model/database')

const HistoryList = (props) => {
  let list;
  if (Array.isArray(props.history)) {
   list = props.history.map(function(historyObj, ind) {
      return <History key={ind} data={historyObj} />;
    });
  } else {
    list = testData.queue["5817dafb1da5550f5405937f"].map(function(historyObj, ind) {
       return <HistoryItem key={ind} data={historyObj} />;
     });
  }
  return (
    <div className="HistoryList">
      <h4>History:</h4>
      {list}
    </div>
  )
};

export default HistoryList;
