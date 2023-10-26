function listToCSV(list, delimiter = ',') {
    let csv = "";
    list.forEach((row) => {
        csv += row.join(delimiter) + '\n';
    });
    return csv.slice(0, -1); // removing the last \n that was added
}

function CSVToList(csv, delimiter = ',', addPrimaryKey = false) {
    let list = [];
    csv.split('\n').forEach((row) => {
        if (addPrimaryKey) {
            list.push([list.length + 1].concat(row.split(delimiter)));
        } else {
            list.push(row.split(delimiter));
        }
    });
    return list;
}

function getIdsFromList(list) {
    let ids = [];
    let invalidIds = [];
    list.forEach((row) => {
        if (!isNaN(parseInt(row[0]))) {
            ids.push(parseInt(row[0]));
        } else {
            invalidIds.push(row[0]);
        }
    });
    console.log("invalid ids:", invalidIds)
    return ids;
}




// generate a function in javascript that returns a sublist from a list based on a criteria
function getSubList(list, criteria) {
    return list.filter(item => criteria(item));
}

// if it is spaces, empty or null return true otherwise return false
function isNameBlank(item) {
    return item[1] === undefined || item[1] === "" || item[1] === null;
}

// if it is spaces, empty or null return true otherwise return false
function isPhoneBlank(item) {
    return item[2] === undefined || item[2] === "" || item[2] === null;
}

function isNotBlank(item) {
    return ! isNameBlank(item) && ! isPhoneBlank(item);
}

// generate js function that checks if phonenumber is invalid
function isPhoneInvalid(item) {
    return item[2] !== undefined && (item[2].length < 12 || item[2].length > 13 || item[2].match(/[^+0-9]/) !== null || item[2].match(/^\+972/) === null);
}

// generate js code that returns duplicated items in a list of lists that both their same second subitem is equal
function getDuplicatedItems(list) {
    return list.filter(item => list.filter(item2 => item2[2] == item[2]).length > 1);
}

function getDuplicatedItemsFromHistory(list) {
    let submittedList = [];
    if (localStorage["submitted"]) {
        submittedList = parseList(localStorage["submitted"]);
    }
    console.log(submittedList, list);

    return list.filter(item => submittedList.filter(phone => phone == item[2]).length > 0);
}

function deleteItems(bulklist, setBulklist, itemsToDelete) {
    setBulklist({ "list": bulklist.list.filter(item => !itemsToDelete.includes(item[0])) });
}


function parseList(list) {
    let tmp = [];
    try {
      tmp = JSON.parse(list);
      if (!Array.isArray(tmp)) {
        tmp = [];
      }
    } catch (e) {
      tmp = [];
    }
    return tmp;
  }
  

export { listToCSV, CSVToList, getIdsFromList, getSubList, isNameBlank, isPhoneBlank, isNotBlank, isPhoneInvalid, getDuplicatedItems, getDuplicatedItemsFromHistory, deleteItems, parseList };