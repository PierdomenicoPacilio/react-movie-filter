import { useState, useEffect } from "react"

function App() {
  const initialFilms = [
    { title: 'Inception', genre: 'Fantascienza' },
    { title: 'Il Padrino', genre: 'Thriller' },
    { title: 'Titanic', genre: 'Romantico' },
    { title: 'Batman', genre: 'Azione' },
    { title: 'Interstellar', genre: 'Fantascienza' },
    { title: 'Pulp Fiction', genre: 'Thriller' },
  ]


  // inizializzo due usestate, uno per l'iterazione in pagina e uno
  // per l'aggiunta del film e che scatena l'iterazione in pagina.
  // Se ne usassi slo uno entrerei in un loop perchè rigenerando la
  // pagina cambierebbe e al cambiare rigenererebbe la pagina ecc.
  const [allFilms, setAllFilms] = useState(initialFilms)
  const [films, setFilms] = useState(initialFilms)


  // inizializzo due usestate per i due filtri
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedFilm, setSelectedFilm] = useState("")

  // inizializzo due usestate per la funzione che aggiunge un nuovo film
  const [newFilm, setNewFilm] = useState("")
  const [newFilmGenre, setNewFilmGenre] = useState("")


  // useEffect ci serve per rigenerare la lista in pagina, quindi per vedere
  // sia un'aggiunta di un film, sia l'uso dei due filtri
  useEffect(() => {
    let filteredFilms = allFilms

    // filtri
    if (selectedGenre !== "") {
      filteredFilms = filteredFilms.filter(film => film.genre === selectedGenre)
    }
    if (selectedFilm !== "") {
      filteredFilms = filteredFilms.filter(film =>
        film.title.toLowerCase().includes(selectedFilm.toLowerCase()))
    }

    setFilms(filteredFilms)
  }, [selectedGenre, selectedFilm, allFilms])

  // funzione per aggiungere un nuovo film alla lista
  const addNewFilm = () => {
    if (newFilm === '' || newFilmGenre === '') return

    const newFilmObject = {
      title: newFilm,
      genre: newFilmGenre
    }

    const updatedAllFilms = [...allFilms, newFilmObject]
    setAllFilms(updatedAllFilms)
    setNewFilm('')
    setNewFilmGenre('')
  }

  return (
    <>
      <h1>React Movie Filter 🎬</h1>

      <label>Filtra per genere</label>
      <div>
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="">---</option>
          {/* genero ogni volta una nuova lista di array di generi, evitando le ripetizioni, e 
          su questa itero per creare la lista dei generi da poter selezionare */}
          {[...new Set(allFilms.map(film => film.genre))].map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <label>Filtra per nome</label>
      <div>
        <input
          type="text"
          value={selectedFilm}
          onChange={(e) => setSelectedFilm(e.target.value)}
        />
      </div>

      <ul>
        {films.map((film, index) => (
          <li key={index}>
            <h4>{film.title}</h4>
            <p>{film.genre}</p>
          </li>
        ))}
        {films.length === 0 && <p>Nessun film trovato 😢</p>}
      </ul>

      <form onSubmit={e => (e.preventDefault(), addNewFilm())}>
        <h3>Aggiungi un nuovo film 🍿</h3>
        <label>Titolo</label>
        <input
          type="text"
          value={newFilm}
          onChange={(e) => setNewFilm(e.target.value)}
        />
        <label>Genere</label>
        <input
          type="text"
          value={newFilmGenre}
          onChange={(e) => setNewFilmGenre(e.target.value)}
        />
        <button>Aggiungi film</button>
      </form>
    </>
  )
}

export default App
