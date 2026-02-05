<script lang="ts">
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import SuperBuscador from '$lib/components/SuperBuscador.svelte';
	import type { PageData } from './$types';
	import type { Pokemon } from '$lib/types/pokemon';

	const { data }: { data: PageData } = $props();

	let searchText = $state('');
	let selectedTypes = $state<string[]>([]);
	let notOperator = $state(false);

	// Función de reintento
	function retry() {
		window.location.reload();
	}

	// Función de filtrado compuesta
	const filteredPokemons = $derived.by(() => {
		if (data.error || !data.pokemons) {
			return [];
		}
		let filtered: Pokemon[] = data.pokemons;

		// Filtro de texto (nombre o número)
		if (searchText.trim()) {
			const searchLower = searchText.toLowerCase().trim();
			filtered = filtered.filter((pokemon) => {
				const matchesName = pokemon.name.toLowerCase().includes(searchLower);
				const matchesId = pokemon.id.toString().includes(searchLower);
				const matches = matchesName || matchesId;

				return notOperator ? !matches : matches;
			});
		}

		// Filtro de tipos
		if (selectedTypes.length > 0) {
			filtered = filtered.filter((pokemon) => {
				const hasSelectedType = selectedTypes.some((type) =>
					pokemon.types.includes(type)
				);
				return notOperator ? !hasSelectedType : hasSelectedType;
			});
		}

		return filtered;
	});
</script>

{#if data.error}
	<div
		class="bg-[#1e1e1e] border-2 border-[#ff6b6b] rounded-2xl p-8 shadow-xl max-w-2xl mx-auto animate-fade-in"
	>
		<div class="flex flex-col items-center text-center">
			<div
				class="bg-[#ff6b6b] rounded-full p-4 mb-4 shadow-lg transform hover:scale-110 transition-transform"
			>
				<span class="text-5xl">⚠️</span>
			</div>
			<h3 class="text-2xl font-bold text-[#ff6b6b] mb-3">¡Oops! Algo salió mal</h3>
			<p class="text-[#d4d4d4] mb-6 text-lg">{data.error}</p>
			<button
				type="button"
				onclick={retry}
				class="inline-flex items-center px-6 py-3 bg-[#ff6b6b] text-white font-semibold rounded-xl hover:bg-[#ff5252] focus:outline-none focus:ring-4 focus:ring-[#ff6b6b]/30 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
			>
				<span class="mr-2 text-xl">🔄</span>
				Reintentar
			</button>
		</div>
	</div>
{:else if data.pokemons && data.pokemons.length > 0}
	<SuperBuscador
		pokemons={data.pokemons}
		filteredCount={filteredPokemons.length}
		bind:searchText
		bind:selectedTypes
		bind:notOperator
	/>

	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
	>
		{#each filteredPokemons as pokemon, index (pokemon.id)}
			<div
				class="card-enter"
				style="animation-delay: {index * 0.05}s;"
			>
				<PokemonCard {pokemon} />
			</div>
		{/each}
	</div>

	{#if filteredPokemons.length === 0 && (searchText.trim() || selectedTypes.length > 0)}
		<div class="text-center py-20 animate-fade-in">
			<div
				class="inline-block bg-[#1e1e1e] rounded-full p-8 mb-6 shadow-lg transform hover:scale-110 transition-transform border border-[#3e3e3e]"
			>
				<span class="text-7xl">🔍</span>
			</div>
			<h3 class="text-2xl font-bold text-[#d4d4d4] mb-3">
				No se encontraron resultados
			</h3>
			<p class="text-[#a0a0a0] text-lg mb-6">
				Intenta ajustar tus filtros de búsqueda
			</p>
			<button
				type="button"
				onclick={() => {
					searchText = '';
					selectedTypes = [];
					notOperator = false;
				}}
				class="inline-flex items-center px-5 py-2.5 bg-[#33d6a6] text-[#161616] font-semibold rounded-xl hover:bg-[#2ec493] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
			>
				<span class="mr-2 text-lg">❌</span>
				Limpiar Filtros
			</button>
		</div>
	{/if}
{/if}
