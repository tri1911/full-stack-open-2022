import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h4>languages:</h4>

      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="flag" width={100} />

      <Weather city={country.capital} />
    </div>
  );
};

export default Country;
