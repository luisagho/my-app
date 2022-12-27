import styled from '@emotion/styled';
import { useContext } from 'react';
import PokemonContext from '../PokemonContext.js';
import PokemonRow from './PokemonRow.jsx'

const Th = styled.th`
  text-align: left;
  font-size: large;
`;

/* Renders a pokemon table */
const PokemonTable = () => {
  const { state: { pokemon, filter }, dispatch } = useContext(PokemonContext);
  return (
    <table width="100%">
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Type</Th>
        </tr>
      </thead>
      <tbody> {

        // Rendering the first 20 elements (slice) filtered
        pokemon.slice(0, 20).filter(pokemon =>
          pokemon.name.english.toLowerCase().includes(filter.toLowerCase())).
          map(pokemon =>
            <PokemonRow
              pokemon={pokemon}

              // Elements from a lists must have a key
              key={pokemon.id}
              handleOnClick={() => dispatch({
                type: "SET_SELECTED_POKEMON",
                payload: pokemon
              })}
            />
          )}
      </tbody>
    </table>
  );
}

export default PokemonTable;
