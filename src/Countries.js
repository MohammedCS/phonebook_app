import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [searchResult, setSearchResult] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.status)
        setCountries(response.data)
      })
  }, [])

  const ViewCountry = () => {
    const country = searchResult[0];
    const langList = []
    for (let val in country.languages) {
      langList.push(country.languages[val])
    };

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {
            langList.map(lang =>
              <li key={lang}>{lang}</li>
            )
          }
        </ul>
        <div>
          <img src={country.flags.png} />
        </div>
      </div>
    )
  }


  const Print = () => {
    if (searchResult.length === 0) {
      return (
        <div>
          No matches
        </div>
      )
    }
    else if (searchResult.length === 1) {
      return(
        <ViewCountry />
      )
    }
    else if (searchResult.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>

      )
    }
    else {
      return (
        <div>
          <ul>
            {searchResult.map(count =>
              <li key={count.flags.png}>
                {count.name.common}:
                <button onClick={handleClick}>Show</button>
              </li>)}
          </ul>
        </div>
      )
    }
  }

  const handleSearchChange = (event) => {
    const search = event.target.value.toLowerCase()
    const res = countries.filter(country =>
      country.name.common.toLowerCase().includes(search)
    )
    setSearchResult(res)
    console.log(searchResult.length)
  }

  return (
    <div>
      <form>
        find countries:
        <input onChange={handleSearchChange} />
      </form>
      <Print />
    </div>
  )
}

export default App