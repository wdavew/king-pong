import React, { Component } from 'react';

function Message({action, id, sender, time, updateElo, deleteMsg}) {
  const text = {
    EloUpdate: 'claims they recently beat you. Press OK if this is correct',
    Challenge: 'has challenged you.'
  }
  return (
    <div>
    <p>{`${sender} ${text[action]}`}</p>
    <button onClick={() => {
      updateElo(sender);
      deleteMsg(id);
    }}>Ok</button>
    <button type='submit'>Ignore</button>
    </div>
  )
}

export default Message;