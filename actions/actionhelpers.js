/**
 * this is a generic function that dispatches actions that require and API call
 * the first arg is the data the first action is dispatched with
 * the second is config object with info for the fetch API call
 * the third is an object containing the initial, success and fail actions/callbacks and the error msg
 */
import { Toast } from "native-base";
const PUSH_ENDPOINT = `http://api.leedder.com/api`;
// thunk action creator, returns a function that dispatches getFeed and then 
export default function genericAsyncActionDispatcher(data, req, cb) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(cb.initial(data))
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    const ENDPOINT = `${PUSH_ENDPOINT}/${req.url}`;
    fetch(ENDPOINT, {
      method: req.method,
      headers: {
        Accept: 'application/json',
      },
      data: req.method == 'POST' ? req.data : null
    }).then((response) => response.json()).then(data => {
      // We can dispatch many times!
      // Here, we update the app state with the results of the API call.
      console.log(cb.successMsg, data);
      cb.success && dispatch(cb.success(data));
    },
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing a loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => {
        console.log('An error occurred.', error);
        Toast.show({
          text: cb.errorMsg,
          position: 'bottom',
          duration: 2000
        });
        cb.fail && dispatch(cb.fail(error));
      }
    )
  }
}