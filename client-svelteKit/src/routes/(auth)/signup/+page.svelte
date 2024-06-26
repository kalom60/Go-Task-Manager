<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<div class="mt-36 flex items-center justify-center">
	<Card.Root class="w-[450px]">
		<Card.Header>
			<Card.Title>Sign Up</Card.Title>
			<Card.Description
				>Already have an account?
				<a href="/signin" class="text-indigo-500">Sign In</a>
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-6">
					<div class="flex flex-col space-y-1.5">
						<Label for="username">Username</Label>
						<Input id="name" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="email">Email</Label>
						<Input id="email" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="password">Password</Label>
						<Input id="password" />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<Button class="bg-green-500">Sign Up</Button>
		</Card.Footer>
	</Card.Root>
</div>
