//Function to set up the tabs interaction
function showVis(evt) {
    // Declare all variables
    let i, tablinks;

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    console.log(tablinks);

    // Show the current tab, and add an "active" class to the button that opened the tab
    evt.currentTarget.className += " active";
}

//Setting up the SVG where we'll be appending everything for our chart
const width = document.querySelector("#chart").clientWidth;
const height = document.querySelector("#chart").clientHeight;
const margin = { top: 50, left: 150, right: 50, bottom: 150 };

const legendWidth = document.querySelector("#legend").clientWidth;
const legendHeight = document.querySelector("#legend").clientHeight;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const legend = d3.select("#legend")
    .append("svg")
    .attr("width", legendWidth)
    .attr("height", legendHeight);

const keys = ["imports", "exports"]

//The color scale
const colorScale = d3.scaleOrdinal()
    .range(["#89736D", "#C5A097"])

/*creating the actual SVG */
const svgLine = d3.select("#chartLine")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const legendLine = d3.select("#legendLine")
    .append("svg")
    .attr("width", legendWidth)
    .attr("height", legendHeight);

const keysLine = ["Cotton", "Linen", "Wool", "Silk", "Synthetic"]

//The color scale
const colorScaleLine = d3.scaleOrdinal()
    .range(["#FFCDBC", "#F5853F", "#7C3626", "#2D080A", "#130303"])

// Variables for the buttons so we can set up event listeners
const CottonBtn = d3.select("#Cotton");
const SilkBtn = d3.select("#Silk");
const LinenBtn = d3.select("#Linen");
const SyntheticBtn = d3.select("#Synthetic");
const WoolBtn = d3.select("#Wool");

console.log(CottonBtn);

