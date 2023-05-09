//  url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// fetch the JSON 
d3.json(url).then(function(data) {
  console.log(data);
});

//  dashboard start up 
function init() {

    // dropdown
    let dropdownMenu = d3.select("#selDataset");

    // names 
    d3.json(url).then((data) => {
        
       
        let names = data.names;

        
        names.forEach((id) => {

            
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        //  list
        let sample_one = names[0];

        
        console.log(sample_one);

        //  plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);

    });
};

// metadata 
function buildMetadata(sample) {

    
    d3.json(url).then((data) => {

        // all metadata
        let metadata = data.metadata;

        // filter
        let value = metadata.filter(result => result.id == sample);

        
        console.log(value)

        
        let valueData = value[0];

        
        d3.select("#sample-metadata").html("");

        
        Object.entries(valueData).forEach(([key,value]) => {

            
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// bar chart
function buildBarChart(sample) {

    // data
    d3.json(url).then((data) => {

        //sample data
        let sampleInfo = data.samples;

        
        let value = sampleInfo.filter(result => result.id == sample);

        
        let valueData = value[0];

        
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        
        console.log(otu_ids,otu_labels,sample_values);

        // descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        
        Plotly.newPlot("bar", [trace], layout)
    });
};

//  bubble chart
function buildBubbleChart(sample) {

    // data
    d3.json(url).then((data) => {
        
        
        let sampleInfo = data.samples;

        
        let value = sampleInfo.filter(result => result.id == sample);

        
        let valueData = value[0];

        
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

       
        console.log(otu_ids,otu_labels,sample_values);
        
        
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Greens"
            }
        };

        
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        
        Plotly.newPlot("bubble", [trace1], layout)
    });
};


function optionChanged(value) { 

    // log value
    console.log(value); 

    // call functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};


init();
