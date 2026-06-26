import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    fetch(
      "https://api.restcountries.com/countries/v5?response_fields=names.common,flag.emoji,population,region,capital",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setCountriesData(data.data.objects);
      })
      .catch(() => setNotFound(true));
  }, []);

  if (notFound) return <h1>Countries data not found</h1>;

  if (!countriesData.length) {
    return <CountriesListShimmer />;
  }

  // console.log("query =", query);
  // console.log(
  //   "filtered =",
  //   countriesData.filter((country) =>
  //     country.names.common.toLowerCase().includes(query.toLowerCase()),
  //   ).length,
  // );

  return (
    <div className="countries-container">
      {countriesData
        .filter((country) =>
          country.names.common.toLowerCase().includes(query.toLowerCase()),
        )
        .map((country) => (
          <CountryCard
            key={country.names.common}
            flag={country.flag.emoji}
            countryName={country.names.common}
            population={country.population?.toLocaleString("en-IN") ?? "N/A"}
            region={country.region ?? "N/A"}
            capital={country.capital?.[0] ?? "N/A"}
          />
        ))}
    </div>
  );
}
