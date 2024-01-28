import { useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useEffect } from "react"
import { useForm } from "../hook/useForm"

const PokemonProvider = ({ children }) => {

  //Estados
  const [allPokemons, setAllPokemons] = useState([])
  const [globalPokemons, setGlobalPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const {valueSearch, onInputChange, onResetForm} = useForm({
    valueSearch: ''
  })

  //Usaré un CustomHook, useForm






  //Estados Simples
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)


  //Llamaré a 50 pokemones a la API
  const getAllPokemons = async (limit = 50) => {
    const baseUrl = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`)
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data

    })
    const results = await Promise.all(promises)

    setAllPokemons([
      ...allPokemons,
      ...results
    ])
    setLoading(false)

  }

  //Llamaré a todos los pokemones
  const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=100000&offset=0`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});

		const results = await Promise.all(promises);

		setGlobalPokemons(results);
		setLoading(false);
	};

  //UseEffect
  useEffect(() => {
    getAllPokemons()
  }, [offset])

  useEffect(() => {
    getGlobalPokemons()
  }, [])

  //BOTON PARA CARGAR MAS 
  const onClickLoadMore = () => {
    setOffset(offset + 50)
  };

  //FILTRAR POKEMONES 
  
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });
  
  const [filteredPokemons, setfilteredPokemons] = useState([])

  const handleCheckbox = e => {

    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked
    })

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter(pokemon => pokemon.types.map(type => type.type.name)
      .includes(e.target.name));

      setfilteredPokemons([...filteredPokemons, ...filteredResults])
    } else {
      const filteredResults = filteredPokemons.filter(pokemon => !pokemon.types.map(type => type.type.name)
      .includes(e.target.name));

      setfilteredPokemons([...filteredResults])
    }

  }


  //Llamar a pokemones por ID

  const getAllPokemonByID = async (id) => {

    const baseUrl = 'https://pokeapi.co/api/v2/'
    const res = await fetch(`${baseUrl}pokemon/${id}`)
    const data = await res.json();
    return data


  }


  return (
    <PokemonContext.Provider value={{
      valueSearch,
      onInputChange,
      onResetForm,
      allPokemons,
      globalPokemons,
      getAllPokemonByID,
      onClickLoadMore,  
      setLoading,
      loading,
      //Para la barra de filtros 
      active,
      setActive,
      //Para filtrar pokemones por el tipo
      handleCheckbox,
      filteredPokemons,
    }}>
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider
