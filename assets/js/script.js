var graph = document.querySelector('#graph');


fetch('https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=US)&format=amcharts&limit=5000')
.then(data =>{

    var graphEl = data['dataProvider'];

    graph.innerHTML = graphEl;
    
})
.catch(err => console.log(err));

console.log('https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=US)&format=amcharts&limit=5000')


