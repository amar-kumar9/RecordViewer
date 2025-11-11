import { combineReducers } from 'redux'

import login from './login'
import context from './context'
import header from './header'
import recentitems from './recentitems'
import record from './record'
import entities from './entities'
import rawjson from './rawjson'
import error from './error'
import picklists from './picklists.js'
import depGraph from './depGraph.js'
import cases from './cases'
import caseFeed from './caseFeed'

export default combineReducers( {
  login,
  context,
  header,
  recentitems,
  record,
  cases,
  caseFeed,
  picklists,
  entities,
  rawjson,
  error,
  depGraph
})
