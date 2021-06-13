import { useEffect } from "react"
import { useRef } from "react"
import { HiSearch } from "react-icons/hi"
import styled from "styled-components"

const SearchBar: React.FC<{
  setSearchBarBottom: React.Dispatch<React.SetStateAction<number | undefined>>
}> = ({ setSearchBarBottom }) => {
  const searchBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchBarRef.current)
      setSearchBarBottom(searchBarRef.current.getBoundingClientRect().bottom)
  }, [setSearchBarBottom])

  return (
    <StyledSearchBar ref={searchBarRef}>
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

  font-size: 1rem;

  margin: 0.5em 0;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;

    input {
      width: 100%;
      background: rgb(16, 16, 16, 0.5);
      border-radius: 5px 0 0 5px;
      padding: 0.35em 0.5em;
      font-size: var(--contactTextSize);
      font-family: var(--fontContent);
      color: #bdbdbd;
    }
    button {
      background: rgb(16, 16, 16, 0.5);
      border-radius: 0 5px 5px 0;
      color: #bdbdbd;
      padding: 0.35em 0.5em;
      font-size: calc(var(--contactTextSize) * 1.5);

      display: grid;
      place-items: center;
    }
  }
`

export default SearchBar
