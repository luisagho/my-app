import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import './App.css';

import PokemonFilter from './components/PokemonFilter.jsx';
import PokemonInfo from './components/PokemonInfo.jsx';
import PokemonTable from './components/PokemonTable.jsx';
import PokemonContext from './PokemonContext';

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

    // Using a global context instead of props drilling
    <PokemonContext.Provider

      // Variables to share using context. See use example in PokemonFilter
      value={{ filter, handleOnChange, selectedPokemon, handleOnClick, pokemon }}
    >
      <Container>
        <Title>Pokemon search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>

          {/* Rendering a pokemon info using the short-circuit operator */}
          <PokemonInfo />
        </TwoColumnLayout>
      </Container>
    </PokemonContext.Provider>
  );
}
