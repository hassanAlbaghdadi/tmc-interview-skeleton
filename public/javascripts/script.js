document.addEventListener("DOMContentLoaded", async function() {
  const provinces = await fetch("/api/provinces").then(res => res.json())
  
  const nav = document.getElementById("region-select")
  const detailsHeader = document.querySelector("#region-details h2")
  const detailsInfo = document.querySelector("#region-details p")
  const provinceInfo = document.querySelector("#region-details div")
  
  provinces.forEach(province => {
    const button = document.createElement("button")
    button.innerText = province.short
    button.classList.add("region-option")
    
    button.addEventListener("click", async function() {
      provinceInfo.innerHTML = detailsInfo.innerHTML = ""
      const cities = await fetch(`/api/cities/${province.name}`).then(res => res.json());
      [...nav.children].forEach(child => child.classList.remove("selected"))
      this.classList.add("selected")
      // @ts-ignore
      detailsHeader.innerText = province.name;
      if(cities.length > 0){
        var table = createCitiesTable(cities, province.capital)
        provinceInfo.append(table);
      }
      else{
        detailsInfo.innerHTML = `No cities to display from the database.`
      } 
    })
    nav.appendChild(button)
  })
});

function createCitiesTable(cities, capital){
  var table = document.createElement("table")
  var row = table.insertRow(0)
  row.classList.add('bold')
  row.insertCell(0).innerHTML = "Cities"
  row.insertCell(1).innerHTML = "Population";
  [...cities].forEach((city, index) => {
    var row = table.insertRow(index+1);
    row.insertCell(0).innerHTML = city.Municipality === capital ? `<b>${city.Municipality}</b> (capital)` :  city.Municipality
    row.insertCell(1).innerHTML = city["Population(2016)"]
  });
  return table;
}