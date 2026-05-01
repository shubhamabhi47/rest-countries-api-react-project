import { useState, useEffect } from "react";
import "./CountryDetail.css";
import CountryDetailShimmer from "./CountryDetailShimmer";
import { Link, useParams, useNavigate } from "react-router";
import { useTheme } from "../hooks/useTheme";

export default function CountryDetail() {
  const params = useParams();
  const countryName = params.country;
  const navigate = useNavigate();

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isDark] = useTheme();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        const borders = data.borders || [];

        setCountryData({
          flag: data.flags?.svg || "No flag available",
          name: data.name?.common || "Unknown",
          nativeName: data.name?.nativeName
            ? Object.values(data.name.nativeName)[0]?.common || data.name.common
            : data.name.common,
          population: data.population?.toLocaleString("en-IN") || "N/A",
          region: data.region || "None",
          subregion: data.subregion || "None",
          capital: (data.capital || []).join(", ") || "No capital",
          topLevelDomain: data.tld?.join(", ") || "None",
          currencies: data.currencies
            ? Object.values(data.currencies)
                .map((c) => c.name)
                .join(", ")
            : "None",
          languages: data.languages
            ? Object.values(data.languages).join(", ")
            : "None",
          borders: [],
        });

        Promise.all(
          borders.map((border) =>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([b]) => b.name.common),
          ),
        ).then((allBordersName) => {
          setCountryData((prev) => ({ ...prev, borders: allBordersName }));
        });
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) return <h1>Country Not Found</h1>;

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryData.name} Flag`} />
            <div>
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: </b>
                  <span>{countryData.nativeName}</span>
                </p>
                <p>
                  <b>Population: </b>
                  <span>{countryData.population}</span>
                </p>
                <p>
                  <b>Region: </b>
                  <span>{countryData.region}</span>
                </p>
                <p>
                  <b>Sub Region: </b>
                  <span>{countryData.subregion}</span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span>{countryData.capital}</span>
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  <span>{countryData.topLevelDomain}</span>
                </p>
                <p>
                  <b>Currencies: </b>
                  <span>{countryData.currencies}</span>
                </p>
                <p>
                  <b>Languages: </b>
                  <span>{countryData.languages}</span>
                </p>
              </div>
              {countryData.borders.length > 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
