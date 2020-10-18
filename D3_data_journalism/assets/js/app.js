// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 960;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
// var parseTime = d3.timeParse("%Y");

// Load data from forcepoints.csv
d3.csv("assets/data/data.csv").then(data => {

  // Print the forceData
  console.log(data);

  // Format the date and cast the force value to a number
  data.forEach(data => {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data.poverty);
    console.log(data.healthcare);
  });




  
  // d3.extent returns the an array containing the min and max values for the property specified
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(data, data => +data.poverty))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(data, data => +data.healthcare))
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  
  // var drawScatter = d3.
  
  
  // Add dots
  svg.append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function (d) { return xLinearScale(d.poverty) + margin.left; } )
    .attr("cy", function (d) { return yLinearScale(d.healthcare) + margin.top; } )
    .attr("r", 10)
    .style("fill", "#69b3a2")

  
  
  var drawLine = d3.line()
    .x(data => xLinearScale(data.poverty))
    .y(data => yLinearScale(data.healthcare));

  // Append an SVG path and plot its points using the line function
  // chartGroup.append("path")
  //   // The drawLine function returns the instructions for creating the line for forceData
  //   .attr("d", drawLine(data))
  //   .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // //Create the ISO country codes as text elements
  // chartgroup.append("g")
  // .selectAll("text")
  // .attr("font-family", "Yanone Kaffeesatz")
  // .attr("font-weight", 700)
  // .attr("text-anchor", "middle")
  // .selectAll("text")
  // .data(data)
  // .join("text")
  // // .attr("id", "isoCode")
  // .attr("opacity", 1)
  // // .attr("dy", "0.35em")
  // .attr("x", d => xLinearScale(d.poverty))
  // .attr("y", d => yLinearScale(d.healthcare)}
  // .attr("font-size", "15px")
  // .attr("fill", "#000000")
  // // .text(data => data.abbr); 


  }).catch(error => console.log(error));
