import { HiSearch } from "react-icons/hi"
import styled from "@emotion/styled"

const SearchBar: React.FC = () => {
  return (
    <StyledSearchBar>
      <form>
        <input type="text" />
        <button>
          <HiSearch />
        </button>
      </form>
    </StyledSearchBar>
  )
}

const StyledSearchBar = styled.div`
  width: 100%;

  margin: clamp(0.3em, 1vw, 0.5em) 0;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;

    input {
      width: 100%;
      background: rgb(16, 16, 16, 0.5);
      border-radius: 5px 0 0 5px;
      padding: 0.35em 0.5em;
      font-size: clamp(0.8em, 2vw, 1rem);
      font-family: var(--fontContent);
      color: #bdbdbd;
    }
    button {
      background: rgb(16, 16, 16, 0.5);
      border-radius: 0 5px 5px 0;
      color: #bdbdbd;
      padding: 0.35em 0.5em;
      font-size: clamp(1em, 2vw, 1.2rem);

      display: grid;
      place-items: center;
    }
  }
`

export default SearchBar
