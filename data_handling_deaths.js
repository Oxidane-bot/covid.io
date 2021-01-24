d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=cumDeaths28DaysByDeathDate&metric=cumDeaths28DaysByPublishDate&metric=newDeaths28DaysByDeathDateAgeDemographics&format=csv", function (data) {

    let i
    for (i = 0; (data.map(function (data) {
        return data.value
    })[i]) === ''; i++) {

    }


    document.getElementById('total_Deaths').innerHTML = data.map(function (data) {
        return data.value
    })[i];
    let position
    for  (position = 1;data.map(function (data) {
        return data.value
    })[i + position] === '';position++) {

    }
    let yesterday_deaths = eval(data.map(function (data) {
        return data.value
    })[i]) - eval(data.map(function (data) {
        return data.value
    })[i + position])

    document.getElementById('yesterday_Deaths').innerHTML = '+' + yesterday_deaths;
})