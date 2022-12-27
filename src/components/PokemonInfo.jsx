/* Rendes a table with a pokemon stats */

// Using destructuring to pass parameters
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

export default PokemonInfo;
