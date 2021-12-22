
const xlabels = [];
const yconfirmed = [];

async function getData() {
    var response = await fetch('https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=US)&limit=100');
    var data = await response.text();
    console.log(data);

    var table = data.split('], [').slice(1);
    table.forEach (row => {
        var columns = row.split(',');
        var year = columns[0];
        xlabels.push(year);
        var confirmed = columns[1];
        yconfirmed.push(confirmed);
        console.log(year, confirmed);
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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
   
});
}

chartIt();
getData();