
// Validation for Layout Inputs
const layoutFields = ['facilityName', 'width', 'length', 'aisles']; const volumeFields = ['dailyOrders', 'dailyLines', 'dailyUnits', 'linesPerStop'];

function validateFields(fields, buttonId) { const button = document.getElementById(buttonId); if (!button) return;

const checkAll = () => { const allFilled = fields.every(fid => { const el = document.getElementById(fid); return el && el.value.trim() !== ''; }); button.disabled = !allFilled; };

// attach listeners
                                           fields.forEach(id => { const input = document.getElementById(id); if (input) input.addEventListener('input', checkAll); });

 button.addEventListener('click', () => { const allValid = fields.every(fid => { const el = document.getElementById(fid); return el && el.value.trim() !== ''; }); if (!allValid) { alert('Please fill in all fields.'); return; } fields.forEach(fid => { const el = document.getElementById(fid); if (el) localStorage.setItem(fid, el.value.trim()); }); if (buttonId === 'nextBtn') { window.location.href = 'volume.html'; } else { window.location.href = 'results.html'; } }); }

document.addEventListener('DOMContentLoaded', () => { const startBtn = document.getElementById('startBtn'); if (startBtn) { startBtn.addEventListener('click', () => { window.location.href = 'layout.html'; }); }

validateFields(layoutFields, 'nextBtn'); validateFields(volumeFields, 'nextBtnVolume'); });
// Results Page Calculations
if (window.location.pathname.includes('results.html')) { const facilityName = localStorage.getItem('facilityName') || ''; const width = Number(localStorage.getItem('width')); const length = Number(localStorage.getItem('length')); const aisles = Number(localStorage.getItem('aisles')); const dailyOrders = Number(localStorage.getItem('dailyOrders')); const dailyLines = Number(localStorage.getItem('dailyLines')); const dailyUnits = Number(localStorage.getItem('dailyUnits')); const linesPerStop = Number(localStorage.getItem('linesPerStop'));

const safeNum = (n) => (Number.isFinite(n) ? n : 0); const w = safeNum(width); const l = safeNum(length); const a = safeNum(aisles); const dO = safeNum(dailyOrders); const dL = safeNum(dailyLines); const dU = safeNum(dailyUnits); const lps = safeNum(linesPerStop);

const sqFt = w * l; const sqFtPerAisle = a > 0 ? Math.floor(sqFt / a) : 0; const hourlyOrders = Math.floor(dO / 7.5); const hourlyLines = Math.floor(dL / 7.5); const hourlyUnits = Math.floor(dU / 7.5); const stopsPerHour = lps > 0 ? Math.floor(hourlyLines / lps) : 0; const linesPerSqFt = dL > 0 ? Math.floor(sqFt / dL) : 0;

const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };

setText('facilityNameOut', facilityName); setText('sqFt', sqFt); setText('sqFtPerAisle', sqFtPerAisle); setText('hourlyOrders', hourlyOrders); setText('hourlyLines', hourlyLines); setText('hourlyUnits', hourlyUnits); setText('stopsPerHour', stopsPerHour); setText('linesPerSqFt', linesPerSqFt); }







