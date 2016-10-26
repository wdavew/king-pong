import React, { Component } from 'react';

function LeagueForm({chooseLeague, submit, leagues, handleInputTextChange}) {
  const data = leagues.map((name, index) => <option key={index}>{name}</option>);
  return (
    <div className='LeagueForm'>
    <form onSubmit={(e) => chooseLeague(e)}>
      <p>Join a league</p>
      <select onChange={(e) => handleInputTextChange(e, 'selectedLeague')}>
        {data}
      </select>
      <button type='submit'>Submit</button>
    </form>
    <p>Start a league</p>
    <form onSubmit={(e)=>submit(e)} >
      <input type='text' onChange={(e) => handleInputTextChange(e, 'newLeague')} />
    </form>
    </div>
  )
}

export default LeagueForm;