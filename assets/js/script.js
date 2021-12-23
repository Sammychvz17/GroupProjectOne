
const xlabels = [];
const yconfirmed = [];
var state = document.querySelector('#stateName');
var button = document.querySelector('.button');
var casesEl = document.querySelector('#casesEl');
var deathsEl = document.querySelector('#deathsEl');
var vaccinesEl = document.querySelector('#vaccinesEl');

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

    

        
        var infected = data.actuals.cases;
        casesEl.innerHTML = "Cases: "+ infected;

        var deaths = data.actuals.deaths;
        deathsEl.innerHTML = "Deaths: "+ deaths;

        var vaccinesAdministered = data.actuals.vaccinesAdministered;
        vaccinesEl.innerHTML = "Vaccines Administered: "+ vaccinesAdministered;
        

    
        
    })
    
    .catch(err => console.log(err));
    })

 


 
   


          
        
    console.log('https://api.covidactnow.org/v2/state/TX.json?apiKey=b5439389d4fe4bb8bf52dad78d3fab37')
        
    