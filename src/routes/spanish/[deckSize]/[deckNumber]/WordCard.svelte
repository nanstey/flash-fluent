<script lang="ts">
	export let word;
	export let speak;
	export let side;
</script>

{#if side === 'spanish'}
	<div class="card w-96 bg-primary text-primary-content shadow-lg">
		<div class="card-body flex justify-center">
			<div class="card-title mx-auto">
				<button on:click={speak}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 mt-2 ml-0">
						<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
						<path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
					</svg>
				</button>
				<h1 class="text-6xl ">{word.spanish}</h1>
			</div>
		</div>
	</div>
{:else}
	<div class="card w-96 bg-zinc-200 text-primary shadow-lg">
		<div class="card-body flex justify-center">
			<div class="card-title mx-auto">
				<h1 class="text-6xl ">{word.english}</h1>
			</div>
		</div>
	</div>
{/if}
