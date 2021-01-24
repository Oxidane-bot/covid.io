// Set of data
var dataset = [31, 64, 42, 28, 16, 32, 64, 10];


// Create our SVG container
var svg = d3.select("#bar-chart")
    .append("svg")
    .attr('viewBox','0 0 1200 800' )
    .attr('preserveAspectRatio','xMinYMin');



var bars = svg.append('g')
    .attr('class', 'bars');


// Bind data to chart, and create bars
bars.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d,i) => i*25 )
    .attr('y', (d) => 100-d)
    .attr('width', 20)
    .attr('height', (d) => d);
