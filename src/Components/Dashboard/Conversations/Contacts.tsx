import styled from "styled-components"
import { useUser } from "../../../Providers/UserProvider"
import Contact from "./Contact"

const Contacts: React.FC<{
  searchBarBottom: number | undefined
}> = ({ searchBarBottom }) => {
  // const contacts = [
  //   {
  //     name: "Andrea	Bell",
  //     message:
  //       "Sed eget sem molestie, iaculis arcu vitae, ultrices tortor. Nullam rhoncus, sapien quis suscipit lobortis.",
  //   },
  //   {
  //     name: "Guss",
  //     message:
  //       "        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum pariatur odio vel sequi dignissimos mollitia.",
  //   },
  //   {
  //     name: "Sally King",
  //     message:
  //       "Nullam suscipit aliquam libero, vitae suscipit augue ultrices sit amet. Curabitur eu malesuada nibh, a.",
  //   },
  //   {
  //     name: "Wendy	Lewis",
  //     message:
  //       "Proin sed metus a est fermentum eleifend id sed quam. Aliquam nec mi at orci.",
  //   },
  //   {
  //     name: "Dylan	Oliver",
  //     message:
  //       "Proin hendrerit arcu feugiat turpis feugiat, non tristique purus commodo. Orci varius natoque penatibus et.",
  //   },
  //   {
  //     name: "Leonard Metcalfe",
  //     message:
  //       "Duis at lacus vel velit placerat egestas. Nullam tortor orci, iaculis vel pretium nec, efficitur.",
  //   },
  //   {
  //     name: "Sophie	Mills",
  //     message:
  //       "Maecenas sit amet elit quam. Maecenas commodo velit at odio dictum finibus. Maecenas molestie finibus.",
  //   },
  //   {
  //     name: "Kylie White",
  //     message:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem  quisquam blanditiis eligendi similique assumenda impedit.",
  //   },
  //   {
  //     name: "John Cena",
  //     message: "My time is now!!.",
  //   },
  //   {
  //     name: "Guss",
  //     message:
  //       "        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum pariatur odio vel sequi dignissimos mollitia.",
  //   },
  //   {
  //     name: "Sally King",
  //     message:
  //       "Nullam suscipit aliquam libero, vitae suscipit augue ultrices sit amet. Curabitur eu malesuada nibh, a.",
  //   },
  // ]

  const { contacts } = useUser()

  return (
    <StyledContacts theme={{ top: searchBarBottom }}>
      <ul>
        {contacts &&
          contacts.map((contact, index) => (
            <Contact key={index} contact={contact} />
          ))}
      </ul>
    </StyledContacts>
  )
}

const StyledContacts = styled.div`
  width: 100%;
  height: ${props => window.innerHeight - props.theme.top - 15}px;
  flex: 1;
  ul {
    width: 100%;
    height: 100%;
    overflow: hidden auto;

    list-style-type: none;

    border-radius: 5px;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    background: rgba(16, 16, 16, 0.2);
    .selected {
      transform: scale(1.05);
      background: linear-gradient(
        to right,
        rgba(255, 226, 89, 0.5),
        rgba(255, 167, 81, 0.5)
      );
    }
  }
`

export default Contacts
