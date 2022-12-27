import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import './App.css';

import PokemonFilter from './components/PokemonFilter.jsx';
import PokemonInfo from './components/PokemonInfo.jsx';
import PokemonTable from './components/PokemonTable.jsx';

const Title = styled.h1`
  text-align: center;
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
          <PokemonFilter
            value={filter}
            handleOnChange={handleOnChange}
          />
          <PokemonTable pokemon={pokemon} filter={filter} handleOnClick={handleOnClick} />
        </div>

        {/* Rendering a pokemon info using the short-circuit operator */}
        {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
      </TwoColumnLayout>
    </Container>
  );
}
