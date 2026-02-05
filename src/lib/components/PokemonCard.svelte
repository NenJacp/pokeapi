<script lang="ts">
	import type { Pokemon } from '$lib/types/pokemon';

	interface Props {
		pokemon: Pokemon;
	}

	let { pokemon }: Props = $props();

	function formatId(id: number): string {
		return `#${id.toString().padStart(3, '0')}`;
	}

	const getTypeColor = (type: string): string => {
		const colors: Record<string, string> = {
			normal: 'from-gray-400 to-gray-500',
			fire: 'from-red-500 to-orange-600',
			water: 'from-blue-500 to-cyan-600',
			electric: 'from-yellow-400 to-yellow-500',
			grass: 'from-green-500 to-emerald-600',
			ice: 'from-cyan-400 to-blue-400',
			fighting: 'from-orange-600 to-red-600',
			poison: 'from-purple-500 to-pink-600',
			ground: 'from-yellow-600 to-amber-700',
			flying: 'from-indigo-400 to-purple-500',
			psychic: 'from-pink-500 to-rose-600',
			bug: 'from-lime-500 to-green-500',
			rock: 'from-yellow-800 to-amber-900',
			ghost: 'from-purple-700 to-indigo-800',
			dragon: 'from-indigo-600 to-purple-700',
			dark: 'from-gray-800 to-gray-900',
			steel: 'from-gray-600 to-slate-700',
			fairy: 'from-pink-300 to-rose-400'
		};
		return colors[type] || 'from-gray-400 to-gray-500';
	};
</script>

<div
	class="bg-[#1e1e1e] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 flex flex-col items-center p-6 border-2 border-[#3e3e3e] hover:border-[#33d6a6] relative overflow-hidden group cursor-pointer"
>
	<!-- Efecto de brillo sutil en hover -->
	<div
		class="absolute inset-0 bg-gradient-to-r from-transparent via-[#33d6a6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"
		style="transition: transform 0.7s ease-in-out;"
	></div>
	<!-- Badge de ID -->
	<span
		class="absolute top-3 right-3 text-xs font-bold text-[#a0a0a0] bg-[#262626] px-2 py-1 rounded-full group-hover:bg-[#33d6a6] group-hover:text-[#161616] transition-colors border border-[#3e3e3e]"
	>
		#{formatId(pokemon.id)}
	</span>

	<!-- Imagen del Pokémon -->
	<div class="mb-4 transform group-hover:scale-110 transition-transform duration-300">
		<img
			src={pokemon.image}
			alt={pokemon.name}
			class="w-36 h-36 object-contain drop-shadow-lg"
		/>
	</div>

	<!-- Nombre -->
	<h2 class="text-xl font-bold capitalize mb-3 text-[#d4d4d4] group-hover:text-[#33d6a6] transition-colors">
		{pokemon.name}
	</h2>

	<!-- Tipos -->
	<div class="flex gap-2 flex-wrap justify-center">
		{#each pokemon.types as type}
			<span
				class="px-4 py-2 text-xs font-bold text-white rounded-full bg-gradient-to-r {getTypeColor(
					type
				)} shadow-lg hover:shadow-xl transform hover:scale-110 transition-all border border-white/20"
			>
				{type}
			</span>
		{/each}
	</div>
</div>