d3.csv("./data/US_Textile_Fiber_trade.csv", parse).then(function (data) {

    /* filter subset of data, grabbing only the rows where the country = China */
    const imports = data.filter(d => d.import_export === "import" && d.fiber_type === "raw_cotton" && d.year === 2020);
    const exports = data.filter(d => d.import_export === "export" && d.fiber_type === "raw_cotton" && d.year === 2020);

    const importsSilk = data.filter(d => d.import_export === "import" && d.fiber_type === "raw_silk" && d.year === 2020);
    const exportsSilk = data.filter(d => d.import_export === "export" && d.fiber_type === "raw_silk" && d.year === 2020);

    const importsLinen = data.filter(d => d.import_export === "import" && d.fiber_type === "raw_linen" && d.year === 2020);
    const exportsLinen = data.filter(d => d.import_export === "export" && d.fiber_type === "raw_linen" && d.year === 2020);

    const importsSynthetic = data.filter(d => d.import_export === "import" && d.fiber_type === "raw_synthetic" && d.year === 2020);
    const exportsSynthetic = data.filter(d => d.import_export === "export" && d.fiber_type === "raw_synthetic" && d.year === 2020);

    const importsWool = data.filter(d => d.import_export === "import" && d.fiber_type === "raw_wool" && d.year === 2020);
    const exportsWool = data.filter(d => d.import_export === "export" && d.fiber_type === "raw_wool" && d.year === 2020);

    const filtered = data.filter(d => d.import_export === "import" && d.year === 2020);

    console.log(imports)

    // Cotton
    let nestedimports = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(imports)

    nestedimports.forEach(d => d.key = +d.key)

    let nestedexports = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(exports)

    nestedexports.forEach(d => d.key = +d.key)

    // Linen
    let nestedimportsLinen = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(importsLinen)

    nestedimportsLinen.forEach(d => d.key = +d.key)

    let nestedexportsLinen = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(exportsLinen)

    nestedexportsLinen.forEach(d => d.key = +d.key)

    // Wool
    let nestedimportsWool = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(importsWool)

    nestedimportsWool.forEach(d => d.key = +d.key)

    let nestedexportsWool = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(exportsWool)

    nestedexportsWool.forEach(d => d.key = +d.key)

    // Synthetic
    let nestedimportsSynthetic = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(importsSynthetic)

    nestedimportsSynthetic.forEach(d => d.key = +d.key)

    let nestedexportsSynthetic = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(exportsSynthetic)

    nestedexportsSynthetic.forEach(d => d.key = +d.key)

    // Silk
    let nestedimportsSilk = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(importsSilk)

    nestedimportsSilk.forEach(d => d.key = +d.key)

    let nestedexportsSilk = d3.nest()
    .key(d => d.month)
    .rollup(d => d3.sum(d, g => g.value))
    .entries(exportsSilk)

    nestedexportsSilk.forEach(d => d.key = +d.key)

    // Line chart
    let nested = d3.nest()
        .key(d=> d.fiber_type)
        .key(d=>d.month)
        .rollup(d=>d3.sum(d,g => g.value))
        .entries(filtered);

        console.log(nested)

    nested.forEach(d => {
 
        d.values.forEach(p => p.key = +p.key);
    
    })
   
        console.log(nested);

    // Define the div for the tooltip
    let div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

    // // Initialize brushing component
    // let currentBrushRegion = null;

    //scales: we'll use a band scale for the bars
    // const xScale = d3.scaleBand()
    //     .domain(nestedimports.map(d => d.key))
    //     .range([margin.left, width - margin.right])
    //     .padding(0.1);

    // const yScale = d3.scaleLinear()
    //     .domain([0, d3.max(nestedimports, d => d.value)])
    //     .range([height - margin.bottom, margin.top]);

    // //scales: we'll use a band scale for the bars
    const xScaleExports = d3.scaleBand()
        .domain(nestedexports.map(d => d.key))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const yScaleExports = d3.scaleLinear()
        .domain([0, d3.max(nestedexports, d => d.value)])
        .range([height - margin.bottom, margin.top]);

    //scales - xScale is a linear scale of the years
    const xScaleLine = d3.scaleLinear()
        // .domain([d3.min(filtered_data, d => d.year), d3.max(filtered_data, d => d.year)])
        .domain([1,12])
        .range([margin.left, width - margin.right]);

    //yScale is a linear scale with a minimum value of 0 and a maximum bsed on the population maximum
    const yScaleLine = d3.scaleLinear()
        .domain([0,d3.max(nested[4].values, d => d.value)])
        .range([height - margin.bottom, margin.top]);
        // .domain(1,1000000000)
        // .range([height - margin.bottom, margin.top])

    //set up the x and y values of your line
    const line = d3.line()
        .x(d => xScaleLine(d.key))
        .y(d => yScaleLine(d.value))

    //draw the path
    const pathCotton = svgLine.append("path")
        .datum(nested[0].values)
        .attr("d", d => line(d))
        .attr("stroke", "#FFCDBC")
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Cotton")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	});

    const pathLinen = svgLine.append("path")
        .datum(nested[1].values)
        .attr("d", d => line(d))
        .attr("stroke", "#F5853F")
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Linen")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	});

    const pathWool = svgLine.append("path")
        .datum(nested[2].values)
        .attr("d", d => line(d))
        .attr("stroke", "#7C3626")
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Wool")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	});

    const pathSilk = svgLine.append("path")
        .datum(nested[3].values)
        .attr("d", d => line(d))
        .attr("stroke", "#2D080A")
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Silk")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	});

    const pathSynthetic = svgLine.append("path")
        .datum(nested[4].values)
        .attr("d", d => line(d))
        .attr("stroke", "#130303")
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Synthetic")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	});

        const xAxisLine = svgLine.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleLine).tickFormat(
            function (label) {
                switch (label) {
                    case 1:
                        return "Jan";
                    case 2:
                        return "Feb";
                    case 3:
                        return "Mar";
                    case 4:
                        return "Apr";
                    case 5:
                        return "May";
                    case 6:
                        return "Jun";
                    case 7:
                        return "Jul";
                    case 8:
                        return "Aug";
                    case 9:
                        return "Sep";
                    case 10:
                        return "Oct";
                    case 11:
                        return "Nov";
                    case 12:
                        return "Dec";
                    default:
                        return "";
                }
            }
            
            // d3.format("Y")
            
            ));

    const yAxisLine = svgLine.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft()
            .scale(yScaleLine)
            .tickFormat(d3.format(".2s"))); //use d3.format to customize your axis tick format

    const xAxisLabelLine = svgLine.append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 2)
        .text("Months in 2020");
    
    const yAxisLabelLine = svgLine.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left / 2)
        .text("Pounds");

    const legendRectsLine = legendLine.selectAll("rect")
        .data(keysLine)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d,i) => i * 30)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", d => colorScaleLine(d))
    
    const legendLabelsLine = legendLine.selectAll("text")
        .data(keysLine)
        .enter()
        .append("text")
        .attr("class", "legendLabel")
        .attr("x", 27)
        .attr("y", (d,i) => i * 30 + 15)
        .text(d => d)

    /*making the bars in the barchart:
    uses filtered data
    defines height and width of bars
    */

   

    const xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height - margin.bottom})`);

    const yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`);

    const xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 2)
        .text("Months in 2020");

    const yAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left / 2)
        .text("Pounds");

            //draw the legend
    const legendRects = legend.selectAll("rect")
    .data(keys)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d,i) => i * 30)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => colorScale(d))

const legendLabels = legend.selectAll("text")
    .data(keys)
    .enter()
    .append("text")
    .attr("class", "legendLabel")
    .attr("x", 27)
    .attr("y", (d,i) => i * 30 + 15)
    .text(d => d)
    
