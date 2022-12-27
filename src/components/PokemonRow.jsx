import { Button } from '@mui/material';

/* Renders an entry in the pokemon table */
const PokemonRow = ({ pokemon, handleOnClick }) => (
  <tr>
    <td>{pokemon.name.english}</td>

    {/* Joining array of types */}
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button
        onClick={() => handleOnClick(pokemon)}
        variant="contained">
        SHOW INFO
      </Button>
    </td>
  </tr>
);

export default PokemonRow;
