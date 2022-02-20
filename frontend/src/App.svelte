<script>
	
	import { onMount} from 'svelte';
	let msg;

	onMount(async () => {
		const response = await fetch('http://127.0.0.1:5000/hello');
		const message = await response.json();
		msg = message.msg;
	});

</script>


<h3>{msg} + svelte</h3>