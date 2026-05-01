import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([]);
  const [notFound, setNotFound] = useState(false);

 
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setCountriesData(data))
      .catch(() => setNotFound(true));
  }, []);

  if (notFound) return <h1>Countries data not found</h1>;

  if (!countriesData.length) {
    return <CountriesListShimmer />
  }

  return (
    <div className="countries-container">
      {countriesData
        .filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        )
        .map((country) => (
          <CountryCard
            key={country.cca3}
            flag={country.flags.svg}
            countryName={country.name.common}
            population={country.population?.toLocaleString("en-IN") ?? "N/A"}
            region={country.region ?? "N/A"}
            capital={country.capital?.[0] ?? "N/A"}
          />
        ))}
    </div>
  );
}
