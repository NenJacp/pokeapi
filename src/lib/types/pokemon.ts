export interface Pokemon {
	id: number;
	name: string;
	image: string;
	types: string[];
}

export interface PokemonListItem {
	name: string;
	url: string;
}

export interface PokemonResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonListItem[];
}

export interface PokemonDetails {
	id: number;
	name: string;
	sprites: {
		front_default: string;
		other: {
			'official-artwork': {
				front_default: string;
			};
		};
	};
	types: {
		type: {
			name: string;
		};
	}[];
}