//this function handles the data-driven elements
function draw(datasetimports, datasetexports) {

    //scales
    //scales: we'll use a band scale for the bars
    let xScale = d3.scaleBand()
        .domain(datasetimports.map(d => d.key))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(datasetimports, d => d.value)])
        .range([height - margin.bottom, margin.top]);


    //a little helper function for better transitions
    function zeroState(selection) {
        selection.attr('r', 0);
    }

    let bar = svg.selectAll(".importBars")
    .data(datasetimports);

    bar.enter()
    .append("rect")
    .attr("class", "importBars")
    .attr("x", d => xScale(d.key))
    .attr("y", d => yScale(d.value))
    .attr("width", xScale.bandwidth()/2)
    .attr("height", d => height - margin.bottom - yScale(d.value))
    .attr("fill", "#89736D")
    .call(zeroState)
    .merge(bar)
    .transition()
    .duration(500)
    .attr("x", d => xScale(d.key))
    .attr("y", d => yScale(d.value))
    .attr("width", xScale.bandwidth()/2)
    .attr("height", d => height - margin.bottom - yScale(d.value))
    .attr("fill", "#89736D")
    // .on("mouseover", function(d) {		
    //     div.transition()		
    //         .duration(200)		
    //         .style("opacity", .9);		
    //     div	.html(Math.round(d.value))	
    //         .style("left", (d3.event.pageX) + "px")		
    //         .style("top", (d3.event.pageY - 28) + "px");	
    //     })					
    // .on("mouseout", function(d) {		
    //     div.transition()		
    //         .duration(500)		
    //         .style("opacity", 0);	})

    
    ;

let barExports = svg.selectAll(".exportBars")
    .data(datasetexports);

    barExports.enter()
    .append("rect")
    .attr("class", "exportBars")
    .attr("x", d => xScale(d.key) + xScaleExports.bandwidth()/2)
    .attr("y", d => yScale(d.value))
    .attr("width", xScaleExports.bandwidth()/2)
    .attr("height", d => height - margin.bottom - yScale(d.value))
    .attr("fill", "#C5A097")
    // .call(zeroState)
    .merge(barExports)
    .transition()
    .duration(500)
    .attr("x", d => xScale(d.key) + xScaleExports.bandwidth()/2)
    .attr("y", d => yScale(d.value))
    .attr("width", xScaleExports.bandwidth()/2)
    .attr("height", d => height - margin.bottom - yScale(d.value))
    .attr("fill", "#C5A097")
    // .on("mouseover", function(d) {		
    //     div.transition()		
    //         .duration(200)		
    //         .style("opacity", .9);		
    //     div	.html(Math.round(d.value))	
    //         .style("left", (d3.event.pageX) + "px")		
    //         .style("top", (d3.event.pageY - 28) + "px");	
    //     })					
    // .on("mouseout", function(d) {		
    //     div.transition()		
    //         .duration(500)		
    //         .style("opacity", 0);	});
    ;

    bar.exit()
    .transition()
    .duration(500)
    //call zero state again so the circles leave the way they came in
    .call(zeroState)
    .remove();

    barExports.exit()
    .transition()
    .duration(500)
    //call zero state again so the circles leave the way they came in
    .call(zeroState)
    .remove();

    //axis updates
    xAxis.transition().duration(500).call(d3.axisBottom().scale(xScale).tickFormat(
        function (label) {
            switch (label) {
                case 1:
                    return "Jan";
                case 2:
                    return "Feb";
                case 3:
                    return "Mar";
                case 4:
                    return "Apr";
                case 5:
                    return "May";
                case 6:
                    return "Jun";
                case 7:
                    return "Jul";
                case 8:
                    return "Aug";
                case 9:
                    return "Sep";
                case 10:
                    return "Oct";
                case 11:
                    return "Nov";
                case 12:
                    return "Dec";
                default:
                    return "";
            }
        }));
    yAxis.transition().duration(500).call(d3.axisLeft().scale(yScale).tickFormat(d3.format(".2s")))};

    //initialize with the Cotton
    draw(nestedimports, nestedexports);


    //buttons handles switching between datasets
   CottonBtn.on("click", function () {
        draw(nestedimports, nestedexports);
    });
    SilkBtn.on("click", function () {
        draw(nestedimportsSilk, nestedexportsSilk);
    });
    SyntheticBtn.on("click", function () {
        draw(nestedimportsSynthetic,nestedexportsSynthetic);
    });
    LinenBtn.on("click", function () {
        draw(nestedimportsLinen, nestedexportsLinen);
    });
    WoolBtn.on("click", function () {
        draw(nestedimportsWool, nestedexportsWool);
    });

});


//get the data in the right format
function parse(d) {
    return {
        fiber_type: d.fiber_type, //cotton, silk, wool, etc.
        import_export: d.import_export, //this is a binary value
        category: d.category, //yarn, apparel, home, etc.
        sub_category: d.sub_category, //type of yarn, type of home
        year: +d.year, //we want this as a number
        month: +d.month, //we want this as a number
        value: +d.value //we want this as a number
    }
}

