/**
 * Manufacturing Component Planner
 * Client-side BOM analysis and scenario planning tool
 */

// Application State
const state = {
    bomData: [],
    selectedComponent: '',
    selectedMachine: 'all',
    years: 5,
    chart: null
};

// DOM Elements
const elements = {
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    uploadBtn: document.getElementById('uploadBtn'),
    uploadSuccess: document.getElementById('uploadSuccess'),
    uploadMessage: document.getElementById('uploadMessage'),
    resetBtn: document.getElementById('resetBtn'),
    controlsPanel: document.getElementById('controlsPanel'),
    componentSelect: document.getElementById('componentSelect'),
    machineSelect: document.getElementById('machineSelect'),
    yearSlider: document.getElementById('yearSlider'),
    yearValue: document.getElementById('yearValue'),
    resultsSection: document.getElementById('resultsSection'),
    resultText: document.getElementById('resultText'),
    statTotal: document.getElementById('statTotal'),
    statAverage: document.getElementById('statAverage'),
    statPeak: document.getElementById('statPeak'),
    statMachines: document.getElementById('statMachines'),
    dataPreview: document.getElementById('dataPreview'),
    tableHeader: document.getElementById('tableHeader'),
    tableBody: document.getElementById('tableBody'),
    requirementsChart: document.getElementById('requirementsChart')
};

// Initialize application
function init() {
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // File upload handlers
    elements.uploadBtn.addEventListener('click', () => elements.fileInput.click());
    elements.uploadZone.addEventListener('click', (e) => {
        if (e.target !== elements.uploadBtn) elements.fileInput.click();
    });
    elements.fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop handlers
    elements.uploadZone.addEventListener('dragover', handleDragOver);
    elements.uploadZone.addEventListener('dragleave', handleDragLeave);
    elements.uploadZone.addEventListener('drop', handleDrop);

    // Reset button
    elements.resetBtn.addEventListener('click', resetApp);

    // Control change handlers
    elements.componentSelect.addEventListener('change', handleComponentChange);
    elements.machineSelect.addEventListener('change', handleMachineChange);
    elements.yearSlider.addEventListener('input', handleYearChange);
}

// File Handling
function handleDragOver(e) {
    e.preventDefault();
    elements.uploadZone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    elements.uploadZone.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    elements.uploadZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
        processFile(file);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

function processFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const csvText = e.target.result;
        parseCSV(csvText);
    };
    reader.readAsText(file);
}

// CSV Parsing
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    state.bomData = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length < 4) continue;

        const row = {
            machine_type: values[0],
            component: values[1],
            qty_per_machine: parseInt(values[2], 10) || 0,
            forecasts: []
        };

        // Parse year forecasts (columns 3 onwards)
        for (let j = 3; j < values.length && j < 13; j++) {
            row.forecasts.push(parseInt(values[j], 10) || 0);
        }

        state.bomData.push(row);
    }

    if (state.bomData.length > 0) {
        showDataLoaded();
        populateSelectors();
        renderDataTable();
    }
}

// UI State Management
function showDataLoaded() {
    elements.uploadZone.hidden = true;
    elements.uploadSuccess.hidden = false;
    elements.uploadMessage.textContent = `Loaded ${state.bomData.length} rows of BOM data`;
    elements.controlsPanel.hidden = false;
    elements.dataPreview.hidden = false;
}

function resetApp() {
    state.bomData = [];
    state.selectedComponent = '';
    state.selectedMachine = 'all';
    state.years = 5;

    elements.uploadZone.hidden = false;
    elements.uploadSuccess.hidden = true;
    elements.controlsPanel.hidden = true;
    elements.resultsSection.hidden = true;
    elements.dataPreview.hidden = true;
    elements.fileInput.value = '';
    elements.yearSlider.value = 5;
    elements.yearValue.textContent = '5 years';

    if (state.chart) {
        state.chart.destroy();
        state.chart = null;
    }
}

// Populate Dropdowns
function populateSelectors() {
    // Get unique components
    const components = [...new Set(state.bomData.map(row => row.component))].sort();
    elements.componentSelect.innerHTML = '<option value="">Select a component...</option>';
    components.forEach(comp => {
        elements.componentSelect.innerHTML += `<option value="${comp}">${comp}</option>`;
    });

    // Get unique machines
    const machines = [...new Set(state.bomData.map(row => row.machine_type))].sort();
    elements.machineSelect.innerHTML = '<option value="all">All Machines</option>';
    machines.forEach(machine => {
        elements.machineSelect.innerHTML += `<option value="${machine}">${machine}</option>`;
    });
}

// Control Handlers
function handleComponentChange(e) {
    state.selectedComponent = e.target.value;
    updateResults();
}

function handleMachineChange(e) {
    state.selectedMachine = e.target.value;
    updateResults();
}

