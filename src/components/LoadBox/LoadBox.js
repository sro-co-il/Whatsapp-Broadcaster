import React from 'react';
import './LoadBox.css';
import { listToCSV, CSVToList, getIdsFromList, getSubList, isNotBlank } from '../../common.js'

function getDelimiter(d) {
  switch (d) {
    case "[tab]":
      return "\t";
    case "[comma]":
      return ",";
    case "[space]":
      return " ";
    default:
      return d;
  }
}

function fixPhone(list) {
  return list.map(item => {
    if (item[2] === undefined) {
      return item;
    }

    let phone = item[2].trim().replace(/ |-/g,"");
    if (phone.slice(0, 1) == "+") {
      // nothing to fix
    } else if (phone.slice(0, 1) == "0") {
      phone = "+972" + phone.slice(1);
    } else if (phone.slice(0, 1) == "") {
      // empty field
    } else {
      phone = "+972" + phone;
    }
    item[2] = phone;
    return item;
  });
}

const LoadBox = (props) => {
  const [tmp, setTmp] = React.useState(listToCSV(props.list));
  const [delimiter, setDelimiter] = React.useState("[tab]");
  const [addPK, setAddPK] = React.useState(true);

  React.useEffect(() => {
    setTmp(listToCSV(props.list, getDelimiter(delimiter)));
  }, [props.list]);

  return <div className="LoadBox">
    <h2>Contacts ({props.list.length} items)</h2>
    <textarea cols={100} rows={10} value={tmp} onChange={e => setTmp(e.target.value)}></textarea><br />
    Delimiter <input defaultValue={delimiter} onChange={e => setDelimiter(e.target.value)} size={3} />
    {//<input type="checkbox" checked={addPK} onChange={e => setAddPK(e.target.checked)} />Add primary key 
    }
     <button style={{"marginLeft": "10px"}} onClick={(e) => {props.setBulklist({ "list": fixPhone(getSubList(CSVToList(tmp, getDelimiter(delimiter), addPK), isNotBlank)) }); e.target.disabled="disabled";}}>Parse, fix phone numbers and load</button>
  </div>
};

export default LoadBox;