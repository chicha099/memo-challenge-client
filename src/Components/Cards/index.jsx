import React, { useEffect } from "react";
import "./cards.css";
import Card from "../Card/index";
import { useSelector } from "react-redux";
import {
  completePair,
  resetFlippedCards,
  updateSession,
} from "../../Redux/actions";
import { useDispatch } from "react-redux";

const Cards = () => {
  const dispatch = useDispatch();
  const selectedMemo = useSelector((state) => state.selectedMemo);
  const flippedCards = useSelector((state) => state.flippedCards);
  const flippedCardsCounter = useSelector((state) => state.flippedCardsCounter);
  const currentSession = useSelector((state) => state.currentSession);
  useEffect(() => {
    if (flippedCardsCounter === 2) {
      if (flippedCards[0].slice(0, -1) === flippedCards[1].slice(0, -1)) {
        dispatch(completePair(flippedCards[0].slice(0, -1)));
        dispatch(
          updateSession({
            ...currentSession,
            retries: currentSession.retries + 1,
            completedPairs: [
              ...currentSession.completedPairs,
              flippedCards[0].slice(0, -1),
            ],
          })
        );
      } else {
        dispatch(resetFlippedCards());
        dispatch(
          updateSession({
            ...currentSession,
            retries: currentSession.retries + 1,
          })
        );
      }
    }
  }, [flippedCardsCounter]);

  return (
    <div className="cards">
      {selectedMemo.images &&
        selectedMemo.images.concat(selectedMemo.images).map((item, index) => {
          return (
            <Card key={index} id={item + index} image={item} number={index} />
          );
        })}
    </div>
  );
};

export default Cards;
