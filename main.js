class data_summary {
    static death_summary() {
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
            for (position = 1; data.map(function (data) {
                return data.value
            })[i + position] === ''; position++) {

            }
            let yesterday_deaths = eval(data.map(function (data) {
                return data.value
            })[i]) - eval(data.map(function (data) {
                return data.value
            })[i + position])

            document.getElementById('yesterday_Deaths').innerHTML = '+' + yesterday_deaths;
        })
    }

    static cases_and_tests_summary() {
        d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=cumAntibodyTestsByPublishDate&metric=cumCasesByPublishDate&metric=" +
            "cumTestsByPublishDate&metric=hospitalCases&metric=cumDeathsByPublishDate&format=csv", function (d) {
            let i = 0
            let yesterday_cases = (eval(d.map(function (d) {
                return d.cumCasesByPublishDate
            })[0]) - eval(d.map(function (d) {
                return d.cumCasesByPublishDate
            })[1]))


            for (i = 0; (d.map(function (d) {
                return d.cumTestsByPublishDate
            })[i]) === ''; i++) {

            }
            let yesterday_tests = (eval(d.map(function (d) {
                return d.cumTestsByPublishDate
            })[i]) - eval(d.map(function (d) {
                return d.cumTestsByPublishDate
            })[i + 1]))

            document.getElementById('yesterday_Cases').innerHTML = '+' + yesterday_cases;

            document.getElementById('yesterday_Tested').innerHTML = '+' + yesterday_tests;

            document.getElementById('total_Cases').innerHTML = d.map(function (d) {
                return d.cumCasesByPublishDate
            })[0];

            document.getElementById('total_Tested').innerHTML = d.map(function (d) {
                return d.cumTestsByPublishDate
            })[i];
        })
    }
}

class svg {
    static remove_former_svg() {
        d3.select("#summary").remove();
    }

    static draw_cases_svg() {

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right + 100,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
        var y = d3.scaleLinear()
            .range([height, 0]);


        var svg = d3.select("#main_svg").append("svg").attr("id", "summary")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=newCasesByPublishDate&metric=" +
            "weeklyPeopleVaccinatedFirstDoseByVaccinationDate&metric=weeklyPeopleVaccinatedSecondDoseByVaccinationDate&format=csv", function (error, data) {
            if (error) throw error;


            data.forEach(function (d) {
                d.newCasesByPublishDate = +d.newCasesByPublishDate;
                d.date = d.date.slice(5,)

            });


            x.domain(data.map(function (d) {
                return d.date;
            }).slice(0, 28));
            y.domain([0, d3.max(data, function (d) {
                return d.newCasesByPublishDate;
            })]);

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

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y));

            responsive()
        });
    }

    static draw_tests_svg() {

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right + 100,
            height = 500 - margin.top - margin.bottom;


        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
        var y = d3.scaleLinear()
            .range([height, 0]);


        var svg = d3.select("#main_svg").append("svg").attr("id", "summary")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        d3.csv("https://coronavirus.data.gov.uk/api/v1/data?filters=areaName=United%2520Kingdom;areaType=overview&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newVirusTests%22:%22newVirusTests%22,%22cumVirusTests%22:%22cumVirusTests%22%7D&format=csv", function (error, data) {
            if (error) throw error;

            data.forEach(function (d) {
                d.newVirusTests = +d.newVirusTests;
                d.date = d.date.slice(5,)
            });


            x.domain(data.map(function (d) {
                return d.date;
            }).slice(0, 28));//only need 28days from before
            y.domain([0, d3.max(data, function (d) {
                return d.newVirusTests;
            })]);


            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("fill", "#0275d8")
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


            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));


            svg.append("g")
                .call(d3.axisLeft(y));

            svg.attr("transform", "translate(50,20)")
            responsive()
        });

    }

    static draw_deaths_svg() {

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right + 100,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
        var y = d3.scaleLinear()
            .range([height, 0]);


        var svg = d3.select("#main_svg").append("svg").attr("id", "summary")
            .attr('viewBox', '0 0 1060 500')
            .attr('preserveAspectRatio', 'xMinYMin')
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


            x.domain(data.map(function (d) {
                return d.date;
            }).slice(0, 28));
            y.domain([0, d3.max(data, function (d) {
                return d.newDeaths28DaysByDeathDate;
            })]);


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


            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));


            svg.append("g")
                .call(d3.axisLeft(y));

            responsive()
        });
    }

    static draw_top_ten_svg() {

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


            let j ,i, x_list = [], y_list = []
            for (j = 0; j < 10; j++) {
                let data = find_greatest(array)
                ten_greatest.push(data[0])
                array.splice(data[1], 1)
            }
            for (i = 0; i < 10; i++) {
                y_list.push(ten_greatest[i][0])
                x_list.push(eval(ten_greatest[i][1]))
            }


            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 1060 - margin.left - margin.right + 100,
                height = 500 - margin.top - margin.bottom;


            var svg = d3.select("#second-svg").append("svg")
                .attr('viewBox', '0 0 1060 500')
                .attr('preserveAspectRatio', 'xMidYMin')

                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
            // let x_list = [], y_list = []
            // let i
            // for (i = 0; i < 10; i++) {
            //     y_list.push(ten_greatest[i][0])
            //     x_list.push(eval(ten_greatest[i][1]))
            // }
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
                    .attr('fill', 'crimson')
                    .attr('opacity', '0.8')
            })

            var yAxis = d3.axisLeft(yScale);
            var xAxis = d3.axisBottom(xScale);
            g.append('g').call(yAxis);
            g.append('g').call(xAxis).attr('transform', `translate(0, ${height - 6})`);
        })

    }
}

class btn_response {
    static draw_cases_main() {
        svg.remove_former_svg()
        svg.draw_cases_svg()
    }

    static draw_tests_main() {
        svg.remove_former_svg()
        svg.draw_tests_svg()
    }

    static draw_deaths_svg() {
        svg.remove_former_svg()
        svg.draw_deaths_svg()
    }
}

//make svg responsive
function responsive() {
    d3.selectAll("svg")
        .attr('viewBox', '0 0 1060 500')
        .attr('preserveAspectRatio', 'xMinYMin')
}

//only for top 10 high risk areas
function find_greatest(area_data_array) {
    let greatest = 0
    let greatest_pos
    for (let i = 0; i < area_data_array.length; i++) {
        if (eval(area_data_array[i][1]) > greatest) {
            greatest = eval(area_data_array[i][1])
            greatest_pos = i
        }
    }

    return [area_data_array[greatest_pos], greatest_pos]
}

data_summary.death_summary()
data_summary.cases_and_tests_summary()
svg.draw_cases_svg()
svg.draw_top_ten_svg()




