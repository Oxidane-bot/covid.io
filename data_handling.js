d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=cumAntibodyTestsByPublishDate&metric=cumCasesByPublishDate&metric=cumTestsByPublishDate&metric=hospitalCases&metric=cumDeathsByPublishDate&format=csv", function (d) {
    let i = 0
    let yesterday_cases = (eval(d.map(function (d) {
        return d.cumCasesByPublishDate
    })[0]) - eval(d.map(function (d) {
        return d.cumCasesByPublishDate
    })[1]))

    // let cumCasesByPublishDate = d.map(function(d) {return d.cumCasesByPublishDate})[0];
    document.getElementById('total_Cases').innerHTML = d.map(function (d) {
        return d.cumCasesByPublishDate
    })[0];

    document.getElementById('yesterday_Cases').innerHTML = '+' + yesterday_cases;


    for (i = 0; (d.map(function (d) {
        return d.cumTestsByPublishDate
    })[i]) === ''; i++) {

    }
    let yesterday_tests = (eval(d.map(function (d) {
        return d.cumTestsByPublishDate
    })[i]) - eval(d.map(function (d) {
        return d.cumTestsByPublishDate
    })[i + 1]))
    document.getElementById('total_Tested').innerHTML = d.map(function (d) {
        return d.cumTestsByPublishDate
    })[i];
    document.getElementById('yesterday_Tested').innerHTML = '+' + yesterday_tests;

})
