import styled from "@emotion/styled"
import { FaTimes } from "react-icons/fa"
import { useEffect, useState } from "react"
import { average } from "color.js"
import { contactI } from "Redux/Slices/Contact.Slice"

const ContactPage: React.FC<{
  contactPageVis: {
    visible: boolean
    contact: contactI | null
  }
  setContactPageVis: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      contact: contactI | null
    }>
  >
}> = ({ contactPageVis, setContactPageVis }) => {
  const [color, setColor] = useState<any>("#d16c6c")

  useEffect(() => {
    if (!contactPageVis.contact || !contactPageVis.visible) {
      setContactPageVis({
        visible: false,
        contact: null,
      })
    }
    ;(async () => {
      const img = document.createElement("img")
      img.src =
        (contactPageVis.contact &&
          contactPageVis.contact.profilePicture.large) ||
        ""

      const newColor = await average(img, {
        amount: 1,
        format: "hex",
      })

      setColor(newColor)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = () => {
    setContactPageVis({
      visible: false,
      contact: null,
    })
  }

  return (
    <StyledContactPage theme={{ bg: color }}>
      <div className="gradient"></div>
      <div className="header">
        <h1>{contactPageVis.contact?.name}</h1>

        <FaTimes onClick={close} />
      </div>
      <main>
        <div className="imgContainer">
          <img src={contactPageVis.contact?.profilePicture.large} alt="" />
        </div>
        <div className="bio">
          <h3>BIO</h3>
          <p></p>
        </div>
      </main>
    </StyledContactPage>
  )
}

const StyledContactPage = styled.section<{ theme: { bg: string } }>`
  position: fixed;
  top: 0;
  left: var(--sideBarWidth);
  width: calc(100vw - var(--sideBarWidth));
  height: 100vh;

  background: ${props => props.theme.bg};
  z-index: 10;

  padding: 2em;
  display: grid;
  grid-template-rows: 10% 80% 10%;

  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, #000);
    backdrop-filter: blur(5px);
    z-index: 1;
  }

  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    width: 100%;

    h1 {
      font-size: 3em;
      font-weight: 900;
      color: white;
      font-family: var(--fontHeading);
    }

    svg {
      font-size: 2.5em;
      color: white;
      cursor: pointer;
    }
  }

  main {
    position: relative;
    z-index: 2;

    align-self: center;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 50vh;

    .imgContainer {
      height: 50vh;
      width: 50vh;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;

        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
      }
    }

    .bio {
      height: 50vh;
      width: 50%;

      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;

      h3 {
        font-family: var(--fontHeading);
        font-size: 2em;
        color: white;
      }

      p {
        width: 100%;
        height: 80%;
        background: rgba(255, 255, 255, 0.45);
        font-family: var(--fontContent);
        border-radius: 10px;
      }
    }
  }
`

export default ContactPage
