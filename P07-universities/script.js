const countryEl = document.getElementById('country');
const statusEl = document.getElementById('status');
const table = document.getElementById('table');
const body = document.getElementById('body');

async function search() {
  const country = countryEl.value.trim();
  if (!country) { statusEl.textContent = 'Please enter a country.'; return; }
  statusEl.textContent = 'Loading...';
  table.hidden = true;
  body.innerHTML = '';
  try {
    const res = await fetch('http://universities.hipolabs.com/search?country=' + encodeURIComponent(country));
    const data = await res.json();
    if (data.length === 0) { statusEl.textContent = 'No universities found.'; return; }
    data.forEach(u => {
      const tr = document.createElement('tr');
      const site = u.web_pages[0];
      tr.innerHTML = `<td>${u.name}</td>
        <td><a href="${site}" target="_blank">${site}</a></td>
        <td>${u['state-province'] || '-'}</td>`;
      body.appendChild(tr);
    });
    statusEl.textContent = data.length + ' universities found.';
    table.hidden = false;
  } catch (err) {
    statusEl.textContent = 'Error fetching data.';
  }
}
document.getElementById('btn').addEventListener('click', search);
countryEl.addEventListener('keypress', e => { if (e.key === 'Enter') search(); });
