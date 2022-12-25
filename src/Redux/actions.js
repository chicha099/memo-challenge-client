import axios from "axios";
let backendURL = "http://127.0.0.1:8000/graphql";

export function getAllMemoTests() {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `
        query {
          memos {
            id
            name
            images
          }
        }`,
      })
      .then((response) => {
        return dispatch({
          type: "GET_MEMOS",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getMemoById(id) {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `
        query {
          memo(id: ${id}) {
            id
            name
            images
          }
        }`,
      })
      .then((response) => {
        return dispatch({
          type: "GET_MEMO_BY_ID",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createMemo(payload) {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `
        mutation {
          createMemo(name:"${payload.name}", images:${JSON.stringify(
          payload.images
        )}){
              name
              images
              id
          }
      }`,
      })
      .then((response) => {
        return dispatch({
          type: "CREATE_MEMO",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function editMemo(payload) {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `
        mutation {
          updateMemo(id: ${payload.id},name:"${
          payload.name
        }", images:${JSON.stringify(payload.images)}){
              name
              images
              id
          }
      }`,
      })
      .then((response) => {
        return dispatch({
          type: "EDIT_MEMO",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteMemo(payload) {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `
        mutation {
          deleteMemo(id: ${payload}){
              name
              images
              id
          }
      }`,
      })
      .then((response) => {
        return dispatch({
          type: "EDIT_MEMO",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createSession(payload) {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `
        mutation {
          createGameSession(memoId: ${payload.id}, retries: 0, numberOfPairs: ${payload.images.length}, state: Started, completedPairs: []){
              id
              memoId
              retries
              numberOfPairs
              state
              completedPairs
          }
      }`,
      })
      .then((response) => {
        
        return dispatch({
          type: "CREATE_SESSION",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function getSessionById(payload) {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `{
          gamesessions(id: ${payload}){
            id
            memoId
            retries
            numberOfPairs
            state
            completedPairs
          }
        }`,
      })
      .then((response) => {
    
        return dispatch({
          type: "GET_SESSION",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateSession(payload) {
  return function (dispatch) {
    return axios
      .post(backendURL, {
        query: `
        mutation {
          updateGameSession(id: ${payload.id}, retries: ${
          payload.retries
        }, numberOfPairs: ${payload.numberOfPairs}, state: ${
          payload.state
        }, completedPairs: ${JSON.stringify(payload.completedPairs)}){
              id
              memoId
              retries
              numberOfPairs
              state
              completedPairs
          }
      }`,
      })
      .then((response) => {
        
        return dispatch({
          type: "UPDATE_SESSION",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteSession(payload) {
  
  return function (dispatch) {
    console.log(payload, "payload")
    return axios
      .post(backendURL, {
        query: `
        mutation {
          deleteGameSession(id: ${payload}){
            id
          }
      }`,
      })
      .then((response) => {
      
        return dispatch({
          type: "DELETE_SESSION",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}
export function flipCard(card) {
  return {
    type: "FLIP_CARD",
    payload: card,
  };
}

export function resetFlippedCards() {
  return {
    type: "RESET_FLIPPED_CARDS",
  };
}

export function completePair(card) {
  return {
    type: "PAIR_COMPLETED",
    payload: card,
  };
}

export function emptySelectedMemo() {
  
  return {
    type: "EMPTY_SELECTED_MEMO",
  };
}

export function emptyCompletedPairs() {
  return {
    type: "EMPTY_COMPLETED_PAIRS",
  };
}