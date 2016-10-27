import React, { Component } from 'react';
import LeagueOption from './LeagueOption.js'

function LeagueList({leagues, enterLeague}) {
  const liLeagues = leagues.map((league, index) => <LeagueOption clickHandler={enterLeague} leagueName={league} key={index} />);
  return (
    <div className='container'>
      <div className='row leaguechooser'>
        <div className='col-xs-12'>
          <h3 className='display-text'>Your Leagues</h3>
          <ul>
            {liLeagues}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LeagueList;