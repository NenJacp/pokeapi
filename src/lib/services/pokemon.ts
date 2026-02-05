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
				'No pudimos cargar los Pokémon en este momento. Por favor, intenta de nuevo más tarde.',
				response.status
			);
		}
		const data: PokemonResponse = await response.json();

		const detailedPokemonPromises = data.results.map(async (pokemon) => {
			try {
				const pokemonResponse = await fetch(pokemon.url);
				if (!pokemonResponse.ok) {
					throw new PokemonApiError(
						'Hubo un problema al cargar algunos Pokémon. Por favor, intenta de nuevo.',
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
				'No pudimos conectarnos con el servidor. Por favor, verifica tu conexión a internet e intenta de nuevo.',
				0
			);
		}
		throw error;
	}
};
