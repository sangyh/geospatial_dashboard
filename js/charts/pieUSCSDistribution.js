var pieUSCSDistribution = function() {
    var me = this;
    var labels = [];
    this.data = [];

    // Get Labels like CL, SC
    this.getLabels = function () {
        var samples = this.data;

        for (var index = 0; index < samples.length; index++) {
            if (labels.indexOf(samples[index].uscs) === -1) labels.push(samples[index].uscs);
        }

        return labels;
    };

    // Get Dataset which is numerical data
    this.getDatasets = function () {
        var dataset = [];
        var labels = this.getLabels();
        var samples = this.data;

        for (var index = 0; index < labels.length; index++) dataset.push(0);

        for (var index = 0; index < samples.length; index++) {
            var uscsIndex = labels.indexOf(samples[index].uscs);
            if (uscsIndex === -1) continue;
            dataset[uscsIndex]++;
        }
        return dataset;
    };

    // Get Different chart colors based on index
    this.getBackgroundColors = function () {
        var colors = Object.keys(chartColors);
        var backgroundColors = [];

        for (var index = 0; index < colors.length; index++) 
            backgroundColors.push(chartColors[colors[index]]);

        return backgroundColors;
    };

    // Initialization of Pie Charts
    this.init = function (id, data, title) {
        this.data = data;
        
        var ctx = document.getElementById(id).getContext("2d");
            me.myPie = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: this.getDatasets(),
                    backgroundColor: this.getBackgroundColors(),
                    label: 'Dataset 1'
                }],
                labels: this.getLabels()
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: title || ''
                },
                legend: {
                    position: 'bottom'
                }
            }
        });
    }

    return this;
};