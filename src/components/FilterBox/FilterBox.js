import React from 'react';
import './FilterBox.css';
import { listToCSV, CSVToList, getIdsFromList } from '../../common.js'


const FilterBox = (props) => {
  const [txt, setTxt] = React.useState(listToCSV(props.list));
  
  React.useEffect(() => {
    setTxt(listToCSV(props.list));
  }, [props.list]);

  return <div className="FilterBox">
    <h2>{props.title} ({props.list.length} items)</h2>
    <textarea cols={100} rows={10} value={txt} onChange={e => setTxt(e.target.value)}></textarea><br />
    <button onClick={() => props.deleteItems(props.bulklist, props.setBulklist, getIdsFromList(CSVToList(txt)))}>Remove above rows</button>
  </div>
};

export default FilterBox;

