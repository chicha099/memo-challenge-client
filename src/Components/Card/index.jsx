import React, { useEffect } from "react";
import "./card.css";
import { useDispatch } from "react-redux";
import { flipCard } from "../../Redux/actions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";

const Card = (params) => {
  const dispatch = useDispatch();
  const completedPairs = useSelector((state) => state.completedPairs);
  const [completed, setCompleted] = useState(false);
  const activeCardRef = useRef(null);
  const totalCounter = useSelector((state) => state.totalCounter);
  const flippedCards = useSelector((state) => state.flippedCards);
  const handleFlipCard = (e) => {
    e.currentTarget.classList.toggle("is-flipped");
    dispatch(flipCard(params.id));
  };
  useEffect(() => {
    if (completedPairs.includes(params.image)) {
      activeCardRef.current.classList.add("is-flipped");
      setCompleted(true);
    } else if (totalCounter > 0) {
      activeCardRef.current.classList.add("no-events");
      setTimeout(() => {
        activeCardRef.current.classList.remove("is-flipped");
        activeCardRef.current.classList.remove("no-events");
      }, 800);
    }
  }, [totalCounter]);
  useEffect(() => {
    if (completedPairs.includes(params.image)) {
      activeCardRef.current.classList.add("is-flipped");
    }
  }, [completedPairs]);
  useEffect(() => {
    if (flippedCards.includes(params.id)) {
      activeCardRef.current.classList.add("no-events");
    }
  }, [flippedCards]);
  return (
    <div
      className={`${
        completed ? "completedCard" : ""
      } container container--card`}
    >
      <div
        className="card"
        onClick={(e) => handleFlipCard(e)}
        id="card"
        ref={activeCardRef}
      >
        <div className="card__face card__face--front"><p>{params.number + 1}</p><p className="flip">↶</p></div>
        <div className="card__face card__face--back">
          <img src={params.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
