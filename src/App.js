import styled from '@emotion/styled';
import { useEffect, useReducer, useState } from 'react';
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

const PokemonReducer = (state, action) => {
  switch (action.type) {
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: action.payload
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };
    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedPokemon: action.payload
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(PokemonReducer, {
    pokemon: [],
    filter: "",
    selectedPokemon: null
  });

  useEffect(() => {
    fetch("http://localhost:3000/my-app/pokemon.json").
      then(response => response.json()).
      then(data => dispatch({
        type: "SET_POKEMON",
        payload: data
      }));
  }, []);

  return (

    // Using a global context instead of props drilling
    <PokemonContext.Provider

      // Variables to share using context. See use example in PokemonFilter
      value={{ state, dispatch }}
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
