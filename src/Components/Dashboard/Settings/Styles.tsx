import styled from "styled-components"

export const StyledSection = styled.section`
  width: 100%;
  padding: 2em;
  font-family: var(--fontContent);

  --labelFontSize: 1.1em;
  --labelFontWeight: 400;
  --labelColor: #b8b8b8;

  --inputFontSize: 1em;
  --inputFontWeight: 300;
  --inputColor: rgba(255, 255, 255, 0.8);
  --inputMargin: 0.5em 0;

  --infoFontSize: 0.8em;
  --infoColor: rgba(221, 221, 221, 0.7);
`

export const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 2.5em;
    color: white;
  }
  .line {
    margin-left: 1em;
    flex: 1;
    height: 1px;
    background: linear-gradient(to bottom, #fff, transparent);
  }
`
export const StyledContent = styled.div`
  margin-top: 2em;
  width: 100%;
  padding: 2em;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);

  .form {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    width: 100%;
    padding: 1em 1.5em;

    & > *:not(.modal) {
      margin: 1em 0;
    }

    .label {
      font-size: var(--labelFontSize);
      text-transform: uppercase;
      color: var(--labelColor);
      font-weight: var(--labelFontWeight);
    }

    .info {
      font-size: var(--infoFontSize);
      color: var(--infoColor);
      font-weight: var(--inputFontWeight);
    }

    .input {
      margin: var(--inputMargin);
      font-family: var(--fontContent);
      font-size: var(--inputFontSize);
      font-weight: var(--inputFontWeight);
      color: var(--inputColor);
    }
  }
`
export const StyledForm = styled.form`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  width: 100%;
  padding: 1em 1.5em;

  & > * {
    margin: 1em 0;
  }

  label,
  .label {
    font-size: var(--labelFontSize);
    text-transform: uppercase;
    color: var(--labelColor);
    font-weight: var(--labelFontWeight);
  }

  .info {
    font-size: var(--infoFontSize);
    color: var(--infoColor);
    font-weight: var(--inputFontWeight);
  }

  input,
  .input,
  textarea {
    margin: var(--inputMargin);
    font-family: var(--fontContent);
    font-size: var(--inputFontSize);
    font-weight: var(--inputFontWeight);
    color: var(--inputColor);
  }
`
export const StyledButton = styled.button`
  box-sizing: content-box;
  border: 0;
  border-radius: 3px;
  padding: 0.65em 1.75em;

  display: grid;
  place-items: center;

  color: white;
  font-size: 0.9em;

  &:focus {
    outline: 0;
  }
`
