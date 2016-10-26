import React, { Component } from 'react';
import LeagueOption from './LeagueOption.js'

function LeagueList({leagues, enterLeague}) {
  const liLeagues = leagues.map((league, index) => <LeagueOption clickHandler={enterLeague} leagueName={league} key={index} />);
  return (
    <div>
    <h3> Your Leagues </h3>
      <ul>
        {liLeagues}
      </ul>
    </div>
  )
}

export default LeagueList;