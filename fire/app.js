const annualSavings = currentIncome * currentSavingsRate;
const annualExpenses = currentExpenses;
const investmentGrowth = investmentReturnRate - withdrawalRate;

let yearsToFreedom = 0;
let savings = 0;

const yearsData = [];
const savingsData = [];

while (savings * withdrawalRate < annualExpenses) {
    savings += annualSavings;
    savings *= (1 + investmentGrowth);
    yearsToFreedom++;
    yearsData.push(yearsToFreedom);
    savingsData.push(savings);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('navbar').innerHTML = '<h2>Financial and Energy Management Platform</h2>';
});


function displayFinancialFreedomResults(years, yearsData, savingsData) {
    const resultsDiv = document.getElementById('analysis-results');
    resultsDiv.innerHTML = `<h3>Years to Financial Freedom: ${years}</h3>`;

    const ctx = document.getElementById('freedomChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearsData,
            datasets: [{
                label: 'Savings Over Time',
                data: savingsData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Savings ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            }
        }
    });
}

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            processExcelFile(data);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please select a file to upload.');
    }
}

function processExcelFile(data) {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    analyzeData(jsonData);
}

function analyzeData(data) {
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: `Analyze the following financial data and provide insights and budget recommendations:\n${JSON.stringify(data)}`,
            max_tokens: 500
        })
    })
    .then(response => response.json())
    .then(result => {
        displayAnalysisResults(result.choices[0].text);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayAnalysisResults(results) {
    const analysisResultsDiv = document.getElementById('analysis-results');
    analysisResultsDiv.innerHTML = `<pre>${results}</pre>`;
}

function optimizeIncome() {
    const job = document.getElementById('job').value;
    const skills = document.getElementById('skills').value;
    const location = document.getElementById('location').value;

    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: `Given the job, skills, and location of the user, provide personalized recommendations to increase their income:\nJob: ${job}\nSkills: ${skills}\nLocation: ${location}`,
            max_tokens: 300
        })
    })
    .then(response => response.json())
    .then(result => {
        displayAnalysisResults(`Income Optimization:\n${result.choices[0].text}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function optimizeEnergy() {
    const homeSize = document.getElementById('homeSize').value;
    const appliances = document.getElementById('appliances').value;
    const lights = document.getElementById('lights').value;

    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: `Based on the home size, number of appliances, and lights, provide personalized recommendations to optimize energy consumption:\nHome Size: ${homeSize} sqm\nAppliances: ${appliances}\nLights: ${lights}`,
            max_tokens: 300
        })
    })
    .then(response => response.json())
    .then(result => {
        displayAnalysisResults(`Energy Optimization:\n${result.choices[0].text}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function calculateFinancialFreedom() {
    const currentIncome = parseFloat(document.getElementById('currentIncome').value);
    const currentExpenses = parseFloat(document.getElementById('currentExpenses').value);
    const currentSavingsRate = parseFloat(document.getElementById('currentSavingsRate').value) / 100;
    const investmentReturnRate = parseFloat(document.getElementById('investmentReturnRate').value) / 100;
    const withdrawalRate = parseFloat(document.getElementById('withdrawalRate').value) / 100;

    const annualSavings = currentIncome * currentSavingsRate;
    const annualExpenses = currentExpenses;
    const investmentGrowth = investmentReturnRate - withdrawalRate;

    let yearsToFreedom = 0;
    let savings = 0;

    const yearsData = [];
    const savingsData = [];

    while (savings * withdrawalRate < annualExpenses) {
        savings += annualSavings;
        savings *= (1 + investmentGrowth);
        yearsToFreedom++;
        yearsData.push(yearsToFreedom);
        savingsData.push(savings);
    }

    displayFinancialFreedomResults(yearsToFreedom, yearsData, savingsData);
}

function processExcelFile(data) {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    analyzeData(jsonData);
}
