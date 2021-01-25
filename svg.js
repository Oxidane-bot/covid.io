

function my_cases() {
    d3.select("svg").remove();


// set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right + 100,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.2);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#main_svg").append("svg")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=newCasesByPublishDate&metric=" +
        "weeklyPeopleVaccinatedFirstDoseByVaccinationDate&metric=weeklyPeopleVaccinatedSecondDoseByVaccinationDate&format=csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
                d.newCasesByPublishDate = +d.newCasesByPublishDate;
                d.date = d.date.slice(5,)

        });


        // Scale the range of the data in the domains
        x.domain(data.map(function (d) {
            return d.date;
        }).slice(0, 28));//only need 28days from before
        y.domain([0, d3.max(data, function (d) {
            return d.newCasesByPublishDate;
        })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("fill", "#f58b25")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.date);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.newCasesByPublishDate);
            })
            .attr("height", function (d) {
                return height - y(d.newCasesByPublishDate);
            });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        responsive()
    });
}

function my_tests() {
    d3.select("svg").remove();

// set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right + 100,
        height = 500 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.2);
    var y = d3.scaleLinear()
        .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#main_svg").append("svg")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// get the data
    d3.csv("https://coronavirus.data.gov.uk/api/v1/data?filters=areaName=United%2520Kingdom;areaType=overview&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newVirusTests%22:%22newVirusTests%22,%22cumVirusTests%22:%22cumVirusTests%22%7D&format=csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d.newVirusTests = +d.newVirusTests;
            d.date = d.date.slice(5,)
        });


        // Scale the range of the data in the domains
        x.domain(data.map(function (d) {
            return d.date;
        }).slice(0, 28));//only need 28days from before
        y.domain([0, d3.max(data, function (d) {
            return d.newVirusTests;
        })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("fill","#0275d8")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.date);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.newVirusTests);
            })
            .attr("height", function (d) {
                return height - y(d.newVirusTests);
            });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.attr("transform","translate(50,20)")
        responsive()
    });

}

function my_deaths(){
    d3.select("svg").remove();


// set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right + 100,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.2);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#main_svg").append("svg")
        .attr('viewBox','0 0 1060 500' )
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.csv("https://coronavirus.data.gov.uk/api/v1/data?filters=areaType=overview&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%" +
        "22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newDeaths28DaysByDeathDate%22:%22newDeaths28DaysByDeathDate%22,%22cumDeaths28DaysByDeathDate%22:%22" +
        "cumDeaths28DaysByDeathDate%22%7D&format=csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d.newDeaths28DaysByDeathDate = +d.newDeaths28DaysByDeathDate;
            d.date = d.date.slice(5,)
        });


        // Scale the range of the data in the domains
        x.domain(data.map(function (d) {
            return d.date;
        }).slice(0, 28));//only need 28days from before
        y.domain([0, d3.max(data, function (d) {
            return d.newDeaths28DaysByDeathDate;
        })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("fill", "#d9534f")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.date);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.newDeaths28DaysByDeathDate);
            })
            .attr("height", function (d) {
                return height - y(d.newDeaths28DaysByDeathDate);
            });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        responsive()
    });



}
function responsive(){
    d3.select("svg")
        .attr('viewBox','0 0 1060 500' )
        .attr('preserveAspectRatio','xMidYMin')
}



