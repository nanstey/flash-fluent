<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import WordCard from './WordCard.svelte';

	export let data: PageData;
	const { words } = data; 

	let wordCounter = -1;
	let currentWord = words[wordCounter] ?? null;

	$: {
		currentWord = words[wordCounter] ?? null;
		speak(currentWord?.spanish);
	}

	let side = 'spanish';
	function flipCard() {
		if (side === 'spanish') {
			side = 'english';
		} else {
			side = 'spanish';
		}
	}

	function nextCard() {
		wordCounter += 1;
		side = 'spanish'
	}

	let correctCount = 0;
	let wrongCount = 0;

	function correct() {
		return correctCount += 1;
	}

	function wrong() {
		return wrongCount += 1;
	}

	// sound engine
	let synth: SpeechSynthesis;
	onMount(() => {
		synth = window.speechSynthesis;
	});

	function speak(word: string) {
		if (!word || !synth) return;
		const spanishWord = new SpeechSynthesisUtterance(word);
		spanishWord.lang = "es-MX";
		synth.speak(spanishWord);
	}

	function reset() {
		wordCounter = 0;
		correctCount = 0;
		wrongCount = 0;
	}

	function replayWrongCards() {
		// todo
	}

	function nextDeck() {
		// todo
	}

</script>


<div class="mt-10 mx-auto">
	{#if wordCounter === -1}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="card w-96 bg-accent text-neutral hover:cursor-pointer hover:shadow-lg transform transition-transform  hover:scale-105" on:click={nextCard}>
			<div class="card-body flex justify-center">
				<div class="card-title mx-auto">
					<h1 class="text-6xl">START</h1>
				</div>
			</div>
		</div>
	{:else if currentWord}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click={flipCard}>
			<WordCard word={currentWord} side={side} speak={() => speak(currentWord.spanish)} />
		</div>
	{:else}
		<div class="w-96 flex justify-evenly">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="card max-w-xs w-42 bg-zinc-200 text-neutral hover:cursor-pointer hover:shadow-lg transform transition-transform  hover:scale-105" on:click={reset}>
				<div class="card-body flex justify-center">
					<div class="card-title mx-auto">
						<h1 class="text-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
							</svg>
						</h1>
					</div>
				</div>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="card max-w-xs w-42 bg-error text-neutral hover:cursor-pointer hover:shadow-lg transform transition-transform  hover:scale-105" on:click={replayWrongCards}>
				<div class="card-body flex justify-center">
					<div class="card-title mx-auto">
						<h1 class="text-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6-6m0 0l6 6m-6-6v12a6 6 0 01-12 0v-3" />
							</svg>
						</h1>
					</div>
				</div>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="card max-w-xs bg-success text-neutral hover:cursor-pointer hover:shadow-lg transform transition-transform  hover:scale-105" on:click={nextDeck}>
				<div class="card-body flex justify-center">
					<div class="card-title mx-auto">
						<h1 class="text-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
							</svg>
						</h1>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="w-96 mt-8">
		<div class="flex justify-center space-x-4">
			{#if currentWord}
				<h1 class="text-4xl text-success mt-1">{correctCount}</h1>
			{/if}
			<button 
				class="btn btn-success hover:shadow-md hover:scale-105"
				disabled={!currentWord}
				on:click={() => correct() && nextCard()}
			>Got it!</button>
			<button 
				class="btn btn-error hover:shadow-md hover:scale-105" 
				disabled={!currentWord}
				on:click={() => wrong() && nextCard()}
			>Woops!</button>
			{#if currentWord}
				<h1 class="text-4xl text-error mt-1">{wrongCount}</h1>
			{/if}
			
		</div>
	</div>
</div>
