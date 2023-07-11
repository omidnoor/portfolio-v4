import React, { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import useTypewriter from "react-typewriter-hook";

const texts = ["First text", "Second text"];

const MagicWriter = ({ texts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const textToShow = useTypewriter(texts[textIndex], {
    typingSpeed: 100,
    deleteSpeed: 50,
  });

  useEffect(() => {
    if (textToShow === texts[textIndex]) {
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 2000);
    }
  }, [textToShow, textIndex]);
  return <span>{textToShow}</span>;
};

export default MagicWriter;
