import React, { Component } from 'react';

function LeagueForm({chooseLeague, submit, leagues, handleInputTextChange}) {
  const data = leagues.map((name, index) => <option key={index}>{name}</option>);
  return (
    <div className='container leagueform'>
      <div className='league-form row'>
        <div className='col-xs-12'>
            <form onSubmit={(e) => chooseLeague(e)}>
              <p>Join a league</p>
              <select className='choose-league-buttons' onChange={(e) => handleInputTextChange(e, 'selectedLeague')}>
                {data}
              </select>
              <button className='choose-league-buttons' type='submit'>Join</button>
            </form>
            <p>Start a league</p>
            <form onSubmit={(e) => submit(e)} >
              <input type='text' onChange={(e) => handleInputTextChange(e, 'newLeague')} placeholder='Your League Name' />
            </form>
        </div>
      </div>
    </div>
  )
}

export default LeagueForm;