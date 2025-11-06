const cases = (state = {cases: [], totalSize: 0, page: 1, pageSize: 10, isFetching: false}, action) => {
  switch(action.type) {
    case 'FETCH_CASES':
      return Object.assign({}, state, { isFetching: true })
    case 'RECEIVE_CASES':
      return {
        isFetching: false,
        cases: action.cases,
        totalSize: action.totalSize,
        page: action.page,
        pageSize: action.pageSize
      }
    default:
      return state
  }
}

export default cases
