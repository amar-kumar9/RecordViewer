import { call, put } from 'redux-saga/effects'
import { receiveCaseFeed, receiveNewFeedItem } from '../actions'

export function* fetchCaseFeed(action) {
  const { creds, caseId } = action
  const instanceUrl = creds.instanceUrl
  const accessToken = creds.accessToken

  const url = instanceUrl + '/services/data/v43.0/chatter/feeds/record/' + caseId + '/feed-elements'
  const req = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'X-Chatter-Entity-Encoding': false
    }
  }
  try {
    const resp = yield call(fetch, url, req)
    if (!resp || !resp.ok) {
      const text = yield resp.text()
      console.error('Case feed fetch failed: ' + resp.status + ' ' + text)
      yield put(receiveCaseFeed(caseId, []))
      return
    }
    const json = yield resp.json()
    const items = json.elements || json.items || []
    yield put(receiveCaseFeed(caseId, items))
  } catch(err) {
    console.error('Case feed fetch error: ' + JSON.stringify(err))
  }
}

export function* postCaseFeed(action) {
  const { creds, caseId, message } = action
  const instanceUrl = creds.instanceUrl
  const accessToken = creds.accessToken

  const url = instanceUrl + '/services/data/v43.0/chatter/feeds/record/' + caseId + '/feed-elements'
  const body = JSON.stringify({ body: { messageSegments: [{ type: 'Text', text: message }] } })
  const req = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'X-Chatter-Entity-Encoding': false
    },
    body: body
  }

  try {
    const resp = yield call(fetch, url, req)
    if (!resp || !resp.ok) {
      const text = yield resp.text()
      console.error('Post case feed failed: ' + resp.status + ' ' + text)
      return
    }
    const json = yield resp.json()
    // The created feed element may be in json; append to feed
    yield put(receiveNewFeedItem(caseId, json))
  } catch(err) {
    console.error('Post case feed error: ' + JSON.stringify(err))
  }
}

export default { fetchCaseFeed, postCaseFeed }
