import { useContext } from 'react';
import styled from '@emotion/styled';
import PokemonContext from '../PokemonContext';

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

/* Renders a search filter */
const PokemonFilter = () => {

  // First change the arrow function to a regular function with return value
  // Then call the global context using deconstruction 
  const { filter, handleOnChange } = useContext(PokemonContext);
  return (
    <Input
      value={filter}
      onChange={event => handleOnChange(event.target.value)}
    />
  );
}

export default PokemonFilter;
