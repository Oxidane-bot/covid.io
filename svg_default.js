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
    // .attr('viewBox','0 0 1060 500')
    // .attr('preserveAspectRatio','xMinYMin')
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
function find_greatest(area_data_array){
    let greatest = 0
    let greatest_pos
    for (i=0;i <area_data_array.length;i++){
        if(eval(area_data_array[i][1])>greatest){
            greatest = eval(area_data_array[i][1])
            greatest_pos = i
        }
    }

    return [area_data_array[greatest_pos],greatest_pos]
}

    d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=utla&metric=newCasesByPublishDate&format=csv", function (data) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        let array = []
        let ten_greatest = []
        dd = String(+dd - 2)
        let yesterday = yyyy + '-' + mm + '-' + dd;
        data.forEach(function (d) {
            if (d.date === yesterday) {

                array.push([d.areaName, d.newCasesByPublishDate])
            }

        })
        for (j = 0; j < 10; j++) {
            let data = find_greatest(array)
            ten_greatest.push(data[0])
            array.splice(data[1], 1)
        }

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 1060 - margin.left - margin.right + 100,
            height = 500 - margin.top - margin.bottom;

// set the ranges
//     var x = d3.scaleBand()
//         .range([0, width])
//         .padding(0.1);
//     var y = d3.scaleLinear()
//         .range([height, 0]);

        var svg = d3.select("#second-svg").append("svg")
            .attr('viewBox', '0 0 1060 500')
            .attr('preserveAspectRatio', 'xMidYMin')
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        let x_list = [], y_list = []
        for (i = 0; i < 10; i++) {
            y_list.push(ten_greatest[i][0])
            x_list.push(eval(ten_greatest[i][1]))
        }
        const g = svg.append('g').attr('id', 'maingroup')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        let xScale = d3.scaleLinear().domain([0, d3.max(x_list)]).range([0, width]);

        let yScale = d3.scaleBand().domain(y_list).range([0, height])
            .padding(0.1);
        ten_greatest.forEach(datum => {
            g.append('rect')
                .attr('width', xScale(datum[1]))
                .attr('height', yScale.bandwidth())
                .attr('y', yScale(datum[0]))
                .attr('fill', 'red')
                .attr('opacity', '0.8')
        })

        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale);
        g.append('g').call(yAxis);
        g.append('g').call(xAxis).attr('transform', `translate(0, ${height - 6})`);

        // d3.select("svg")

    })
