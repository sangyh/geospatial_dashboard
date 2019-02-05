var pointBlowsEle = function () {
    var me = this;

    this.data = [];

    this.maxEle = Infinity * (-1);
    this.minEle = Infinity;

    // Get Datasets which contain numerical values
    this.getDatasets = function() {
        var colors = Object.keys(chartColors);
        var datasets = [];

        for (var index = 0; index < this.data.length; index++) {
            var samples = this.data[index].samples;
            datasets.push({
                label: this.data[index].spt_name,
                borderColor: chartColors[colors[index]],
                backgroundColor: chartColors[colors[index]],
                fill: false,
                pointRadius: 5,
                pointHoverRadius: 7,
                showLine: false,
                data: []
            });

            for (var sIndex = 0; sIndex < samples.length; sIndex++) {
                if (this.maxEle < samples[sIndex].elevation) this.maxEle = samples[sIndex].elevation;
                if (this.minEle > samples[sIndex].elevation) this.minEle = samples[sIndex].elevation;

                datasets[index].data.push({
                    x: samples[sIndex].blows,
                    y: samples[sIndex].elevation
                });
            }
        }

        return datasets;
    };

    // Get Chart data
    this.getChartData = function() {
        return {
            datasets: this.getDatasets()
        }
    };

    // Initialization of Point chart
    this.init = function (id, data) {
        var ctx = document.getElementById(id).getContext("2d");
        this.data = data;
        me.barChart = Chart.Scatter(ctx, {
            data: this.getChartData(),
            options: {
                title:{
                    display: true,
                    text:"SPT Blow Counts by Elevation"
                },
                tooltips: {
                    mode: 'nearest',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        position: 'bottom'
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            min: this.minEle,
                            max: this.maxEle,
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                },
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 15
                    }
                }
            }
        });
    };
};