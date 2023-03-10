import { useSelector } from "react-redux";

/* Rendes a table with a pokemon stats */
const PokemonInfo = () => {
  const selectedPokemon = useSelector(state => state.selectedPokemon);

  // Renders a pokemon info only if it's selected
  return selectedPokemon ? (
    <div>
      <h1>{selectedPokemon.name.english}</h1>
      <table>

        {/* Way to iterate over an object */}
        {Object.keys(selectedPokemon.base).map(key => (
          <tr key={key}>
            <td>{key}</td>

            {/* Getting the value */}
            <td>{selectedPokemon.base[key]}</td>
          </tr>
        ))}
      </table>
    </div>
  ) : null;
}

export default PokemonInfo;
