import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
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

const pokemonReducer = (state = {
  pokemon: [],
  filter: "",
  selectedPokemon: null
}, action) => {
  switch (action.type) {
    case "SET_POKEMON":
      return {

        // Returns a new object with an attr modified
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
      return state;
  }
}

const store = createStore(pokemonReducer);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/my-app/pokemon.json").
      then(response => response.json()).
      then(data => dispatch({
        type: "SET_POKEMON",
        payload: data
      }));
  }, []);

  return (
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
  );
}

/* Wappring App as it cannot both provide and use the store */
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
