import React from 'react';
//import PropTypes from 'prop-types';
import './Main.css';
import FilterBox from '../FilterBox/FilterBox';
import LoadBox from '../LoadBox/LoadBox';
import { CSVToList, getSubList, isNameBlank, isPhoneBlank, isPhoneInvalid, getDuplicatedItems, getDuplicatedItemsFromHistory, deleteItems } from '../../common.js'
import MessageBox from '../MessageBox/MessageBox';

const sampleList = `
ישראל	+972521234567
2ישראל	+9725212345
ישראל ישראל3	521234567
44	0521234567
	
	+972521234567
isra	+972521234567
isra2	+9725212345
ישראל isra3	521234567
55	0521234567
	
	+97252123456997
short	1234
special chars	9-9999999
long	+9991234567890
other	36189826
other	36189826]
`

const Main = () => {
  const [bulklist, setBulklist] = React.useState({ list: CSVToList(false ? sampleList : '', "\t", false) });
  return <div className="Main">
    
    Whatsapp Broadcaster<br />

    <header className="App-header">
      {bulklist.list.length} Contacts 
      | {getSubList(bulklist.list, isNameBlank).length} Blank names
      | {getSubList(bulklist.list, isPhoneBlank).length} Blank phones
      | {getSubList(bulklist.list, isPhoneInvalid).length} Invalid Phones
      | {getDuplicatedItems(bulklist.list).length} Internally duplciated
    </header>

    <LoadBox list={bulklist.list} setBulklist={setBulklist} />
    <FilterBox list={getSubList(bulklist.list, isNameBlank)} title={"Cleanup 1: Empty name"} bulklist={bulklist} setBulklist={setBulklist} deleteItems={deleteItems} />
    <FilterBox list={getSubList(bulklist.list, isPhoneBlank)} title={"Cleanup 2: Empty phone"} bulklist={bulklist} setBulklist={setBulklist} deleteItems={deleteItems} />
    <FilterBox list={getSubList(bulklist.list, isPhoneInvalid)} title={"Cleanup 3: Invalid phone"} bulklist={bulklist} setBulklist={setBulklist} deleteItems={deleteItems} />
    <FilterBox list={getDuplicatedItems(bulklist.list)} title={"Cleanup 4: Internally duplicated items, keep one of every duplication!"} bulklist={bulklist} setBulklist={setBulklist} deleteItems={deleteItems} />
    <FilterBox list={getDuplicatedItemsFromHistory(bulklist.list)} title={"Cleanup 5: History duplicated items, keep one of every duplication!"} bulklist={bulklist} setBulklist={setBulklist} deleteItems={deleteItems} />
    <MessageBox list={bulklist.list} />
  </div>
};

/*Main.propTypes = {};

Main.defaultProps = {};*/

export default Main;
