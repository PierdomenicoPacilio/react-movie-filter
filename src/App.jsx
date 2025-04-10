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
  const [newFilm, setNewFilm] = useState("")
  const [newFilmGenre, setNewFilmGenre] = useState("")


  // USE EFFECT DEL FILTRO 
  useEffect(() => {
    let filteredFilms = filmsArray
    if (selectedGenre !== "") {
      filteredFilms = filmsArray.filter(film => film.genre === selectedGenre)
    }
    if (selectedFilm !== "") {
      filteredFilms = filteredFilms.filter(film => film.title.toLocaleLowerCase().includes(selectedFilm.toLowerCase()))
    }
    setFilms(filteredFilms)
  }, [selectedGenre, selectedFilm])

  const addNewFilm = (newFilm, newFilmGenre) => {
    if (newFilm === '' || newFilmGenre === '') {
      return
    }
    const newFilmObject = {
      title: newFilm,
      genre: newFilmGenre
    }
    const updatedFilms = [...films, newFilmObject]
    setFilms(updatedFilms)
    setNewFilm('')
    setNewFilmGenre('')
  }



  return (
    <>
      <h1>React Movie Filter</h1>
      <label>filtra per genere</label>
      <div>
        <select onChange={(event) => setSelectedGenre(event.target.value)} value={selectedGenre}>
          <option value="">---</option>
          {filmsArray.map(film =>
            <option>{film.genre}</option>)}
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
        {films.length === 0 && <p>Nessun film trovato 😢</p>}
      </ul>
      <form onSubmit={(event) => {
        event.preventDefault()
        addNewFilm(newFilm, newFilmGenre)
      }}>
        <h3>Inserisci un nuovo film nella lista</h3>
        <label>Inserisci titolo del nuovo film</label>
        <div>
          <input
            type="text"
            value={newFilm}
            onChange={(event) => setNewFilm(event.target.value)} />
        </div>
        <label>Inserisci genere del nuovo film</label>
        <div>
          <input
            type="text"
            value={newFilmGenre}
            onChange={(event) => setNewFilmGenre(event.target.value)} />
        </div>
        <button>aggiungi film</button>
      </form>
    </>
  )
}

export default App