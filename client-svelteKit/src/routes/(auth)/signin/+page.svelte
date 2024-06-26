<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let form;

	let email = '';
	let password = '';
</script>

<div class="mt-36 flex items-center justify-center">
	<Card.Root class="w-[450px]">
		<Card.Header>
			<Card.Title>Sign In</Card.Title>
			<Card.Description
				>Do not have an account?
				<a href="/signup" class="text-indigo-500">Sign up</a>
			</Card.Description>
		</Card.Header>
		{#if form}
			<h4 class="text-md mb-3 text-center font-light text-red-600">
				{form.error.message}
			</h4>
		{/if}
		<form method="POST" use:enhance>
			<Card.Content>
				<div class="grid w-full items-center gap-6">
					<div class="flex flex-col space-y-1.5">
						<Label for="email">Email</Label>
						<Input id="email" name="email" bind:value={email} required />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="password">Password</Label>
						<Input id="password" name="password" type="password" bind:value={password} required />
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button class="bg-green-500" type="submit">Sign In</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
