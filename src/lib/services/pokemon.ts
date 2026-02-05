import type { Pokemon, PokemonResponse, PokemonDetails } from '$lib/types/pokemon';

export class PokemonApiError extends Error {
	constructor(message: string, public status?: number) {
		super(message);
		this.name = 'PokemonApiError';
	}
}

export const getPokemons = async (): Promise<Pokemon[]> => {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=999');
		if (!response.ok) {
			throw new PokemonApiError(
				`Error al obtener la lista de Pokémon: ${response.statusText}`,
				response.status
			);
		}
		const data: PokemonResponse = await response.json();

		const detailedPokemonPromises = data.results.map(async (pokemon) => {
			try {
				const pokemonResponse = await fetch(pokemon.url);
				if (!pokemonResponse.ok) {
					throw new PokemonApiError(
						`Error al obtener detalles de ${pokemon.name}: ${pokemonResponse.statusText}`,
						pokemonResponse.status
					);
				}
				const pokemonDetails: PokemonDetails = await pokemonResponse.json();

				return {
					id: pokemonDetails.id,
					name: pokemonDetails.name,
					image:
						pokemonDetails.sprites.other['official-artwork'].front_default ||
						pokemonDetails.sprites.front_default,
					types: pokemonDetails.types.map((t) => t.type.name)
				};
			} catch (detailError) {
				console.error(`Error fetching details for ${pokemon.name}:`, detailError);
				throw detailError;
			}
		});

		const pokemons = await Promise.all(detailedPokemonPromises);
		return pokemons;
	} catch (error) {
		if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
			throw new PokemonApiError(
				'No se pudo conectar con la PokéAPI. Revisa tu conexión a internet.',
				0
			);
		}
		throw error;
	}
};
