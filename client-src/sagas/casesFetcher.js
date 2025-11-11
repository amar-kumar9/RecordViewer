import { call, put } from 'redux-saga/effects'
import { receiveCases } from '../actions'

// Fetch current user id from userinfo then query Cases owned by that user.
export default function* casesFetcher(action) {
  const { creds, page, pageSize } = action
  const instanceUrl = creds.instanceUrl
  const accessToken = creds.accessToken

  try {
    // fetch user info to get user id
    const userInfoResp = yield call(fetch, instanceUrl + '/services/oauth2/userinfo', { method: 'GET', headers: { 'Authorization': 'Bearer ' + accessToken }})
    const userInfo = yield userInfoResp.json()
    const userId = userInfo.user_id || userInfo.userId || userInfo.id

    const offset = (page - 1) * pageSize
    const soql = `SELECT Id, CaseNumber, Subject FROM Case WHERE OwnerId = '${userId}' ORDER BY CreatedDate DESC LIMIT ${pageSize} OFFSET ${offset}`
    const qUrl = instanceUrl + '/services/data/v43.0/query?q=' + encodeURIComponent(soql)

    const req = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }

    const response = yield call(fetch, qUrl, req)
    if (!response || !response.ok) {
      const text = yield response.text()
      console.error('Cases query failed: ' + response.status + ' ' + text)
      yield put(receiveCases([], 0, page, pageSize))
      return
    }
    const responseJson = yield response.json()
    const records = responseJson.records || []
    const totalSize = responseJson.totalSize || records.length

    yield put(receiveCases(records, totalSize, page, pageSize))
  } catch(err) {
    console.error('Cases fetch error: ' + JSON.stringify(err))
  }
}
