import { useEffect, useRef } from "react";
import { HiSearch } from "react-icons/hi";
import styled from "styled-components";

const SearchBar: React.FC<{
  setDisplacement: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ setDisplacement }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current)
      setDisplacement(divRef.current.offsetTop + divRef.current.offsetHeight);
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

    font-size: 1rem;

    input {
      width: 100%;
      background: rgb(16, 16, 16, 0.5);
      border-radius: 5px 0 0 5px;
      padding: 0.35rem 0.5rem;
      font-size: 1em;
      font-family: var(--fontContent);
      color: #bdbdbd;
    }
    button {
      background: rgb(16, 16, 16, 0.5);
      border-radius: 0 5px 5px 0;
      color: #bdbdbd;
      padding: 0.35rem 0.5rem;
      font-size: 1.5em;

      display: grid;
      place-items: center;
    }
  }
`;

export default SearchBar;
