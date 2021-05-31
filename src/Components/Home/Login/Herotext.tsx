import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const messages = ["Conversations", "Stories", "Talking"];

const HeroText: React.FC = () => {
  const [text, setText] = useState(messages[0]);
  const [active, setActive] = useState(true);

  const variants = {
    initial: {
      x: "-100%",
    },
    animate: {
      x: 0,
    },
    exit: {
      x: "100%",
    },
  };

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setActive(false);
      setActive(true);
      setText(messages[i % messages.length]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledHeroText>
      <p>LET THE</p>
      {active && (
        <motion.p
          className="bold"
          variants={variants}
          initial="initial"
          animate="animate"
        >
          {text}
        </motion.p>
      )}
      <p>BEGIN</p>
    </StyledHeroText>
  );
};

const StyledHeroText = styled.div`
  font-family: var(--fontHeading);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 400;
  color: white;

  line-height: 1.1;

  text-transform: uppercase;

  .bold {
    font-weight: 700;
  }
`;

export default HeroText;
