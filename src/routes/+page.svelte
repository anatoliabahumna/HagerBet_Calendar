<script lang="ts">
import { viewDate, getMonthDays, ethiopianMonths, ethiopianMonthYear, convertGregorian, convertEthiopian } from '$lib/calendar';
import { fade } from 'svelte/transition';

let gInput = '';
let eDay = 1;
let eMonth = 1;
let eYear = 2017;

$: gOutput = convertGregorian(gInput);
$: eOutput = convertEthiopian(eYear, eMonth, eDay);

$: current = $viewDate;
$: monthDays = getMonthDays(current);
$: gLabel = current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
$: eLabel = ethiopianMonthYear(current);
$: keyLabel = `${current.getFullYear()}-${current.getMonth()}`;
</script>

<section class="flex flex-col items-center gap-4">
  <h2 class="sr-only">Calendar navigation</h2>
  <div class="flex items-center gap-2">
    <button class="btn" on:click={viewDate.prev} aria-label="Previous month">&lt;</button>
    <div class="text-lg font-medium">{gLabel} / {eLabel}</div>
    <button class="btn" on:click={viewDate.next} aria-label="Next month">&gt;</button>
    <button class="btn" on:click={viewDate.today}>Today</button>
  </div>

  {#key keyLabel}
  <div class="grid grid-cols-7 gap-1 sm:gap-2 w-full max-w-xl" transition:fade>
    {#each ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] as w}
      <div class="text-center font-medium text-gray-500 dark:text-gray-400">{w}</div>
    {/each}
    {#each monthDays as day}
      {#if day}
        <div class={`h-20 p-2 card flex flex-col items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${day.isToday ? 'bg-primary text-white' : ''}`}>
          <div>{day.date.getDate()}</div>
          <div class="text-xs opacity-70">{day.ethiopian.day}</div>
        </div>
      {:else}
        <div class="h-20 p-2"></div>
      {/if}
    {/each}
  </div>
  {/key}
</section>

<section class="card p-6 mt-10 w-full max-w-md mx-auto space-y-6">
  <div>
    <h2 class="text-lg font-semibold mb-2">Gregorian to Ethiopian</h2>
    <label class="sr-only" for="gInput">Gregorian date</label>
    <input id="gInput" type="date" bind:value={gInput} class="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
    {#if gOutput}<p class="mt-2 font-medium text-primary" aria-live="polite">{gOutput}</p>{/if}
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-2">Ethiopian to Gregorian</h2>
    <div class="flex gap-2">
      <label class="sr-only" for="eDay">Day</label>
      <input id="eDay" type="number" min="1" max="30" bind:value={eDay} class="w-16 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
      <label class="sr-only" for="eMonth">Month</label>
      <select id="eMonth" bind:value={eMonth} class="flex-1 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        {#each ethiopianMonths as m, i}
          <option value={i+1}>{m}</option>
        {/each}
      </select>
      <label class="sr-only" for="eYear">Year</label>
      <input id="eYear" type="number" bind:value={eYear} class="w-24 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
    </div>
    {#if eOutput}<p class="mt-2 font-medium text-primary" aria-live="polite">{eOutput}</p>{/if}
  </div>
</section>
