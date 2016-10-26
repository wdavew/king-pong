import React, { Component } from 'react';

function LeagueOption({leagueName, clickHandler}) {
  return (
  <li><a href='#' onClick={() => clickHandler(leagueName)}><h3 className='league-text'>{leagueName}</h3></a></li>
  )
}

export default LeagueOption;
