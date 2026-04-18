function generatePatientID(){
    let count = localStorage.getItem("patientCount") || 0;
    count++;
    localStorage.setItem("patientCount", count);

    let year = new Date().getFullYear();

    return "MM-" + year + "-" + String(count).padStart(4,'0');
}
const medicines = [

{
name:"Paracetamol",
symptoms:["fever","headache"],
dosage_child:"250mg",
dosage_adult:"500mg",
usage:"Fever and mild pain relief",
warnings:"Do not exceed 4 doses per day",
min_age:0,
dos:["Drink water","Take rest","Eat light food"],
dont:["Avoid cold drinks","Do not skip meals","Avoid heavy work"],
home:["Warm water","Wet cloth on forehead","Rest"]
},

{
name:"Ibuprofen",
symptoms:["pain","inflammation"],
dosage_child:"200mg",
dosage_adult:"400mg",
usage:"Pain relief",
warnings:"Avoid empty stomach",
min_age:6,
dos:["Take after food","Stay hydrated","Rest affected area"],
dont:["Avoid alcohol","Do not overdose","Avoid empty stomach"],
home:["Ice pack","Warm compress","Rest"]
},

{
name:"Dolo 650",
symptoms:["fever","body pain"],
dosage_child:"Not for kids",
dosage_adult:"650mg",
usage:"High fever",
warnings:"Check liver condition",
min_age:6,
dos:["Drink fluids","Take rest","Monitor temperature"],
dont:["Avoid alcohol","Do not overdose","Avoid junk food"],
home:["Herbal tea","Warm bath","Rest"]
},

{
name:"Aspirin",
symptoms:["headache","heart"],
dosage_child:"Not for children",
dosage_adult:"325mg",
usage:"Pain & heart protection",
warnings:"Not for kids",
min_age:12,
dos:["Take after food","Drink water","Follow dosage"],
dont:["Avoid alcohol","Do not give to children","Avoid overdose"],
home:["Rest","Cold compress","Hydration"]
},

{
name:"Cetirizine",
symptoms:["allergy","cold"],
dosage_child:"5mg",
dosage_adult:"10mg",
usage:"Allergy relief",
warnings:"May cause drowsiness",
min_age:2,
dos:["Take at night","Drink water","Rest"],
dont:["Avoid driving","Avoid alcohol","Do not overdose"],
home:["Steam inhalation","Warm fluids","Rest"]
},

{
name:"Amoxicillin",
symptoms:["infection","bacteria"],
dosage_child:"250mg",
dosage_adult:"500mg",
usage:"Antibiotic",
warnings:"Complete full course",
min_age:1,
dos:["Drink water","Take on time"],
dont:["Do not skip doses","Avoid alcohol"],
home:["Rest","Healthy food","Hydration"]
},

{
name:"Azithromycin",
symptoms:["infection","throat"],
dosage_child:"250mg",
dosage_adult:"500mg",
usage:"Bacterial infection",
warnings:"Take as prescribed",
min_age:5,
dos:["Take once daily","Drink warm water"],
dont:["Avoid alcohol","Do not overdose"],
home:["Warm water","Gargle salt water","Rest"]
},

{
name:"ORS",
symptoms:["dehydration","diarrhea"],
dosage_child:"As needed",
dosage_adult:"As needed",
usage:"Rehydration",
warnings:"Use clean water",
min_age:0,
dos:["Drink frequently","Use clean water","Take small sips"],
dont:["Avoid junk food","Avoid dehydration"],
home:["Coconut water","Rice water","Banana"]
},

{
name:"Pantoprazole",
symptoms:["acidity","gas"],
dosage_child:"20mg",
dosage_adult:"40mg",
usage:"Reduces acid",
warnings:"Take before food",
min_age:12,
dos:["Take before breakfast","Eat light food","Stay upright"],
dont:["Avoid spicy food","Avoid late meals","Avoid alcohol"],
home:["Cold milk","Banana","Avoid spicy food"]
},

{
name:"Domperidone",
symptoms:["vomiting","nausea"],
dosage_child:"10mg",
dosage_adult:"10mg",
usage:"Stops vomiting",
warnings:"Take before meals",
min_age:5,
dos:["Take before food","Drink fluids","Rest"],
dont:["Avoid heavy food","Avoid dehydration","Avoid alcohol"],
home:["Ginger tea","Lemon water","Rest"]
},

{
name:"Metformin",
symptoms:["diabetes"],
dosage_child:"Not for kids",
dosage_adult:"500mg",
usage:"Controls blood sugar",
warnings:"Take with meals",
min_age:18,
dos:["Take with food","Exercise","Monitor sugar"],
dont:["Avoid sugar","Avoid alcohol","Do not skip dose"],
home:["Healthy diet","Walking","Fiber food"]
},

{
name:"Salbutamol",
symptoms:["asthma","breathing"],
dosage_child:"As prescribed",
dosage_adult:"As prescribed",
usage:"Relieves breathing",
warnings:"Use inhaler properly",
min_age:4,
dos:["Use inhaler","Stay calm"],
dont:["Avoid dust","Avoid smoke"],
home:["Steam inhalation","Warm fluids","Rest"]
},

{
name:"Loperamide",
symptoms:["diarrhea"],
dosage_child:"Not for kids",
dosage_adult:"2mg",
usage:"Stops diarrhea",
warnings:"Short-term use",
min_age:12,
dos:["Drink ORS","Eat light food","Rest"],
dont:["Avoid junk food","Avoid dehydration","Avoid milk"],
home:["Rice water","Banana","Curd"]
},

{
name:"Ranitidine",
symptoms:["acidity","ulcer"],
dosage_child:"150mg",
dosage_adult:"150mg",
usage:"Reduces stomach acid",
warnings:"Take before food",
min_age:12,
dos:["Take before meals","Eat healthy","Drink water"],
dont:["Avoid spicy food","Avoid alcohol","Avoid smoking"],
home:["Cold milk","Fruits","Light food"]
},

{
name:"Vitamin C",
symptoms:["weakness","immunity"],
dosage_child:"250mg",
dosage_adult:"500mg",
usage:"Boost immunity",
warnings:"Do not overdose",
min_age:2,
dos:["Take daily","Eat fruits","Stay hydrated"],
dont:["Avoid junk food","Avoid overdose"],
home:["Orange juice","Lemon water","Fruits"]
}

];

