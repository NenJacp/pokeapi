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
		let errorMessage = 'Ocurrió un error inesperado. Por favor, intenta recargar la página.';

		if (error instanceof PokemonApiError) {
			errorMessage = error.message;
		} else if (error instanceof Error) {
			errorMessage = 'Algo salió mal. Por favor, intenta de nuevo más tarde.';
		}

		return {
			pokemons: [],
			error: errorMessage
		};
	}
};