function handleYearChange(e) {
    state.years = parseInt(e.target.value, 10);
    elements.yearValue.textContent = `${state.years} year${state.years > 1 ? 's' : ''}`;
    updateResults();
}

// Calculation Logic
function calculateRequirements() {
    if (!state.selectedComponent) return null;

    // Filter data based on selections
    let relevantRows = state.bomData.filter(row => row.component === state.selectedComponent);

    if (state.selectedMachine !== 'all') {
        relevantRows = relevantRows.filter(row => row.machine_type === state.selectedMachine);
    }

    if (relevantRows.length === 0) return null;

    // Calculate year-by-year requirements
    const yearlyRequirements = [];
    const yearlyMachines = [];

    for (let year = 0; year < state.years; year++) {
        let yearTotal = 0;
        let machineTotal = 0;

        relevantRows.forEach(row => {
            const forecast = row.forecasts[year] || 0;
            yearTotal += row.qty_per_machine * forecast;
            machineTotal += forecast;
        });

        yearlyRequirements.push(yearTotal);
        yearlyMachines.push(machineTotal);
    }

    const totalComponents = yearlyRequirements.reduce((a, b) => a + b, 0);
    const totalMachines = yearlyMachines.reduce((a, b) => a + b, 0);
    const avgPerYear = Math.round(totalComponents / state.years);
    const peakRequirement = Math.max(...yearlyRequirements);

    return {
        yearlyRequirements,
        yearlyMachines,
        totalComponents,
        totalMachines,
        avgPerYear,
        peakRequirement,
        relevantRows
    };
}

// Results Display
function updateResults() {
    const results = calculateRequirements();

    if (!results) {
        elements.resultsSection.hidden = true;
        highlightTableRows([]);
        return;
    }

    elements.resultsSection.hidden = false;

    // Update primary result text
    const machineText = state.selectedMachine === 'all'
        ? `${results.totalMachines.toLocaleString()} machines (across all types)`
        : `${results.totalMachines.toLocaleString()} ${state.selectedMachine}`;

    elements.resultText.innerHTML = `
        You need <span class="highlight">${results.totalComponents.toLocaleString()}</span> units of
        <span class="highlight">${state.selectedComponent}</span> to manufacture
        <span class="highlight">${machineText}</span> over the next
        <span class="highlight">${state.years} year${state.years > 1 ? 's' : ''}</span>
    `;

    // Update statistics
    elements.statTotal.textContent = results.totalComponents.toLocaleString();
    elements.statAverage.textContent = results.avgPerYear.toLocaleString();
    elements.statPeak.textContent = results.peakRequirement.toLocaleString();
    elements.statMachines.textContent = results.totalMachines.toLocaleString();

    // Update chart
    updateChart(results);

    // Highlight relevant table rows
    highlightTableRows(results.relevantRows);
}

// Chart Rendering
function updateChart(results) {
    const ctx = elements.requirementsChart.getContext('2d');

    const labels = [];
    for (let i = 1; i <= state.years; i++) {
        labels.push(`Year ${i}`);
    }

    const chartData = {
        labels,
        datasets: [{
            label: `${state.selectedComponent} Requirements`,
            data: results.yearlyRequirements,
            backgroundColor: 'rgba(37, 99, 235, 0.7)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 1,
            borderRadius: 4
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y.toLocaleString()} units`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value.toLocaleString()
                }
            }
        }
    };

    if (state.chart) {
        state.chart.data = chartData;
        state.chart.options = chartOptions;
        state.chart.update();
    } else {
        state.chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    }
}

// Data Table Rendering
function renderDataTable() {
    // Create header row
    const headers = ['Machine Type', 'Component', 'Qty/Machine',
        'Yr1', 'Yr2', 'Yr3', 'Yr4', 'Yr5', 'Yr6', 'Yr7', 'Yr8', 'Yr9', 'Yr10'];
    elements.tableHeader.innerHTML = headers.map(h => `<th>${h}</th>`).join('');

    // Create body rows
    elements.tableBody.innerHTML = state.bomData.map((row, idx) => {
        const forecastCells = row.forecasts.map(f => `<td>${f.toLocaleString()}</td>`).join('');
        return `
            <tr data-index="${idx}" data-machine="${row.machine_type}" data-component="${row.component}">
                <td>${row.machine_type}</td>
                <td>${row.component}</td>
                <td>${row.qty_per_machine}</td>
                ${forecastCells}
            </tr>
        `;
    }).join('');
}

function highlightTableRows(relevantRows) {
    // Remove all highlights
    elements.tableBody.querySelectorAll('tr').forEach(tr => {
        tr.classList.remove('highlighted');
    });

    // Add highlights to matching rows
    relevantRows.forEach(row => {
        const tr = elements.tableBody.querySelector(
            `tr[data-machine="${row.machine_type}"][data-component="${row.component}"]`
        );
        if (tr) {
            tr.classList.add('highlighted');
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);
