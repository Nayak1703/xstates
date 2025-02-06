import React, { useState, useEffect } from "react";
import "./Location.css";

const Location = () => {
  const [countrySelected, SetCountrySelected] = useState("");
  const [stateSelected, SetStateSelected] = useState("");
  const [citySelected, SetCitySelected] = useState("");

  const [countryList, SetCountryList] = useState([]);
  const [stateList, SetStateList] = useState([]);
  const [cityList, SetCityList] = useState([]);

  const fetchList = async (url, funcName) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      funcName(data);
    } catch (error) {
      console.log("Error while fetching", error);
    }
  };

  const handleCountryChange = (e) => {
    SetCountrySelected(e.target.value);
  };

  const handleStateChange = (e) => {
    SetStateSelected(e.target.value);
  };

  const handleCityChange = (e) => {
    SetCitySelected(e.target.value);
  };

  useEffect(
    () =>
      fetchList(
        "https://crio-location-selector.onrender.com/countries",
        SetCountryList
      ),
    []
  );

  useEffect(() => {
    if (countrySelected) {
      fetchList(
        `https://crio-location-selector.onrender.com/country=${countrySelected}/states`,
        SetStateList
      );
    }
  }, [countrySelected]);

  useEffect(() => {
    if (countrySelected && stateSelected)
      fetchList(
        `https://crio-location-selector.onrender.com/country=${countrySelected}/state=${stateSelected}/cities`,
        SetCityList
      );
  }, [countrySelected, stateSelected]);

  return (
    <div className="parent">
      <h1 className="heading">Select Location</h1>

      <div className="dropDownParent">
        <select
          name="countries"
          defaultValue="Select Country"
          onChange={handleCountryChange}
          className="countryDropDown"
        >
          <option value="Select Country" disabled>
            Select Country
          </option>
          {countryList.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          name="States"
          defaultValue="Select State"
          onChange={handleStateChange}
          disabled={!countrySelected}
          className="stateDropDown"
        >
          <option value="Select State" disabled>
            Select State
          </option>
          {stateList.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          name="cities"
          defaultValue="Select City"
          onChange={handleCityChange}
          disabled={!stateSelected}
          className="citiesDropDown"
        >
          <option value="Select City" disabled>
            Select City
          </option>
          {cityList.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {citySelected && (
        <h2>
          You selected <span className="cityName">{citySelected}</span>,{" "}
          <span className="grayText">
            {stateSelected}, {countrySelected}
          </span>
        </h2>
      )}
    </div>
  );
};

export default Location;
