import type { PageLoad } from './$types';
import { getPokemons, PokemonApiError } from '$lib/services/pokemon';

export const load: PageLoad = async () => {
	try {
		const pokemons = await getPokemons();
		return {
			pokemons,
			error: null
		};
	} catch (error) {
		let errorMessage = 'Error desconocido al cargar los Pokémon';

		if (error instanceof PokemonApiError) {
			errorMessage = error.message;
		} else if (error instanceof Error) {
			errorMessage = error.message;
		}

		return {
			pokemons: [],
			error: errorMessage
		};
	}
};
