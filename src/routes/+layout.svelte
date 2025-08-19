<script lang="ts">
        import '../app.css';
        import favicon from '$lib/assets/favicon.svg';

        let { children } = $props();
        const year = new Date().getFullYear();
</script>

<svelte:head>
        <link rel="icon" href={favicon} />
        <title>HagerBet Calendar</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <header class="bg-white dark:bg-gray-800 shadow">
                <div class="max-w-5xl mx-auto p-4 flex items-center justify-between">
                        <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">HagerBet Calendar</h1>
                        <nav class="space-x-4 text-sm">
                                <a href="/" class="text-gray-600 dark:text-gray-300 hover:text-primary">Home</a>
                        </nav>
                </div>
        </header>

        <main class="flex-1 max-w-5xl w-full mx-auto p-4">
                {@render children?.()}
        </main>

        <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                © {year} HagerBet Calendar
        </footer>
</div>
