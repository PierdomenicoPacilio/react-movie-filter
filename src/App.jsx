import { useState } from "react"
import { useEffect } from "react"

function App() {

  const filmsArray = [
    { title: 'Inception', genre: 'Fantascienza' },
    { title: 'Il Padrino', genre: 'Thriller' },
    { title: 'Titanic', genre: 'Romantico' },
    { title: 'Batman', genre: 'Azione' },
    { title: 'Interstellar', genre: 'Fantascienza' },
    { title: 'Pulp Fiction', genre: 'Thriller' },
  ]

  const [films, setFilms] = useState(filmsArray)
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedFilm, setSelectedFilm] = useState("")

  useEffect(() => {
    let filteredFilms = filmsArray
    if (selectedGenre !== "") {
      filteredFilms = filmsArray.filter(film => film.genre === selectedGenre)
    }
    if (selectedFilm !== "") {
      filteredFilms = filteredFilms.filter(film => film.title.includes(selectedFilm))
    }
    setFilms(filteredFilms)
  }, [selectedGenre, selectedFilm])



  return (
    <>
      <h1>React Movie Filter</h1>
      <label>filtra per genere</label>
      <div>
        <select onChange={(event) => setSelectedGenre(event.target.value)} value={selectedGenre}>
          <option value="">---</option>
          <option>Fantascienza</option>
          <option>Thriller</option>
          <option>Romantico</option>
          <option>Azione</option>
        </select>
      </div>
      <label>filtra per nome</label>
      <div>
        <input
          type="text"
          value={selectedFilm}
          onChange={(event) => setSelectedFilm(event.target.value)} />
      </div>
      <ul>
        {films.map((film, index) =>
          <li key={index}>
            <h4>{film.title}</h4>
            <p>{film.genre}</p>
          </li>)}
      </ul>
    </>
  )
}

export default App