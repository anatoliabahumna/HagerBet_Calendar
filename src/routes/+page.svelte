<script lang="ts">
import { viewDate, getMonthDays, ethiopianMonths, ethiopianMonthYear, convertGregorian, convertEthiopian } from '$lib/calendar';
import type { DayCell } from '$lib/calendar';

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
</script>

<h1>ቀን መቁጠሪያ</h1>

<section class="nav">
  <button on:click={viewDate.prev}>&lt;</button>
  <div>{gLabel} / {eLabel}</div>
  <button on:click={viewDate.next}>&gt;</button>
  <button on:click={viewDate.today}>Today</button>
</section>

<section class="calendar">
  <div class="grid">
    {#each ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] as w}
      <div class="cell head">{w}</div>
    {/each}
    {#each monthDays as day}
      {#if day}
        <div class="cell {day.isToday ? 'today' : ''}">
          <div class="g">{day.date.getDate()}</div>
          <div class="e">{day.ethiopian.day}</div>
        </div>
      {:else}
        <div class="cell empty"></div>
      {/if}
    {/each}
  </div>
</section>

<section class="convert">
  <h2>Gregorian to Ethiopian</h2>
  <input type="date" bind:value={gInput} />
  {#if gOutput}<p class="result">{gOutput}</p>{/if}

  <h2>Ethiopian to Gregorian</h2>
  <div class="ethiopian-inputs">
    <input type="number" min="1" max="30" bind:value={eDay} />
    <select bind:value={eMonth}>
      {#each ethiopianMonths as m, i}
        <option value={i+1}>{m}</option>
      {/each}
    </select>
    <input type="number" bind:value={eYear} />
  </div>
  {#if eOutput}<p class="result">{eOutput}</p>{/if}
</section>

<style>
  h1 { text-align:center; margin:1rem 0; }
  .nav { display:flex; gap:0.5rem; justify-content:center; align-items:center; margin-bottom:1rem; }
  .calendar .grid { display:grid; grid-template-columns: repeat(7,1fr); gap:0.25rem; }
  .cell { padding:0.5rem; border:1px solid #ccc; text-align:center; min-height:3rem; }
  .cell.head { font-weight:bold; background:#f0f0f0; }
  .cell.today { background:#fee; }
  .convert { margin-top:2rem; max-width:20rem; margin-left:auto; margin-right:auto; }
  .ethiopian-inputs { display:flex; gap:0.5rem; }
  .result { margin-top:0.5rem; font-weight:bold; }
</style>
