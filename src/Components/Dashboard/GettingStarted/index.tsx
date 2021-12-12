import { motion } from "framer-motion"
import { useState } from "react"
import { useRef } from "react"
import styled from "@emotion/styled"
import Page1 from "./Page1"
import Page2 from "./Page2"

const GettingStarted = () => {
  const pagesRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const formData = useRef(new FormData())

  const variants = {
    initial: {
      opacity: 0,
      PointerEvent: "none",
    },
    animate: {
      opacity: 1,
      PointerEvent: "auto",
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  }

  return (
    <StyledGettingStarted
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="pageContainer">
        {loading && (
          <div className="loaderContainer">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div className="blob"></div> <div className="blob"></div>
        <div ref={pagesRef} className="pages">
          <Page1 formData={formData.current} pagesRef={pagesRef} />
          <Page2 formData={formData.current} setLoading={setLoading} />
        </div>
      </div>
    </StyledGettingStarted>
  )
}

const StyledGettingStarted = styled(motion.section)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);

  z-index: 5;

  display: grid;
  place-items: center;

  --pageWidth: 50vw;
  --pageHeight: 60vh;
  --paddingRight: 2em;
  .pageContainer {
    width: var(--pageWidth);
    height: var(--pageHeight);
    padding: 2.5em var(--paddingRight);

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(to top, #2b5876, #4e4376);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25),
      -4px -4px 10px rgba(0, 0, 0, 0.25);

    border-radius: 25px;

    overflow: hidden;

    position: relative;

    .loaderContainer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);

      backdrop-filter: blur(2px);

      display: grid;
      place-items: center;

      z-index: 10;
      .loader {
        display: flex;

        > * + * {
          margin-left: 1em;
        }
        span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff8;

          animation: load 1s ease-out infinite alternate;

          :nth-of-type(2) {
            animation-delay: 0.25s;
          }
          :nth-of-type(3) {
            animation-delay: 0.5s;
          }
          :nth-of-type(4) {
            animation-delay: 0.75s;
          }
        }

        @keyframes load {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-10px);
          }
        }
      }
    }

    .blob {
      position: absolute;

      background: linear-gradient(to right, #ffefba, #ffffff);
      opacity: 0.2;

      z-index: 0;

      :nth-of-type(1) {
        top: -10%;
        right: -5%;
        width: calc(var(--pageHeight) / 1.5);
        height: calc(var(--pageHeight) / 1.5);

        border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
      }

      &:nth-of-type(2) {
        bottom: -10%;
        left: 5%;
        width: calc(var(--pageHeight) / 2.25);
        height: calc(var(--pageHeight) / 2.5);
        border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
      }
    }
    .pages {
      opacity: 0.999;
      width: calc(2 * var(--pageWidth));
      height: 100%;
      display: flex;

      z-index: 2;

      transition: transform ease 100ms;

      > * + * {
        margin-left: calc(2 * var(--paddingRight));
      }
    }
  }
`

export default GettingStarted
