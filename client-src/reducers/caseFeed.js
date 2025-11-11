const caseFeed = (state = { feeds: {} }, action) => {
  switch(action.type) {
    case 'RECEIVE_CASE_FEED':
      return Object.assign({}, state, { feeds: Object.assign({}, state.feeds, { [action.caseId]: action.feedItems }) })
    case 'RECEIVE_NEW_FEED_ITEM':
      const feed = state.feeds[action.caseId] || []
      return Object.assign({}, state, { feeds: Object.assign({}, state.feeds, { [action.caseId]: [action.item].concat(feed) }) })
    default:
      return state
  }
}

export default caseFeed
