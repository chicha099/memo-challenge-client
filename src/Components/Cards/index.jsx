import React, { useEffect, useState } from "react";
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
  const [test, setTest] = useState([]);
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

  useEffect(() => {
    let temp = selectedMemo.images.concat(selectedMemo.images);
    let shuffled = temp.sort(() => 0.5 - Math.random());
    setTest(shuffled);
 
  }, [selectedMemo]);
  return (
    <div className="cards">
      {selectedMemo.images &&
        test.map((item, index) => {
          return (
            <Card key={index} id={item + index} image={item} number={index} />
          );
        })}
    </div>
  );
};

export default Cards;
