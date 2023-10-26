import React from 'react';
import './MessageBox.css';
import { parseList } from '../../common.js'

const defaultMsg = `Hi @name,

Have a great day!

Raanana Command Center`;

let submittedList = [];
submittedList = parseList(localStorage["submitted"]);

function markSubmitted(phone) {
  submittedList.push(phone);
  localStorage['submitted'] = JSON.stringify(submittedList);
}

function markUnsubmitted(phone) {
  console.log(phone)
  submittedList = submittedList.filter(element => element !== phone);
  localStorage['submitted'] = JSON.stringify(submittedList);
}

const ClickToSend = (props) => {
  const [submitted, setSubmitted] = React.useState(false);

  return <>
    <a onClick={() => { setSubmitted(true); markSubmitted(props.phone) }} href={props.link} style={{ "color": submitted ? "blue" : "red" }} target="_blank">Click to send</a>
    <u><a onClick={() => { setSubmitted(false); markUnsubmitted(props.phone) }} style={{ "marginLeft": "30px" }}>Mark as unsent</a></u>
  </>
};

const MessageBox = (props) => {
  const [msg, setMsg] = React.useState(defaultMsg);
  const [cache, setCache] = React.useState('');

  return <div className="MessageBox">
    <h2>Compose message to submit</h2>
    <textarea cols={100} rows={10} value={msg} onChange={e => setMsg(e.target.value)}></textarea><br />
    <table style={{ "margin": "auto" }}><tbody>
      {props.list.map(item => {
        return <tr style={{ "lineHeight": "50px" }}>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
          <td>{item[2]}</td>
          <td>
            <ClickToSend link={`https://wa.me/${item[2]}?text=${encodeURIComponent(msg.replace("@name", item[1]))}`} phone={item[2]} />
          </td>
        </tr>
      })}
    </tbody></table>
    <br /><br /><br />
    <h2>Local cache</h2>
    <button onClick={() => setCache(localStorage['submitted'])}>Load from local cache</button>
    <button onClick={() => parseList(cache).length == 0 ? alert('empty/error') : localStorage['submitted'] = JSON.stringify(parseList(cache))}>Save to local cache</button>
    <br />
    <textarea cols={100} rows={10} value={cache} onChange={e => setCache(e.target.value)}></textarea><br />
    <br /><br />
    <button onClick={() => localStorage['submitted'] = JSON.stringify([])}>Delete local cache</button>
    <br /><br />
  </div>
};

export default MessageBox;
