/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.16176470588235295, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.16, 500, 1500, "Forget Password"], "isController": false}, {"data": [0.0, 500, 1500, "Check Health"], "isController": false}, {"data": [0.12, 500, 1500, "Login User"], "isController": false}, {"data": [0.06, 500, 1500, "Create Note 1"], "isController": false}, {"data": [0.38, 500, 1500, "Delete User"], "isController": false}, {"data": [0.0, 500, 1500, "Register User"], "isController": false}, {"data": [0.25, 500, 1500, "GET User Profile"], "isController": false}, {"data": [0.08, 500, 1500, "Create Note 2"], "isController": false}, {"data": [0.13, 500, 1500, "Update Note By ID"], "isController": false}, {"data": [0.15, 500, 1500, "Partial Modification"], "isController": false}, {"data": [0.35, 500, 1500, "Delete Note By ID"], "isController": false}, {"data": [0.14, 500, 1500, "Get All Notes"], "isController": false}, {"data": [0.33, 500, 1500, "Verify Partial Modification"], "isController": false}, {"data": [0.11, 500, 1500, "GET Note by ID"], "isController": false}, {"data": [0.25, 500, 1500, "GET Note by ID After Update"], "isController": false}, {"data": [0.12, 500, 1500, "Logout User"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 850, 0, 0.0, 2004.8929411764698, 696, 4806, 1670.0, 4063.2, 4291.7, 4627.890000000001, 7.1254924972755465, 6.007631743021209, 2.253731714728812], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Forget Password", 50, 0, 0.0, 1466.1200000000001, 734, 1948, 1752.0, 1884.9, 1929.85, 1948.0, 5.889281507656066, 4.27893109540636, 1.9496742491166077], "isController": false}, {"data": ["Check Health", 50, 0, 0.0, 3816.8199999999997, 2832, 4402, 3916.0, 4358.9, 4383.45, 4402.0, 11.355893708834886, 7.219420707472179, 2.284486429707018], "isController": false}, {"data": ["Login User", 100, 0, 0.0, 3067.6800000000003, 831, 4300, 3639.5, 4190.7, 4240.3, 4299.71, 2.6658136063126467, 2.137336885529964, 0.8721167559714225], "isController": false}, {"data": ["Create Note 1", 50, 0, 0.0, 2335.4, 747, 3753, 1972.5, 3662.2, 3732.5, 3753.0, 4.58547322083639, 4.410831174339692, 2.024056538884813], "isController": false}, {"data": ["Delete User", 50, 0, 0.0, 1176.5200000000002, 820, 1956, 962.0, 1889.9, 1935.0, 1956.0, 3.5984166966534725, 2.315777932709608, 1.0261110111550917], "isController": false}, {"data": ["Register User", 50, 0, 0.0, 4066.1600000000003, 2106, 4806, 4446.5, 4752.0, 4755.9, 4806.0, 9.389671361502348, 7.04225352112676, 3.099325117370892], "isController": false}, {"data": ["GET User Profile", 50, 0, 0.0, 1294.2199999999998, 696, 1676, 1504.0, 1612.7, 1639.6999999999998, 1676.0, 6.502796202367018, 4.750089413447783, 1.6701517590063728], "isController": false}, {"data": ["Create Note 2", 50, 0, 0.0, 1737.5999999999997, 745, 2095, 1844.5, 1982.7, 2062.7999999999997, 2095.0, 4.232266802099204, 4.071076953191129, 1.8681490181141018], "isController": false}, {"data": ["Update Note By ID", 50, 0, 0.0, 1554.08, 746, 1984, 1800.5, 1886.1, 1927.9499999999998, 1984.0, 4.1813012209399565, 3.9485530084462286, 1.9722348532363272], "isController": false}, {"data": ["Partial Modification", 50, 0, 0.0, 1431.1799999999998, 736, 1876, 1617.0, 1803.5, 1851.45, 1876.0, 3.648303538854433, 3.448786939073331, 1.1757228201386356], "isController": false}, {"data": ["Delete Note By ID", 50, 0, 0.0, 1206.6199999999997, 744, 1726, 1337.0, 1632.2, 1670.35, 1726.0, 3.4148340390657013, 2.187628056276465, 1.00710925761508], "isController": false}, {"data": ["Get All Notes", 50, 0, 0.0, 1552.8200000000002, 732, 3498, 1583.0, 1780.6, 1834.1499999999999, 3498.0, 3.9622791029400117, 5.06893127426896, 0.986700362548538], "isController": false}, {"data": ["Verify Partial Modification", 50, 0, 0.0, 1318.32, 699, 1807, 1437.5, 1663.2, 1712.6499999999999, 1807.0, 3.471498993265292, 3.2884316635423176, 0.9492380059709782], "isController": false}, {"data": ["GET Note by ID", 50, 0, 0.0, 1497.22, 706, 1862, 1667.0, 1784.2, 1810.4499999999998, 1862.0, 4.6040515653775325, 4.437694233425415, 1.2589203499079191], "isController": false}, {"data": ["GET Note by ID After Update", 50, 0, 0.0, 1329.28, 702, 1802, 1494.5, 1629.6, 1657.7499999999998, 1802.0, 3.9435286694534266, 3.7317180475589558, 1.0783086205536714], "isController": false}, {"data": ["Logout User", 50, 0, 0.0, 2165.4600000000005, 740, 3169, 2303.5, 3098.5, 3143.7, 3169.0, 5.008514474606832, 3.2672731142943, 1.3890801863167384], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 850, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
