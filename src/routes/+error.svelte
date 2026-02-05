<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-[#161616] p-4">
	<div
		class="bg-[#1e1e1e] border-2 border-[#ff6b6b] rounded-3xl p-10 shadow-2xl max-w-lg w-full text-center animate-fade-in"
	>
		<div class="mb-6 flex justify-center">
			<img
				src="/Error.png"
				alt="Error"
				class="w-32 h-32 object-contain"
			/>
		</div>
		<h1 class="text-5xl font-bold text-[#ff6b6b] mb-4">
			Error {$page.status}
		</h1>
		<p class="text-lg text-[#d4d4d4] mb-4 font-medium">
			Lo sentimos, ha ocurrido un problema al cargar la página.
		</p>
		{#if $page.error?.message}
			<div
				class="bg-[#262626] border-l-4 border-[#ff6b6b] p-4 rounded-lg mb-6 text-left"
			>
				<p class="text-sm text-[#ff6b6b] font-medium">
					{$page.error.message}
				</p>
			</div>
		{/if}
		<a
			href="/"
			class="inline-flex items-center px-6 py-3 bg-[#33d6a6] text-[#161616] font-semibold rounded-xl hover:bg-[#2ec493] focus:outline-none focus:ring-4 focus:ring-[#33d6a6]/30 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
		>
			Volver al inicio
		</a>
	</div>
</div>
