
var barChartSPTDepth = function () {

    var me = this;
    var checkedLabels = [];
    this.data = [];

    // Get Labels shown on X-axis
    this.getLabels = function() {
        return this.data.map(function(spt) { return spt.spt_name}); 
    };

    // Find max number of samples
    this.getMaxSamplesInSpt = function() {
        var max = 0;
        for (var index = 0; index < this.data.length ; index++) {
            if (this.data[index].samples.length > max) 
                max = this.data[index].samples.length;
        }
        return max;
    };

    // Get Dataset which consist of X-axis(labels) and Y-axis(dataset)
    this.getDatasets = function(filter, scope) {
        var datasets = [];
        var colors = Object.keys(chartColors);
       	//console.log(colors[0]);
        var maxSamples = this.getMaxSamplesInSpt();
        var lineDataset = {
            type: 'line',
            label:  'Depth to Water',
            stack: 'Stack 0',
            backgroundColor: chartColors.water,
            borderColor:  chartColors.water,
            data: [],
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false 
        };

        /*for (var i=0; i<8; i++) {
            	datasets[i]={
		                        type: 'bar',
		                        label:  colors[i],
		                        backgroundColor: chartColors[colors[i]],
		                        stack: 'Stack 0',
		                        data: []
		                    };	
		         //console.log(datasets[0].label);           
        }*/
        
        for (var index = 0; index < this.data.length; index++) {
            var samples = this.data[index].samples;
            //console.log(samples);
            if (filter && !filter.apply(scope || this, [this.data[index]])) {	//apply selected filter for displaying spts
                continue;
            }

            //for loop buidls Datasets to populate the stacked bar chart. It creates the Datasets with length equal to max samples in
            //any spt, and records the depth to bottom for S1,S2,...Si over all SPTs.
            //eg Datasets=[{B1S1,B2S1,B3S1..},{B1S2,B2S2,B3S2..},...{B1Si,B2Si,...}...] till maxsamples
            for (var sIndex = 0; sIndex < maxSamples; sIndex++) {
                var depth = samples[sIndex] ? samples[sIndex].depth_to_bottom * (-1) : 0;
                //uscs_color=samples[sIndex] ? samples[sIndex].uscs:'white';
                if (datasets.length >= (sIndex + 1)) {	//stacking depths for Si in given SPT 
                    datasets[sIndex].data.push(depth);
                    //console.log('if',uscs_color);
                } else {					//else executed first time while establishing the length of Datasets=maxsamples                
                    datasets.push({
                        type: 'bar',
                        label:  'Sample ' + (sIndex + 1),
                        backgroundColor: chartColors[colors[sIndex]],
                        stack: 'Stack 0',
                        data: [depth]
                    });
                }
            }
            

            /*for (var sIndex=0;sIndex < samples.length; sIndex++) {
            	var depth = samples[sIndex] ? samples[sIndex].depth_to_bottom * (-1) : 0;

				var uscs_code=samples[sIndex].uscs;            	
  		        uscs_index = colors.indexOf(uscs_code);
            	datasets[uscs_index].data.push(depth);
            	
            }*/	//end of inner-for

            lineDataset.data.push(this.data[index].dept_to_water * (-1));
            //console.log('end of loop',index);
        }	//end of outer-for
        datasets.unshift(lineDataset);
        return datasets;
    };					//end of getDatasaets()

    // Get chart data
    this.getChartData = function() {
        return {
            labels: this.getLabels(),
            datasets: this.getDatasets()
        };
    };

    // Initialize bar chart
    this.init = function(id, data, map) {
        var ctx = document.getElementById(id).getContext("2d");
        this.data = data;
        this.map = map;

        me.barChart = new Chart(ctx, {
            type: 'bar',
            data: this.getChartData(),
			options: {
                title:{
                    display:true,
                    text:"Basic Summary-should be a fence diagram"
                },
                tooltips: {
                    mode: 'nearest',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        position: 'top'
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 15
                    }
                },
                hover: {
                    onHover: this.onHover,
                    mode: 'point',
                    intersect: false
                } 
            }
        });
        $('#' + id).mouseleave(function () {
            me.map.removeHighlightMarker();
        });
    };

    // On checkbox state change of SPTs
    this.onChkSPTChange = function(e) {

        checkedLabels =$('.js-spt-checkboxes input[type="checkbox"]:checked').map(function(chck) { 
            return this.value;
        }).toArray();

        me.barChart.data.labels = checkedLabels;
        me.barChart.data.datasets = me.getDatasets(function(item) {
            return checkedLabels.indexOf(item.spt_name) > -1;
        }, this);

        me.barChart.update();
    };

    // Create SPT Checkboxes dynamically
    this.createCheckboxes = function() {
        var checkboxContainer = $('.js-spt-checkboxes');
        var labels = this.getLabels();

        for (var index = 0; index < labels.length; index++) {
            var div = document.createElement('div');
            var checkbox = document.createElement('input');
            var label = document.createElement('label');
            div.className += 'checkbox'   
            checkbox.setAttribute('type', 'checkbox');
            checkbox.className += 'c-spt-checkbox'; 
            checkbox.checked = true;
            checkbox.value = labels[index];
            checkbox.name = labels[index];
            checkbox.setAttribute('id', 'test-'+ labels[index]);
            checkbox.setAttribute('checked', true);
            label.appendChild(checkbox);
            label.innerHTML += labels[index];
            div.appendChild(label);
            checkboxContainer.append(div);
        }
        checkboxContainer.find(':checkbox').on('click', this.onChkSPTChange);
    };

/*    // Get Coordinates of SPT by spt_name
    this.getCoordinatesByLabel = function (label) {
        for (var index = 0; index < this.data.length; index++) {
            if (this.data[index].spt_name === label) {
                return {
                    lat: this.data[index].lat,
                    lng: this.data[index].lng
                };
            }
        }
        return false;            
    };*/

    // On Hover of bar chart to highlight in map
    this.onHover = function (event, chartElements) {
        var label, coordinates;

        if (chartElements && chartElements.length) {
            label = chartElements[0]._model.label;
            me.map.removeHighlightMarker();            
            if (label) {
                me.map.highlightMarker(label);
            }
        }
    };

    return this;
};
