// create svgHeight and svgWidth variables 
var svgWidth = 1000;
var svgHeight = 600;

// create the margin variable
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 80
};

// create width and height variable 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG that will hold the chart
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group and move it with transform
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import data from csv
d3.csv("data/data.csv").then(function(healthData){
    console.log(healthData);
    
    healthData.forEach(function(data){
        console.log(data);
        // grab the necessary variables for the plot,
        //make sure poverty and healthcare variables are integers
        data.poverty = + data.poverty;
        data.healthcare = + data.healthcare
    });
    
    // create x and y scales for the plot
    var xScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.poverty) * 0.9, d3.max(healthData, d => d.poverty) * 1.1])
    .range([0, width]);
    
    var yScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.healthcare) * 0.8, d3.max(healthData, d => d.healthcare) * 1.1])
    .range([height, 0]);

    // create x and y axis
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // create circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d=> yScale(d.healthcare))
        .attr("r", 16)
        .attr("fill", "lightblue")
        
    // add the text to the circles
    var textSelection = chartGroup.selectAll('.text')
    console.log(textSelection)

        textSelection.data(healthData)
        .enter()
        .append("text")
        .classed('text', true)
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .attr("transform", `translate(-10, 6)`)
        .text(d => {
            return d.abbr
        })
        .style("fill", "white" )


    // create label group for lx and y abels    
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20 })`);

    // create x label variable
    var xLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .text("In Poverty (%) ")
        .style("font-weight", "bold")

    
    // create y label variable
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height/2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .text("Locks Healthcare (%)")
        .style("font-weight", "bold")



    
    
    

    // // add tooltips
    // var toolTip = d3.select("body").append("div")
    //     .attr("class", "d3-tip")
    

//     circlesGroup.on("mouseover", function(data) {
//         toolTip.style("display", "block")
//         toolTip.html(function(d) {
//             return (`${d.state}<br>${d.pobverty}<br>${d.healthcare}`);
//           })
//         .style("left", d3.event.pageX + "px")
//         .style("top", d3.event.pageY + "px");
// ;
//     })
//         // // onmouseout event
//         // .on("mouseout", function(data, index) {
//         // toolTip.hide(data);
//         // });
    
//     return circlesGroup;
        
    




  })

