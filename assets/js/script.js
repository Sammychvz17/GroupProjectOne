
const xlabels = [];
const yconfirmed = [];
var state = document.querySelector('#stateName');
var button = document.querySelector('.button');
var casesEl = document.querySelector('#casesEl');
var deathsEl = document.querySelector('#deathsEl');
var previously = document.querySelector('#previously')
var vaccinesEl = document.querySelector('#vaccinesEl');
var cityTracker;

async function getData() {
    var response = await fetch('https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=US)&limit=5000');
    var data = await response.text();
    

    var table = data.split('], [').slice(1);
    table.forEach (row => {
        var columns = row.split(',');
        var year = columns[0];
        xlabels.push(year);
        var confirmed = columns[1];
        yconfirmed.push(confirmed);
        
    });
    
}

async function chartIt () {
await getData();
const ctx = document.getElementById('chart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xlabels,
        datasets: [{
            label: 'Confirmed COVID cases in the US',
            data: yconfirmed,
            fill: false,
            backgroundColor: [
                'rgba(255, 10, 55, 0.2)',
            ],
            borderColor: [
                'rgba(255, 10, 55, 1)',
            ],
            borderWidth: 2
        }]
    },
   
});
}

chartIt();
getData();



   

    button.addEventListener('click', function(stateSearch){
    fetch('https://api.covidactnow.org/v2/state/'+state.value+'.json?apiKey=b5439389d4fe4bb8bf52dad78d3fab37')
    .then(response => response.json())
    .then(data => {
        cityTracker = data.state;

        var infected = data.actuals.cases;
        casesEl.innerHTML = "Cases: "+ infected;

        var deaths = data.actuals.deaths;
        deathsEl.innerHTML = "Deaths: "+ deaths;

        var vaccinesAdministered = data.actuals.vaccinesAdministered;
        vaccinesEl.innerHTML = "Vaccines Administered: "+ vaccinesAdministered;

        
        searchHistory();
        displayStorage();
        });
        
    })

    var searchHistory = function (){
        var searchItemsArr;
        var searchedItems = localStorage.getItem('previous');
        if (searchedItems) {
            searchItemsArr = searchedItems.split(",");
            if (localStorage.getItem('previous').indexOf(cityTracker) === -1) {
                searchItemsArr.push(cityTracker);
                localStorage.setItem("previous", searchItemsArr);
            }
            }  else {
            localStorage.setItem('previous', cityTracker)
            }
            return cityTracker
        };

    var displayStorage = function (){
        var previously2 = document.querySelector("#previously2");
        previously2.remove()
        var previously2 = document.createElement("div")
        previously2.setAttribute("id", "previously2")
        previously.append(previously2)
        var searchItemsArr;
        var searchedItems = localStorage.getItem('previous');
        if (searchedItems) {
        searchItemsArr = searchedItems.split(",");
        for (i = 0; i < searchItemsArr.length; i++) {
        var storageEl = document.createElement("ul");
        storageEl.textContent = searchItemsArr[i];
        previously2.append(storageEl);
        console.log()
            }
        }
    };

       
    displayStorage();
    

 
    

        
    console.log('https://api.covidactnow.org/v2/state/TX.json?apiKey=b5439389d4fe4bb8bf52dad78d3fab37')
        
    

