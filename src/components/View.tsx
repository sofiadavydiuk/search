import { useEffect, useState } from 'react';
import React from 'react';

interface Pockemon {
  name: string;
  url: string;
  [key:string]: string;
}

interface SelectedPockemon {
  name: string;
  height: number;
  sprites: {
    front_shiny: string;
  }
}

const View = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<Pockemon[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchParam] = useState<string[]>(["url", "name"]);
  const [selectedPockemon, setSelectedPockemon] = useState<SelectedPockemon | null>(null)
 
  const fetchSelectedPockemon = (url: string) => {
    fetch(url).then((res)=> res.json())
    .then(
      (result) => {
      setSelectedPockemon(result)
      },
   (error) => {
    setError(error)
    })
}
  useEffect(() => {
    const savedSearchParam = localStorage.getItem('searchTerm')

    if (savedSearchParam){
      setInputValue(savedSearchParam)
    }


    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result?.results);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);
  
  const handleSearch = () => {
    localStorage.setItem('searchTerm', inputValue)
  }


  const search = (items: Pockemon[], searchParam: string[], inputValue: string) => {
    return items.filter((item: Pockemon) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString()
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
        <div className='search-wrapper'>
        <span className="sr-text">Search pockemons here</span>
          <label htmlFor="search">
            <input
              type="search"
              name="search-form"
              id="search-form"
              value={inputValue}
              onChange={(e) => { setInputValue(e.target.value); }}
            />
            <button onClick={handleSearch}>Search</button>
          </label>
        </div>

        <div>
          {search(items, searchParam, inputValue).map((pokemon, index) => (
            <div onClick={() => fetchSelectedPockemon(pokemon.url)} key={index}>{pokemon.name}</div>
          ))}
          </div>
        { selectedPockemon && (
        <div>
          <h2>{selectedPockemon.name}</h2>
          <img src={selectedPockemon.sprites.front_shiny} alt="" />
          <p>{selectedPockemon.height}</p>
         </div>
        )}
        </>
        
  
    );
  }
};

export default View;