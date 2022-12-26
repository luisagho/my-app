import { useState } from 'react';
import './App.css';
import pokemon from "./pokemon.json";

const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

function App() {
  const [filter, setFilter] = useState("");
  const handleOnChange = (value) => setFilter(value);
  return (
    <div className='container'>
      <h1 className='title'>Pokemon search</h1>
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
          pokemon.slice(0, 20).filter(pokemon =>
            pokemon.name.english.toLowerCase().includes(filter.toLowerCase())).
            map(pokemon =>
              <PokemonRow
                pokemon={pokemon}
                key={pokemon.id}
              />
            )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
