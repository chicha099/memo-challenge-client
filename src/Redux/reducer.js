const initialState = {
  allMemos: [],
  selectedMemo: {},
  currentSession: {},
  flippedCards: [],
  flippedCardsCounter: 0,
  completedPairs: [],
  totalCounter: 0,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MEMOS":
      return {
        ...state,
        allMemos: action.payload.data.memos,
      };
    case "GET_MEMO_BY_ID":
      return {
        ...state,
        selectedMemo: action.payload.data.memo,
      };
    case "FLIP_CARD":
      return {
        ...state,
        flippedCardsCounter: state.flippedCardsCounter + 1,
        flippedCards: [...state.flippedCards, action.payload],
      };

    case "RESET_FLIPPED_CARDS":
      return {
        ...state,
        flippedCardsCounter: 0,
        flippedCards: [],
        totalCounter: state.totalCounter + 1,
      };

    case "PAIR_COMPLETED":
      return {
        ...state,
        completedPairs: [...state.completedPairs, action.payload],
        flippedCardsCounter: 0,
        flippedCards: [],
        totalCounter: state.totalCounter + 1,
      };
    case "CREATE_MEMO":
      return state;
    case "CREATE_SESSION":
      sessionStorage.setItem(
        "sessionId",
        JSON.stringify({
          id: action.payload.data.createGameSession.id,
          memoId: action.payload.data.createGameSession.memoId,
        })
      );
      return {
        ...state,
        currentSession: action.payload.data.createGameSession,
      };
    case "GET_SESSION":
      return {
        ...state,
        currentSession: action.payload.data.gamesessions,
        completedPairs: action.payload.data.gamesessions.completedPairs,
      };
    case "UPDATE_SESSION":
      return {
        ...state,
        currentSession: action.payload.data.updateGameSession,
      };
    case "DELETE_SESSION":
      return {
        ...state,
        currentSession: {},
      };
    case "EMPTY_SELECTED_MEMO":
      return {
        ...state,
        selectedMemo: {},
      };
    case "EMPTY_COMPLETED_PAIRS":
      return {
        ...state,
        completedPairs: [],
      };
    default:
      return state;
  }
}
