import { useEffect, useState } from "react";

const View = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchParam] = useState(["url", "name"]);

  useEffect(() => {
    const savedSearchParam = localStorage.getItem("searchTerm");

    if (savedSearchParam) {
      setInputValue(savedSearchParam);
    }

    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result?.results);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        },
      );
  }, []);
  const handleSearch = () => {
    localStorage.setItem("searchTerm", inputValue);
  };

  function search(items) {
    return items.filter((item: object) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(inputValue.toLowerCase()) > -1
        );
      });
    });
  }

  if (error) {
    return <div>{error?.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="search-wrapper">
          <span className="sr-text">Search pockemons here</span>
          <label htmlFor="search">
            <input
              type="search"
              name="search-form"
              id="search-form"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button onClick={handleSearch}>Search</button>
          </label>
        </div>
        <div>
          {search(items).map((pokemon, index) => (
            <div key={index}>{pokemon.name}</div>
          ))}
        </div>
      </>
    );
  }
};

export default View;
