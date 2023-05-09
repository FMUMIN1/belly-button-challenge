// fetch
d3.json(url).then(function(data) {
    console.log(data);
  });
  
  //  dashboard start up 
  function init() {
  
      // dropdown menu
      let dropdownMenu = d3.select("#selDataset");
  
      // populate
      d3.json(url).then((data) => {
          
          // names
          let names = data.names;
  
          
          names.forEach((id) => {
  
              
              console.log(id);
  
              dropdownMenu.append("option")
              .text(id)
              .property("value",id);
          });
  
          // first name thats on this list
          let sample_one = names[0];
  
          
          console.log(sample_one);
  
          // plot
          buildGaugeChart(sample_one);
      });
  };
  
  // gauge chart
  function buildGaugeChart(sample) {
  
      
      d3.json(url).then((data) => {
  
         
          let metadata = data.metadata;
  
          
          let value = metadata.filter(result => result.id == sample);
  
          
          console.log(value)
  
          
          let valueData = value[0];
  
          
          let washFrequency = Object.values(valueData)[6];
          
          
          let trace2 = {
              value: washFrequency,
              domain: {x: [0,1], y: [0,1]},
              title: {
                  text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                  font: {color: "black", size: 16}
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                  axis: {range: [0,10], tickmode: "linear", tick0: 1/2, dtick: 1-2},
                  bar: {color: "grey"},
                  steps: [
                      {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                      {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                      {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                      {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                      {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                      {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                      {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                      {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                      {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                      {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
                  ]
              } 
          };
  
          
          let layout = {
              width: 400, 
              height: 400,
              margin: {t: 0, b:0}
          };
  
          
          Plotly.newPlot("gauge", [trace2], layout)
      });
  };
  
  
  init();