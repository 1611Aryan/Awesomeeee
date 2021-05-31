import { useEffect, useRef } from "react";
import { HiSearch } from "react-icons/hi";
import styled from "styled-components";

const SearchBar: React.FC<{
  setContactsHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ setContactsHeight }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current)
      setContactsHeight(divRef.current.offsetTop + divRef.current.offsetHeight);
  });

  return (
    <StyledSearchBar ref={divRef}>
      <form>
        <input type="text" />
        <button>
          <HiSearch />
        </button>
      </form>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  width: 100%;

  font-size: 1rem;

  margin: var(--searchBarMarginT) 0 0.25em;
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
`;

export default SearchBar;
