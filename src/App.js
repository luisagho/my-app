import { useEffect, useState } from 'react';
import './App.css';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const Title = styled.h1`
  text-align: center;
`;

const Th = styled.th`
  text-align: left;
  font-size: large;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: "1rem";
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

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
        Select
      </Button>
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

  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/my-app/pokemon.json").
      then(response => response.json()).
      then(data => setPokemon(data));
  }, []);

  return (
    <Container>
      <Title>Pokemon search</Title>
      <TwoColumnLayout>
        <div>
          <Input
            value={filter}
            onChange={event => handleOnChange(event.target.value)}
          />
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
                    handleOnClick={handleOnClick}
                  />
                )}
            </tbody>
          </table>
        </div>

        {/* Rendering a pokemon info using the short-circuit operator */}
        {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
      </TwoColumnLayout>
    </Container>
  );
}
