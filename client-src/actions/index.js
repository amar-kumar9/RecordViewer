export const finishLogin = (accessToken, instanceUrl) => {
  return {
    type: 'FINISH_LOGIN',
    accessToken,
    instanceUrl
  }
}

export const fetchEntities = (creds) => {
  return {
    type: 'FETCH_ENTITIES',
    creds
  }
}

export const fetchRecentItems = (creds) => {
  return {
    type: 'FETCH_RECENT_ITEMS',
    creds
  }
}

export const fetchCases = (creds, page=1, pageSize=10) => {
  return {
    type: 'FETCH_CASES',
    creds,
    page,
    pageSize
  }
}

export const receiveCases = (cases, totalSize, page, pageSize) => {
  return {
    type: 'RECEIVE_CASES',
    cases,
    totalSize,
    page,
    pageSize,
    receivedAt: Date.now()
  }
}

export const fetchCaseFeed = (creds, caseId) => {
  return {
    type: 'FETCH_CASE_FEED',
    creds,
    caseId
  }
}

export const receiveCaseFeed = (caseId, feedItems) => {
  return {
    type: 'RECEIVE_CASE_FEED',
    caseId,
    feedItems,
    receivedAt: Date.now()
  }
}

export const postCaseFeed = (creds, caseId, message) => {
  return {
    type: 'POST_CASE_FEED',
    creds,
    caseId,
    message
  }
}

export const receiveNewFeedItem = (caseId, item) => {
  return {
    type: 'RECEIVE_NEW_FEED_ITEM',
    caseId,
    item,
    receivedAt: Date.now()
  }
}

export const receiveEntities = (entities) => {
  return {
    type: 'RECEIVE_ENTITIES',
    entities,
    receivedAt: Date.now()
  }
}

export const updateFormFactor =(formFactor, recordId) => {
  return {
    type: 'UPDATE_FORM_FACTOR',
    formFactor,
    recordId
  }
}

export const updateHeaderRecordId = (recordId) => {
  return {
    type: 'UPDATE_HEADER_RECORD_ID',
    recordId
  }
}

export const fetchCreateDefaults = (creds, apiName, context) => {
  return {
    type: 'FETCH_CREATE_DEFAULTS',
    creds,
    apiName,
    context
  }
}

export const fetchCloneDefaults = (creds, id, context) => {
  return {
    type: 'FETCH_CLONE_DEFAULTS',
    creds,
    id,
    context
  }
}

export const receiveCreateDefaults = (defaults) => {
  return {
    type: 'RECEIVE_CREATE_DEFAULTS',
    defaults
  }
}

export const receiveCloneDefaults = (defaults) => {
  return {
    type: 'RECEIVE_CLONE_DEFAULTS',
    defaults
  }
}

export const receiveRecentItems = (recentItems) => {
  return {
    type: 'RECEIVE_RECENT_ITEMS',
    recentItems,
    receivedAt: Date.now()
  }
}

export const fetchRecord = (creds, recordId, context) => {
  return {
    type: 'FETCH_RECORD',
    creds,
    recordId,
    context
  }
}

export const receiveRecord = (recordId, record) => {
  return {
    type: 'RECEIVE_RECORD',
    recordId,
    record,
    receivedAt: Date.now()
  }
}

export const clearRecord = () => {
  return {
    type: 'CLEAR_RECORD'
  }
}

export const deleteRecord = (creds, recordId) => {
  return {
    type: 'DELETE_RECORD',
    creds,
    recordId
  }
}

export const saveRecord = (creds, recordId, objectInfo, editValues) => {
  return {
    type: 'SAVE_RECORD',
    creds,
    recordId,
    objectInfo,
    editValues
  }
}

export const createRecord = (creds, apiName, objectInfo, editValues) => {
  return {
    type: 'CREATE_RECORD',
    creds,
    apiName,
    objectInfo,
    editValues
  }
}

export const recordCreateSuccess = (recordData) => {
  return {
    type: 'RECORD_CREATE_SUCCESS',
    recordData
  }
}

export const finishedRecordDelete = () => {
  return {
    type: 'FINISHED_RECORD_DELETE'
  }
}

export const editRecord = (creds, apiName, recordType) => {
  return {
    type: 'EDIT_RECORD',
    creds,
    apiName,
    recordType
  }
}

export const updateFieldValue = (field, value) => {
  return {
    type: 'UPDATE_FIELD_VALUE',
    field,
    value
  }
}

export const updateDepGraphFieldValue = (field, value, editValues, picklists, modalFields, fieldTree) => {
  return {
    type: 'UPDATE_DEP_GRAPH_FIELD_VALUE',
    field,
    value,
    picklists,
    modalFields,
    editValues,
    fieldTree
  }
}

export const updatePicklistFields = (picklistFields) => {
  return {
    type: 'UPDATE_PICKLIST_FIELDS',
    picklistFields
  }
}

export const recordUpdateSuccess = (recordData) => {
  return {
    type: 'RECORD_UPDATE_SUCCESS',
    recordData
  }
}

export const fetchPicklists = (creds, apiName, recordType) => {
  return {
    type: 'FETCH_PICKLISTS',
    creds,
    apiName,
    recordType
  }
}

export const receivePicklists = (url, result) => {
  return {
    type: 'RECEIVE_PICKLISTS',
    url,
    result
  }
}

export const editDepGraph = (picklists, modalFields, editValues, fieldTree, prevMode) => {
  return {
    type: 'EDIT_DEP_GRAPH',
    picklists,
    modalFields,
    editValues,
    fieldTree,
    prevMode
  }
}

export const closeDepGraph = (mode) => {
  return {
    type: 'CLOSE_DEP_GRAPH',
    mode
  }
}

export const showError = (response, responseJson) => {
  return {
    type: 'SHOW_ERROR',
    response,
    responseJson
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}
