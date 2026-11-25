const setupEl = document.getElementById('setup');
const punchEl = document.getElementById('punchline');

async function getJoke() {
  setupEl.textContent = 'Loading...';
  punchEl.textContent = '';
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    setupEl.textContent = data.setup;
    punchEl.textContent = data.punchline;
  } catch (err) {
    setupEl.textContent = 'Could not load a joke. Check your internet connection.';
  }
}
document.getElementById('btn').addEventListener('click', getJoke);
getJoke();
