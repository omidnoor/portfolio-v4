import React, { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import useTypewriter from "react-typewriter-hook";

const texts = ["First text", "Second text"];

const MagicWriter = ({ texts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const textToShow = useTypewriter(texts[textIndex], {
    typingSpeed: 300,
    deleteSpeed: 300,
  });

  useEffect(() => {
    if (textToShow === texts[textIndex]) {
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 1000);
    }
  }, [textToShow, textIndex]);
  return <span>{textToShow}</span>;
};

export default MagicWriter;
