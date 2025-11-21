
// Validation for Layout Inputs
const layoutFields = ['facilityName', 'width', 'length', 'aisles']; const volumeFields = ['dailyOrders', 'dailyLines', 'dailyUnits', 'linesPerStop'];

function validateFields(fields, buttonId) { const button = document.getElementById(buttonId); if (!button) return;

const checkAll = () => { const allFilled = fields.every(fid => { const el = document.getElementById(fid); return el && el.value.trim() !== ''; }); button.disabled = !allFilled; };

// attach listeners fields.forEach(id => { const input = document.getElementById(id); if (input) input.addEventListener('input', checkAll); });

  button.addEventListener('click', () => { const allValid = fields.every(fid => { const el = document.getElementById(fid); return el && el.value.trim() !== ''; }); if (!allValid) { alert('Please fill in all fields.'); return; } fields.forEach(fid => { const el = document.getElementById(fid); if (el) localStorage.setItem(fid, el.value.trim()); }); if (buttonId === 'nextBtn') { window.location.href = 'volume.html'; } else { window.location.href = 'results.html'; } }); }

document.addEventListener('DOMContentLoaded', () => { const startBtn = document.getElementById('startBtn'); if (startBtn) { startBtn.addEventListener('click', () => { window.location.href = 'layout.html'; }); }

validateFields(layoutFields, 'nextBtn'); validateFields(volumeFields, 'nextBtnVolume'); });

// Results Page Calculations
if (window.location.pathname.includes('results.html')) {
    const facilityName = localStorage.getItem('facilityName');
    const width = parseInt(localStorage.getItem('width'));
    const length = parseInt(localStorage.getItem('length'));
    const aisles = parseInt(localStorage.getItem('aisles'));
    const dailyOrders = parseInt(localStorage.getItem('dailyOrders'));
    const dailyLines = parseInt(localStorage.getItem('dailyLines'));
    const dailyUnits = parseInt(localStorage.getItem('dailyUnits'));
    const linesPerStop = parseInt(localStorage.getItem('linesPerStop'));

    const sqFt = width * length;
    const sqFtPerAisle = Math.floor(sqFt / aisles);
    const hourlyOrders = Math.floor(dailyOrders / 7.5);
    const hourlyLines = Math.floor(dailyLines / 7.5);
    const hourlyUnits = Math.floor(dailyUnits / 7.5);
    const stopsPerHour = Math.floor(hourlyLines / linesPerStop);
    const linesPerSqFt = Math.floor(sqFt / dailyLines);

    document.getElementById('facilityNameOut').textContent = facilityName;
    document.getElementById('sqFt').textContent = sqFt;
    document.getElementById('sqFtPerAisle').textContent = sqFtPerAisle;
    document.getElementById('hourlyOrders').textContent = hourlyOrders;
    document.getElementById('hourlyLines').textContent = hourlyLines;
    document.getElementById('hourlyUnits').textContent = hourlyUnits;
    document.getElementById('stopsPerHour').textContent = stopsPerHour;
    document.getElementById('linesPerSqFt').textContent = linesPerSqFt;
}