document.getElementById("form").addEventListener("submit", function(e){
e.preventDefault();

let name = document.getElementById("name").value;
let age = parseInt(document.getElementById("age").value);
let symptoms = document.getElementById("symptoms").value.toLowerCase().trim();

let result = document.getElementById("result");
result.innerHTML = "";

if(!symptoms){
alert("Enter symptoms");
return;
}

// 🔥 IMPROVED MATCHING
let found = medicines.filter(m => {
return m.symptoms.some(sym => symptoms.includes(sym));
});

if(found.length === 0){
result.innerHTML = `<div class="alert alert-danger">No doctor suggestion found</div>`;
return;
}

found.forEach(m => {

let dosage = age < 12 ? m.dosage_child : m.dosage_adult;

// Do's
let dosList = m.dos.map(d => `<li>${d}</li>`).join("");
// Don'ts
let dontList = m.dont.map(d => `<li>${d}</li>`).join("");
// Home remedies
let homeList = m.home.map(h => `<li>${h}</li>`).join("");

let warningBox = "";
if(age < m.min_age){
warningBox = `<div class="alert alert-warning">
Not recommended below ${m.min_age} years
</div>`;
}

result.innerHTML += `
<div class="card p-4 mb-4 shadow">

<h4 class="text-primary">${m.name}</h4>

${warningBox}

<p><b>Patient:</b> ${name}</p>

<hr>

<h5 class="text-success">Do's</h5>
<ul>${dosList}</ul>

<h5 class="text-danger">Don'ts</h5>
<ul>${dontList}</ul>

<h5 class="text-warning">Home Remedies</h5>
<ul>${homeList}</ul>

<hr>

<p><b>Usage:</b> ${m.usage}</p>
<p><b>Dosage:</b> ${dosage}</p>
<p class="text-danger"><b>Warning:</b> ${m.warnings}</p>

<button class="btn btn-success"
onclick="downloadPDF('${name}','${m.name}','${m.usage}','${dosage}','${m.warnings}','${m.dos}','${m.dont}','${m.home}')">
Download Full Report
</button>

</div>
`;
});

});

