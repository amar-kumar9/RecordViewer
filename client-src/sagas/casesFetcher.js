import { call, put } from 'redux-saga/effects'
import { receiveCases, showError } from '../actions'

// Fetch current user id from userinfo then query Cases owned by that user.
export default function* casesFetcher(action) {
  console.log('casesFetcher saga: Starting with action:', { type: action.type, page: action.page, pageSize: action.pageSize, hasInstanceUrl: !!action.creds?.instanceUrl, hasAccessToken: !!action.creds?.accessToken })
  const { creds, page, pageSize } = action
  const instanceUrl = creds.instanceUrl
  const accessToken = creds.accessToken

  try {
    console.log('casesFetcher saga: Fetching user info from:', instanceUrl + '/services/oauth2/userinfo')
    // fetch user info to get user id
    const userInfoResp = yield call(fetch, instanceUrl + '/services/oauth2/userinfo', { method: 'GET', headers: { 'Authorization': 'Bearer ' + accessToken }})
    const userInfo = yield userInfoResp.json()
    console.log('casesFetcher saga: User info response:', userInfo)
    const userId = userInfo.user_id
    console.log('casesFetcher saga: Got userId:', userId)

    if (!userId) {
      throw new Error('User ID not found in user info response. Full response: ' + JSON.stringify(userInfo))
    }

    const offset = (page - 1) * pageSize
    const soql = `SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate FROM Case WHERE OwnerId = '${userId}' ORDER BY CreatedDate DESC LIMIT ${pageSize} OFFSET ${offset}`
    const qUrl = instanceUrl + '/services/data/v58.0/query?q=' + encodeURIComponent(soql)
    console.log('casesFetcher saga: Querying cases with SOQL:', soql)

    const req = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    }

    const response = yield call(fetch, qUrl, req)
    const responseJson = yield response.json()
    console.log('casesFetcher saga: API response:', responseJson)

    if (!response.ok) {
      console.error('Cases query failed: ' + response.status, responseJson)
      yield put(showError(response, responseJson))
      return
    }
    
    const records = responseJson.records || []
    const totalSize = responseJson.totalSize || records.length
    console.log('casesFetcher saga: Successfully fetched', records.length, 'cases out of', totalSize, 'total')

    yield put(receiveCases(records, totalSize, page, pageSize))
    console.log('casesFetcher saga: Dispatched RECEIVE_CASES action')
  } catch(err) {
    console.error('Cases fetch error: ' + err.message, err.stack)
    yield put(showError({ status: 500, statusText: 'Internal Server Error' }, { message: err.message }))
  }
}
