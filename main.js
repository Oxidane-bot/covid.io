/**
 * takes input data from an api and change the numbers in
 * index.html data summary table.
 * Class contains functions that allows the data summary table changes in real time
 *  */
class data_summary {

    /**
     * 'value' inside data.value indicates deaths quantity in the input csv file(a column)
     */
    static death_summary() {
        //getting input
        d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=cumDeaths28DaysByDeathDate" +
            "&metric=cumDeaths28DaysByPublishDate&metric=newDeaths28DaysByDeathDateAgeDemographics&format=csv", function (data) {
            // these two for loops in order to pass those empty blocks might exist in the column of death cases.
            let i
            for (i = 0; (data.map(function (data) {
                return data.value
            })[i]) === ''; i++) {

            }

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
            //computations done, replace data
            document.getElementById('yesterday_Deaths').innerHTML = '+' + yesterday_deaths;

            document.getElementById('total_Deaths').innerHTML = data.map(function (data) {
                return data.value
            })[i];
        })
    }

    /**
     * 'cumCasesByPublishDate' inside d.cumCasesByPublishDate indicates total cases quantity in the input csv file(a column)
     * 'cumTestsByPublishDate' inside d.cumTestsByPublishDate indicates total tests quantity in the input csv file(another column)
     */
    static cases_and_tests_summary() {
        //getting input
        d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=cumAntibodyTestsByPublishDate" +
            "&metric=cumCasesByPublishDate&metric=cumTestsByPublishDate&metric=hospitalCases&metric=cumDeathsByPublishDate&format=csv", function (d) {

            //today's total - yesterday's total = today's new
            let yesterday_cases = (eval(d.map(function (d) {
                return d.cumCasesByPublishDate
            })[0]) - eval(d.map(function (d) {
                return d.cumCasesByPublishDate
            })[1]))

            //to skip empty blocks
            let i = 0
            for (i = 0; (d.map(function (d) {
                return d.cumTestsByPublishDate
            })[i]) === ''; i++) {

            }
            let yesterday_tests = (eval(d.map(function (d) {
                return d.cumTestsByPublishDate
            })[i]) - eval(d.map(function (d) {
                return d.cumTestsByPublishDate
            })[i + 1]))

            //computations done, replace data
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


/**
 * contains all svg drawing functions
 */
class svg {
    /**
     * remove former svg before drawing new svg when pressing buttons
     */
    static remove_former_svg() {
        d3.select("#summary").remove();
    }

    /**
     * draw_cases_svg(), draw_tests_svg(), draw_deaths_svg() shared the same idea of drawing bar chart,
     * i will just comment the first one.
     * ps:i tried to fit them in a class using constructor, but turns out "this.value" can't fit in d3.js syntax
     */
    static draw_cases_svg() {
        //setting margin for svg
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right + 100,
            height = 500 - margin.top - margin.bottom;
        //range from 0 to width
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
        var y = d3.scaleLinear()
            .range([height, 0]);

        //draw svg in #main_svg inside html, giving them a id of summary(cuz i need to remove them when press button)
        var svg = d3.select("#main_svg").append("svg").attr("id", "summary")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //ger data and error handling
        d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=newCasesByPublishDate&metric=" +
            "weeklyPeopleVaccinatedFirstDoseByVaccinationDate&metric=weeklyPeopleVaccinatedSecondDoseByVaccinationDate&format=csv", function (error, data) {
            if (error) throw error;

            //data inside this particular api was in string, format data into numbers, and date in to mm-dd form
            data.forEach(function (d) {
                d.newCasesByPublishDate = +d.newCasesByPublishDate;
                d.date = d.date.slice(5,)

            });

            //only takes 29 days from now
            x.domain(data.map(function (d) {
                return d.date;
            }).slice(0, 28));
            y.domain([0, d3.max(data, function (d) {
                return d.newCasesByPublishDate;
            })]);

            //append bars to svg
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("fill", "#f58b25") //change colour here
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

            //x-axis and y-axis
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
        d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=overview&metric=newDeaths28DaysByPublishDate" +
            "&format=csv", function (error, data) {
            if (error) throw error;

            // format the data
            data.forEach(function (d) {
                d.newDeaths28DaysByPublishDate = +d.newDeaths28DaysByPublishDate;
                d.date = d.date.slice(5,)
            });


            x.domain(data.map(function (d) {
                return d.date;
            }).slice(0, 28));
            y.domain([0, d3.max(data, function (d) {
                return d.newDeaths28DaysByPublishDate;
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
                    return y(d.newDeaths28DaysByPublishDate);
                })
                .attr("height", function (d) {
                    return height - y(d.newDeaths28DaysByPublishDate);
                });


            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));


            svg.append("g")
                .call(d3.axisLeft(y));

            responsive()
        });
    }

    /**
     * find top 10 areas in the csv file
     */
    static draw_top_ten_svg() {

        d3.csv("https://coronavirus.data.gov.uk/api/v2/data?areaType=utla&metric=newCasesByPublishDate&format=csv", function (data) {
            // since original data contains many days figure, but we only need a day
            var today = new Date(),
             dd = String(today.getDate()).padStart(2, '0'),
             mm = String(today.getMonth() + 1).padStart(2, '0'),
             yyyy = today.getFullYear(),
             array = [],
             ten_greatest = []  // creat a array to store sorted city and new cases
            dd = String(+dd - 2)
            let yesterday = yyyy + '-' + mm + '-' + dd;

            data.forEach(function (d) {
                if (d.date === yesterday) {
                    array.push([d.areaName, d.newCasesByPublishDate])
                }

            })

            //sorting data
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

            //make svg responsive
            var svg = d3.select("#second-svg").append("svg")
                .attr('viewBox', '0 0 1060 500')
                .attr('preserveAspectRatio', 'xMidYMin')

                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

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
                    .attr('fill', 'crimson')  //change colour here
                    .attr('opacity', '0.8')
            })

            var yAxis = d3.axisLeft(yScale);
            var xAxis = d3.axisBottom(xScale);
            g.append('g').call(yAxis);
            g.append('g').call(xAxis).attr('transform', `translate(0, ${height - 6})`);
        })

    }
}


/**
 * give button functionality
 */
class button{
    /**
     *
     * @param datatype {string} shows what kind of data we looking at
     */
    constructor(datatype) {
        this.datatype=datatype
    }

    /**
     * run at different button onclick
     */
    response(){
        if(this.datatype==="cases"){
            svg.remove_former_svg()
            svg.draw_cases_svg()
        } else if (this.datatype==="deaths"){
            svg.remove_former_svg()
            svg.draw_deaths_svg()
        }else{
            svg.remove_former_svg()
            svg.draw_tests_svg()
        }

    }

}
/**
 * make svg responsive
 */
function responsive() {
    d3.selectAll("svg")
        .attr('viewBox', '0 0 1060 500')
        .attr('preserveAspectRatio', 'xMinYMin')
}

/**
 * only works for top 10 high risk svg for sorting out highest areas
 * @param area_data_array an array where each element's[0] stores area name and [1] stores cases number
 * @returns {(*|number)[]}
 */
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

/**
 * making button object
 */
let cases_button = new button("cases")
let deaths_button = new button("deaths")
let tests_button = new button("tests")

/**
 * call them
 */
data_summary.death_summary()
data_summary.cases_and_tests_summary()
svg.draw_cases_svg()
svg.draw_top_ten_svg()




