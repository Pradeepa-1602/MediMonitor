const pills = [
{name:"Paracetamol",symptoms:"fever headache",color:"white",shape:"round",usage:"Fever",dosage:"500mg",warning:"No overdose"},
{name:"Ibuprofen",symptoms:"pain inflammation",color:"pink",shape:"round",usage:"Pain",dosage:"400mg",warning:"After food"},
{name:"Dolo 650",symptoms:"fever",color:"white",shape:"oval",usage:"Fever",dosage:"650mg",warning:"Liver care"},
{name:"Aspirin",symptoms:"headache",color:"white",shape:"round",usage:"Pain",dosage:"325mg",warning:"Not for kids"},
{name:"Cetirizine",symptoms:"allergy",color:"white",shape:"oval",usage:"Allergy",dosage:"10mg",warning:"Drowsy"},
{name:"Amoxicillin",symptoms:"infection",color:"red",shape:"capsule",usage:"Antibiotic",dosage:"500mg",warning:"Complete course"},
{name:"Azithromycin",symptoms:"throat infection",color:"pink",shape:"oval",usage:"Infection",dosage:"500mg",warning:"Doctor advice"},
{name:"ORS",symptoms:"dehydration",color:"white",shape:"powder",usage:"Hydration",dosage:"As needed",warning:"Use clean water"},
{name:"Pantoprazole",symptoms:"acidity",color:"yellow",shape:"round",usage:"Acid control",dosage:"40mg",warning:"Before food"},
{name:"Domperidone",symptoms:"vomiting",color:"white",shape:"round",usage:"Stops vomiting",dosage:"10mg",warning:"Before food"},
{name:"Metformin",symptoms:"diabetes",color:"white",shape:"round",usage:"Sugar control",dosage:"500mg",warning:"With food"},
{name:"Salbutamol",symptoms:"asthma",color:"white",shape:"capsule",usage:"Breathing",dosage:"As prescribed",warning:"Do not overuse"},
{name:"Loperamide",symptoms:"diarrhea",color:"yellow",shape:"capsule",usage:"Stops diarrhea",dosage:"2mg",warning:"Short use"},
{name:"Ranitidine",symptoms:"acidity",color:"orange",shape:"round",usage:"Acid relief",dosage:"150mg",warning:"Before food"},
{name:"Vitamin C",symptoms:"weakness",color:"orange",shape:"round",usage:"Immunity",dosage:"500mg",warning:"No overdose"}
];

function searchPill(){

let search = document.getElementById("search").value.toLowerCase();
let color = document.getElementById("color").value;
let shape = document.getElementById("shape").value;

let results = document.getElementById("results");
results.innerHTML = "";

let filtered = pills.filter(p =>
(p.name.toLowerCase().includes(search) || p.symptoms.includes(search)) &&
(color=="" || p.color==color) &&
(shape=="" || p.shape==shape)
);

if(filtered.length==0){
results.innerHTML = `<div class="alert alert-danger">No pill found</div>`;
return;
}

filtered.forEach(p=>{
results.innerHTML += `
<div class="card p-4 mb-3 shadow">
<h4 class="text-success">${p.name}</h4>
<p><b>Usage:</b> ${p.usage}</p>
<p><b>Dosage:</b> ${p.dosage}</p>
<p class="text-danger"><b>Warning:</b> ${p.warning}</p>

<button class="btn btn-primary"
onclick="downloadPDF('${p.name}','${p.usage}','${p.dosage}','${p.warning}')">
Download PDF
</button>
</div>
`;
});
}

function downloadPDF(name, usage, dosage, warning){
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Pill Info",20,20);
doc.text("Name: "+name,20,40);
doc.text("Usage: "+usage,20,50);
doc.text("Dosage: "+dosage,20,60);
doc.text("Warning: "+warning,20,70);

doc.save(name+"_pill.pdf");
}
// 🔹 Create suggestion list
let pillSet = new Set();

pills.forEach(p=>{
    pillSet.add(p.name.toLowerCase());
    p.symptoms.split(" ").forEach(s => pillSet.add(s));
});

const pillInput = document.getElementById("search");
const pillBox = document.getElementById("pillSuggestions");

// 🔹 Show suggestions while typing
pillInput.addEventListener("input", function(){
    let value = this.value.toLowerCase();
    pillBox.innerHTML = "";

    if(!value) return;

    let matches = [...pillSet].filter(item =>
        item.includes(value)
    );

    matches.slice(0,5).forEach(match=>{
        let div = document.createElement("div");
        div.className = "list-group-item list-group-item-action";
        div.textContent = match;

        div.onclick = () => {
            pillInput.value = match;
            pillBox.innerHTML = "";
        };

        pillBox.appendChild(div);
    });
});

// 🔹 Hide when clicking outside
document.addEventListener("click", (e)=>{
    if(!e.target.closest(".position-relative")){
        pillBox.innerHTML = "";
    }
});