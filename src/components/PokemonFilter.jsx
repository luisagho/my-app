import styled from '@emotion/styled';

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

/* Renders a search filter */
const PokemonFilter = ({ filter, handleOnChange }) => (
  <Input
    value={filter}
    onChange={event => handleOnChange(event.target.value)}
  />
);

export default PokemonFilter;
