const error = (state = {errorType: 'NONE', responseJson: undefined, errorCode: undefined, message: undefined, errors: undefined, fieldErrors: undefined}, action) => {
  switch (action.type) {
    case 'SHOW_ERROR': {
      let response = action.response;
      let responseJson = action.responseJson;
      if (response.status === 404) {
        return {errorType: 'NOT_FOUND' };
      } else if (response.status === 400) {
        if (Array.isArray(responseJson)) {
          // General error.
          return {
            errorType: 'PAGE',
            errorCode: responseJson[0].errorCode,
            message: responseJson[0].message,
            errors: undefined,
            fieldErrors: undefined};
        } else {
          // Record error.
          return {
            errorType: 'RECORD',
            errorCode: undefined,
            message: responseJson.message,
            errors: responseJson.output.errors,
            fieldErrors: responseJson.output.fieldErrors};
        }
      } else {
        // Treat as a page error
        let message = 'An unknown error occurred';
        if (responseJson && responseJson.message) {
          message = responseJson.message;
        } else if (response.statusText) {
          message = response.statusText;
        }
        return {
          errorType: 'PAGE',
          errorCode: response.status,
          message: message,
          errors: undefined,
          fieldErrors: undefined
        };
      }
    }
    case 'CLEAR_ERROR':
      return {errorType: 'NONE', responseJson: undefined, errorCode: undefined, message: undefined, errors: undefined, fieldErrors: undefined};
    default:
      return state;
  }
}

export default error
