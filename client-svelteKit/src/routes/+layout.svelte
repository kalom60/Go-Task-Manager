<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher defaultMode={'light'} />
<Toaster richColors closeButton theme="light" />

<slot />

<style></style>
