/*global app, $on */
var charts = {
    barChartSPTDepth: barChartSPTDepth,
    pieUSCSDistribution: pieUSCSDistribution,
    pointBlowsEle: pointBlowsEle
};

// Create USCS Distibution Pie charts based of data
var createPieUSCSDistributionCharts = function() {
    var uscsCharts = $('.uscs-charts');
    var pieUSCSDistributions = []; 
 
    for (var index = 0; index < data.length; index++) {
        var id = 'pie-'+ data[index].spt_name;
        var title = data[index].spt_name + ' USCS Distribution';
        uscsCharts.append('<div class="col-md-3"><canvas id="'+ id + '"></canvas></div>');
        new charts.pieUSCSDistribution().init(id, data[index].samples,  title);
    }
};

(function () {
    window.onload = function(e) {
        // Initialize map
        SmallMap.init(null, 10);

        // ******* bar chart *********/
        var barChartSPTDepth = new charts.barChartSPTDepth();
        barChartSPTDepth.init("barSptDepth", data, SmallMap);
        barChartSPTDepth.createCheckboxes();
        // ***************************/

        // ******** pie chart ********/
        createPieUSCSDistributionCharts();

        //*********Scatter Plot ******/
        new charts.pointBlowsEle().init('lineBlowsEle', data);

        
    };
})();
