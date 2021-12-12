import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"

const messages =
  window.innerWidth > 500
    ? ["Conversations", "Stories", "Talking", "Gossip"]
    : ["Stories", "Talking", "Gossip"]

const HeroText: React.FC = () => {
  const [text, setText] = useState(messages[0])
  const [changeText, setChangeText] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setChangeText(false)
      setChangeText(true)
      setText(messages[i % messages.length])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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
  }

  return (
    <StyledHeroText>
      <div className="text">
        <p>LET THE</p>
        {changeText && (
          <motion.p variants={variants} initial="initial" animate="animate">
            <strong>{text}</strong>
          </motion.p>
        )}
        <p>BEGIN</p>
      </div>
    </StyledHeroText>
  )
}

const StyledHeroText = styled.div`
  padding: 0 var(--padding);
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  .text {
    font-family: var(--fontHeading);
    font-size: clamp(3.5rem, 7vw, 5.5rem);
    color: white;

    line-height: 1.1;

    text-transform: uppercase;
  }
`

export default HeroText
