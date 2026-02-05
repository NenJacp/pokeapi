<script lang="ts">
	import type { Pokemon } from '$lib/types/pokemon';

	interface Props {
		pokemons: Pokemon[];
		filteredCount: number;
		searchText: string;
		selectedTypes: string[];
		notOperator: boolean;
	}

	let {
		pokemons,
		filteredCount,
		searchText = $bindable(''),
		selectedTypes = $bindable<string[]>([]),
		notOperator = $bindable(false)
	}: Props = $props();

	// Obtener tipos únicos de todos los Pokémon
	const allTypes = $derived(
		Array.from(new Set(pokemons.flatMap((p) => p.types))).sort()
	);

	function toggleType(type: string) {
		if (selectedTypes.includes(type)) {
			selectedTypes = selectedTypes.filter((t) => t !== type);
		} else {
			selectedTypes = [...selectedTypes, type];
		}
	}

	function clearFilters() {
		searchText = '';
		selectedTypes = [];
		notOperator = false;
	}
</script>

<div
	class="bg-[#1e1e1e] shadow-xl rounded-2xl p-6 mb-8 sticky top-4 z-10 border border-[#3e3e3e]"
>
	<div class="flex flex-col gap-5">
		<!-- Input de Texto -->
		<div class="flex-1">
			<label
				for="search"
				class="block text-sm font-semibold text-[#d4d4d4] mb-2 flex items-center gap-2"
			>
				Buscar por Nombre o Número
			</label>
			<input
				id="search"
				type="text"
				bind:value={searchText}
				placeholder="Ej: Bulbasaur o 1"
				class="w-full px-5 py-3 bg-[#161616] border-2 border-[#3e3e3e] rounded-xl focus:ring-4 focus:ring-[#33d6a6]/30 focus:border-[#33d6a6] outline-none transition-all text-[#d4d4d4] placeholder:text-[#6e6e6e] hover:border-[#5e6ad2]"
			/>
		</div>

		<!-- Selector de Tipos (Selección Múltiple) -->
		<div class="flex-1">
			<div class="block text-sm font-semibold text-[#d4d4d4] mb-3 flex items-center gap-2">
				Filtrar por Tipos
			</div>
			<div
				class="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-4 border-2 border-[#3e3e3e] rounded-xl bg-[#161616]"
			>
				{#each allTypes as type}
					<button
						type="button"
						onclick={() => toggleType(type)}
						class="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105 {selectedTypes.includes(
							type
						)
							? 'bg-[#33d6a6] text-[#161616] shadow-lg ring-2 ring-[#33d6a6]/50'
							: 'bg-[#262626] text-[#d4d4d4] hover:bg-[#3e3e3e] border border-[#3e3e3e]'}"
					>
						{type}
					</button>
				{/each}
			</div>
		</div>

		<!-- Switch NOT y Botón Limpiar -->
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[#3e3e3e]">
			<label
				class="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-[#262626] transition-colors"
			>
				<div class="relative">
					<input
						type="checkbox"
						bind:checked={notOperator}
						class="w-6 h-6 text-[#33d6a6] bg-[#161616] border-2 border-[#3e3e3e] rounded-lg focus:ring-4 focus:ring-[#33d6a6]/30 cursor-pointer transition-all"
					/>
				</div>
				<span class="text-sm font-semibold text-[#d4d4d4] group-hover:text-[#33d6a6]">
					Operador NOT (Excluir)
				</span>
			</label>
			<button
				type="button"
				onclick={clearFilters}
				class="px-5 py-2.5 text-sm font-medium bg-[#262626] text-[#d4d4d4] rounded-xl hover:bg-[#3e3e3e] transition-all border border-[#3e3e3e] hover:border-[#5e6ad2] transform hover:scale-105 flex items-center gap-2"
			>
				Limpiar Filtros
			</button>
		</div>

		<!-- Contador de Resultados -->
		<div
			class="text-sm font-semibold text-[#d4d4d4] bg-[#262626] px-5 py-3 rounded-xl border-2 border-[#3e3e3e] flex items-center justify-center gap-2"
		>
			<span class="font-bold text-[#33d6a6]">{filteredCount}</span>
			<span class="text-[#a0a0a0]">de</span>
			<span class="font-bold text-[#33d6a6]">{pokemons.length}</span> Pokémon
		</div>
	</div>
</div>
