import { createContext, useState, useEffect } from "react"
import { starterNoteDataArray } from "../data/starterNoteData"

const NoteContext = createContext({})
export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notesList")) || starterNoteDataArray)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [pinnedSearchResults, setPinnedSearchResults] = useState([])
  const [unpinnedSearchResults, setUnpinnedSearchResults] = useState([])
  const [selectedNoteId, setSelectedNoteId] = useState("")
  const [selectedNote, setSelectedNote] = useState([])

  // Initialize notes if user has previously local storage data for application
  useEffect(() => {
    localStorage.setItem("notesList", JSON.stringify(notes))
  }, [notes])

  // Filter results based on search term
  useEffect(() => {
    const filteredResults = notes.filter((note) => note.body.toLowerCase().includes(search.toLowerCase()) || note.title.toLowerCase().includes(search.toLowerCase()))
    setSearchResults(filteredResults)
  }, [notes, search])

  // Filter search results based if pinned
  useEffect(() => {
    const filteredResults = searchResults.filter((note) => note.pinned === true)
    setPinnedSearchResults(filteredResults)
  }, [notes, searchResults])

  // Filter search results based if unpinned
  useEffect(() => {
    const filteredResults = searchResults.filter((note) => note.pinned !== true)
    setUnpinnedSearchResults(filteredResults)
  }, [notes, searchResults])

  useEffect(() => {
    const filteredResult = notes.filter((note) => note.id === selectedNoteId)
    if (filteredResult.length === 1) {
      setSelectedNote(filteredResult[0])
    }
  }, [notes, selectedNoteId])

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        search,
        setSearch,
        searchResults,
        pinnedSearchResults,
        unpinnedSearchResults,
        selectedNoteId,
        setSelectedNoteId,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export default NoteContext
