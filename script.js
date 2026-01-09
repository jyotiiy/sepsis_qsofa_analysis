let rrData = [], sbpData = [], mentalData = [], labels = [];
let rrChart, sbpChart, mentalChart, combinedChart;

function startMonitoring() {

    if (!patientId.value || !nameInput.value || !ageInput.value) {
        alert("Fill all patient details");
        return;
    }

    monitorStatus.innerText = "Active";
    monitorStatus.className = "active";

    inputPage.classList.add("hidden");
    scorePage.classList.remove("hidden");

    patientName.innerText = `${nameInput.value} (ID: ${patientId.value})`;
    patientInfo.innerText = `Age: ${ageInput.value} | Gender: ${genderSelect.value}`;

    addVitals();
    setInterval(addVitals, 120000); // every 2 minutes
}

function addVitals() {

    const rr = Number(rrInput.value);
    const sbp = Number(sbpInput.value);
    const mental = mentalInput.value;

    rrData.push(rr);
    sbpData.push(sbp);
    mentalData.push(mental === "altered" ? 1 : 0);
    labels.push("T" + rrData.length);

    rrNow.innerText = rr;
    sbpNow.innerText = sbp;
    mentalNow.innerText = mental;

    colorBox(rrBox, rr < 22);
    colorBox(sbpBox, sbp > 100);
    colorBox(mentalBox, mental === "normal");

    updateScore(rr, sbp, mental);
    drawCharts();
}

function colorBox(box, normal) {
    box.className = "current-box " + (normal ? "green" : "red");
}

function updateScore(rr, sbp, mental) {
    let score = 0;
    if (rr >= 22) score++;
    if (sbp <= 100) score++;
    if (mental === "altered") score++;

    qsofaScore.innerText = score;

    let status = "";
    if (score === 0) {
        scoreCard.className = "score-card green";
        status = "LOW RISK";
    } else if (score === 1) {
        scoreCard.className = "score-card yellow";
        status = "MODERATE RISK";
    } else {
        scoreCard.className = "score-card red";
        status = "HIGH RISK";
    }

    riskStatus.innerText = "Risk Status: " + status;
}

function drawCharts() {

    if (rrChart) rrChart.destroy();
    if (sbpChart) sbpChart.destroy();
    if (mentalChart) mentalChart.destroy();
    if (combinedChart) combinedChart.destroy();

    rrChart = new Chart(rrChartCanvas, {
        type: "line",
        data: { labels, datasets: [{ data: rrData, label: "RR" }] }
    });

    sbpChart = new Chart(sbpChartCanvas, {
        type: "line",
        data: { labels, datasets: [{ data: sbpData, label: "SBP" }] }
    });

    mentalChart = new Chart(mentalChartCanvas, {
        type: "line",
        data: { labels, datasets: [{ data: mentalData, label: "Mental" }] }
    });

    combinedChart = new Chart(combinedChartCanvas, {
        type: "line",
        data: {
            labels,
            datasets: [
                { label: "RR", data: rrData },
                { label: "SBP", data: sbpData }
            ]
        }
    });
}

function goBack() {
    location.reload();
}

/* DOM REFERENCES */
const inputPage = document.getElementById("inputPage");
const scorePage = document.getElementById("scorePage");

const patientId = document.getElementById("patientId");
const monitorStatus = document.getElementById("monitorStatus");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderSelect = document.getElementById("gender");

const rrInput = document.getElementById("rr");
const sbpInput = document.getElementById("sbp");
const mentalInput = document.getElementById("mental");

const patientName = document.getElementById("patientName");
const patientInfo = document.getElementById("patientInfo");

const rrNow = document.getElementById("rrNow");
const sbpNow = document.getElementById("sbpNow");
const mentalNow = document.getElementById("mentalNow");

const rrBox = document.getElementById("rrBox");
const sbpBox = document.getElementById("sbpBox");
const mentalBox = document.getElementById("mentalBox");

const qsofaScore = document.getElementById("qsofaScore");
const riskStatus = document.getElementById("riskStatus");
const scoreCard = document.getElementById("scoreCard");

const rrChartCanvas = document.getElementById("rrChart");
const sbpChartCanvas = document.getElementById("sbpChart");
const mentalChartCanvas = document.getElementById("mentalChart");
const combinedChartCanvas = document.getElementById("combinedChart");
