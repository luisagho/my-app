import { useState } from 'react';
import './App.css';
import pokemon from "./pokemon.json";

/* Renders an entry in the pokemon table */
const PokemonRow = ({ pokemon, handleOnClick }) => (
  <tr>
    <td>{pokemon.name.english}</td>

    {/* Joining array of types */}
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => handleOnClick(pokemon)}>
        Select
      </button>
    </td>
  </tr>
);

/* Rendes a table with a pokemon stats */
const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>

      {/* Way to iterate over an object */}
      {Object.keys(base).map(key => (
        <tr key={key}>
          <td>{key}</td>

          {/* Getting the value */}
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

export default function App() {
  const [filter, setFilter] = useState("");
  const handleOnChange = (value) => setFilter(value);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const handleOnClick = (pokemon) => setSelectedPokemon(pokemon);

  return (
    <div className='container'>
      <h1 className='title'>Pokemon search</h1>
      <div className='table'>
        <div>
          <input
            value={filter}
            onChange={event => handleOnChange(event.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
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
                    handleOnClick={handleOnClick}
                  />
                )}
            </tbody>
          </table>
        </div>

        {/* Rendering a pokemon info using the short-circuit operator */}
        {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
      </div>
    </div>
  );
}