function downloadPDF(name, med, usage, dosage, warning, dos, dont, home){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// 📅 Date & Time
let now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString();
let patientID = generatePatientID();

// 🏥 HEADER
doc.setFontSize(20);
doc.setTextColor(0, 102, 204);
doc.text("MediMonitor Hospital", 20, 20);

doc.setFontSize(10);
doc.setTextColor(0,0,0);
doc.text("Smart Health Care System", 20, 26);
doc.text("Contact: +91 98765 43210 | medi@monitor.com", 20, 32);

// LINE
doc.line(20, 35, 190, 35);

// 👤 PATIENT INFO
doc.setFontSize(12);
doc.text("Patient Name: " + name, 20, 45);
doc.text("Patient ID: " + patientID, 20, 52);
doc.text("Date: " + date, 140, 45);
doc.text("Time: " + time, 140, 52);

// LINE
doc.line(20, 58, 190, 58);

// 🩺 DIAGNOSIS
doc.setFontSize(14);
doc.setTextColor(0,0,150);
doc.text("Diagnosis & Advice", 20, 70);

doc.setFontSize(11);
doc.setTextColor(0,0,0);
doc.text("Based on symptoms, the following treatment is suggested.", 20, 80);

// 💊 PRESCRIPTION
doc.setFontSize(14);
doc.setTextColor(0,100,0);
doc.text("Prescription", 20, 95);

doc.setFontSize(11);
doc.setTextColor(0,0,0);
doc.text("Medicine: " + med, 20, 105);
doc.text("Usage: " + usage, 20, 112);
doc.text("Dosage: " + dosage, 20, 119);
doc.text("Warning: " + warning, 20, 126);

// 🩺 DO'S
doc.setFontSize(13);
doc.setTextColor(0,150,0);
doc.text("Do's:", 20, 140);

doc.setFontSize(11);
doc.setTextColor(0,0,0);
dos.split(",").forEach((d,i)=>{
doc.text("- " + d, 25, 148 + (i*7));
});

// ❌ DON'TS
doc.setFontSize(13);
doc.setTextColor(200,0,0);
doc.text("Don'ts:", 20, 175);

doc.setFontSize(11);
doc.setTextColor(0,0,0);
dont.split(",").forEach((d,i)=>{
doc.text("- " + d, 25, 183 + (i*7));
});

// 🏠 HOME REMEDIES
doc.setFontSize(13);
doc.setTextColor(255,140,0);
doc.text("Home Remedies:", 20, 210);

doc.setFontSize(11);
doc.setTextColor(0,0,0);
home.split(",").forEach((h,i)=>{
doc.text("- " + h, 25, 218 + (i*7));
});


// 📌 DISCLAIMER
doc.setFontSize(9);
doc.setTextColor(100,100,100);
doc.text("This report is for educational purposes only.", 20, 250);
doc.text("Consult a qualified doctor before taking medication.", 20, 256);

// SAVE
doc.save(name + "_Prescription.pdf");
}

// 🔹 Collect all keywords
let suggestionData = new Set();

medicines.forEach(m => {
    m.symptoms.forEach(s => suggestionData.add(s));
    suggestionData.add(m.name.toLowerCase());
});

const suggestionBox = document.getElementById("suggestions");
const input = document.getElementById("symptoms");

input.addEventListener("input", function(){
    let value = this.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if(!value) return;

    let matches = [...suggestionData].filter(item =>
        item.includes(value)
    );

    matches.slice(0,5).forEach(match => {
        let div = document.createElement("div");
        div.className = "list-group-item list-group-item-action";
        div.textContent = match;

        div.onclick = () => {
            input.value = match;
            suggestionBox.innerHTML = "";
        };

        suggestionBox.appendChild(div);
    });
});

// hide on click outside
document.addEventListener("click", (e)=>{
    if(!e.target.closest("#symptoms")){
        suggestionBox.innerHTML = "";
    }
});