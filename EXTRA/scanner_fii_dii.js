/*----------------------------------
----------scanner.js---------------
----------------------------------*/

$(document).ready(function () {

    page_access = username(cookieValue_1)

    if (page_access[2] == 0) {
        if (page_access[4]['sc'] == 1) {

            counter_for_datatable = 0
            default_url = "/fetch_hd_data_fno"
            scan_value = "_hd_data_"

            API_call_for_HD_FnO = false
            API_call_for_HD_Nifty500 = false
            API_call_for_DS_FnO = false
            API_call_for_DS_Nifty500 = false

            call_Post_API = false

            API_call()

            $("#scanner_datatable_ip").keyup(function () {
                $('#scanner_datatable').dataTable().fnFilter(this.value);
            });

        } else if (page_access[4]['sc'] == 0) {

            $('.blur-background').removeClass('d-none')
            $('.lock-icon').removeClass('d-none')

            $('.dataTableSc tbody').empty();

            var jsonData;

            fetch("json/table.json")
                .then(response => response.json())
                .then(data => {
                    jsonData = data;
                    populateTableBodies();
                });

            function populateTableBodies() {
                var tableIds = ["scanner_datatable"];

                var scannerData = jsonData.scanner_table;

                $('#scanner_datatable').removeClass('dataTableSc dataTableSc_dsp').addClass('dataTableSc')
                for (var i = 0; i < scannerData.length; i++) {
                    // data pre preprocessing
                    let Name = scannerData[i][0];
                    let LTP = scannerData[i][1];
                    let Volume = scannerData[i][2];
                    let Delivery_percentage = scannerData[i][3];
                    let ts = scannerData[i][4];
                    let Avg_delivery_percentage = scannerData[i][5];
                    scannerData[i][0] = Name
                    scannerData[i][1] = LTP;
                    scannerData[i][2] = Volume;
                    scannerData[i][3] = parseFloat(Avg_delivery_percentage).toFixed(2);
                    scannerData[i][4] = `${Delivery_percentage} <progress max=100 value=${Delivery_percentage}>`;
                }

                tableIds.forEach(tableId => {

                    if (scannerData) {
                        datatable = $("#" + tableId).DataTable({
                            paging: false,
                            pageLength: 50,
                            info: false,
                            scrollX: true,
                            ordering: false
                        });
                        datatable.clear();
                        datatable.rows.add(scannerData);
                        datatable.draw();
                    }
                });
            }
        }
    } else if (page_access[2] == 0) {
        $('.dataTableSc tbody').empty();

        var jsonData;

        fetch("json/table.json")
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                populateTableBodies();
            });

        function populateTableBodies() {
            var tableIds = ["scanner_datatable"];

            var scannerData = jsonData.scanner_table;

            $('#scanner_datatable').removeClass('dataTableSc dataTableSc_dsp').addClass('dataTableSc')
            for (var i = 0; i < scannerData.length; i++) {
                // data pre preprocessing
                let Name = scannerData[i][0];
                let LTP = scannerData[i][1];
                let Volume = scannerData[i][2];
                let Delivery_percentage = scannerData[i][3];
                let ts = scannerData[i][4];
                let Avg_delivery_percentage = scannerData[i][5];
                scannerData[i][0] = Name
                scannerData[i][1] = LTP;
                scannerData[i][2] = Volume;
                scannerData[i][3] = parseFloat(Avg_delivery_percentage).toFixed(2);
                scannerData[i][4] = `${Delivery_percentage} <progress max=100 value=${Delivery_percentage}>`;
            }

            tableIds.forEach(tableId => {

                if (scannerData) {
                    datatable = $("#" + tableId).DataTable({
                        paging: false,
                        pageLength: 50,
                        info: false,
                        scrollX: true,
                        ordering: false
                    });
                    datatable.clear();
                    datatable.rows.add(scannerData);
                    datatable.draw();
                }
            });
        }
    }

})

/*----------------------------------
----------fii_dii_data.js----------
----------------------------------*/

$(document).ready(function () {

    // create the chart
    highchart = Highcharts.stockChart("fii_dii_chart", {
        rangeSelector: {
            enabled: false,
        },
        navigator: {
            enabled: false,
        },
        scrollbar: {
            enabled: false,
        },
        legend: {
            itemStyle: {
                color: "#000000",
                fontWeight: "bold",
            },
        },
        plotOptions: {
        },
        chart: {
            backgroundColor: "#1c1c1c",
            zooming: {
                mouseWheel: false,
            },
            height: 750,
            timezone: 'Asia/Kolkata',
        },

        toolbar: {
            enabled: false,
        },
        yAxis: [
            {
                top: "3%",
                height: "30%",
                lineWidth: 0,
                gridLineWidth: 0,
                resize: {
                    enabled: true,
                },
                labels: {
                    enabled: false
                }
            },
            {
                top: "33.33%",
                height: "30%",
                offset: 0,
                lineWidth: 0,
                gridLineWidth: 0,
                labels: {
                    enabled: false
                }
            },
            {
                top: "66.67%",
                height: "30%",
                offset: 0,
                lineWidth: 0,
                gridLineWidth: 0,
                labels: {
                    enabled: false
                }
            }
        ],
        tooltip: {
            xDateFormat: '%d-%m-%Y',
            split: true,
        },
        xAxis: {
            type: "datetime",
            labels: {
                formatter: function () {
                    // return moment.unix(this.value).format("DD-MM-YYYY");
                    return Highcharts.dateFormat('%d-%m-%Y', this.value);
                },
                style: {
                    color: "#ffffff", // Set the x-axis labels color to white
                },
            },
            lineColor: "#ffffff",
        },
        series: [
            {
                type: "column",
                name: "FII + DII Net",
                data: [],
                dataGrouping: {
                    enabled: false,
                },
                pointWidth: 15
            }, {
                type: "column",
                name: "FII Net Value",
                data: [],
                yAxis: 1,
                dataGrouping: {
                    enabled: false,
                },
                pointWidth: 15
            }, {
                type: "column",
                name: "DII Net Value",
                data: [0, 0, 0, 0],
                yAxis: 2,
                dataGrouping: {
                    enabled: false,
                },
                pointWidth: 15
            },
        ],
    });

    xAxis = []

    let page_access = username(cookieValue_1)

    if (page_access[2] == 0) {
        if (page_access[4]['fd'] == 1) {

            fetch_data()

            $("#fii_dii_datatable_ip").keyup(function () {
                $('#fii_dii_datatable').dataTable().fnFilter(this.value);
            });
        } else if (page_access[4]['fd'] == 0) {
            $('.blur-background').removeClass('d-none')
            $('.lock-icon').removeClass('d-none')

            $('.dataTableFD tbody').empty();

            var jsonData;

            fetch("json/table.json")
                .then(response => response.json())
                .then(data => {
                    jsonData = data;
                    populateTableBodies();
                });

            function populateTableBodies() {
                var tableIds = ["fii_dii_datatable"];

                var fii_dii_Data = jsonData.fii_dii_table;

                for (var i = 0; i < fii_dii_Data.length; i++) {
                    xAxis.push(fii_dii_Data[i][0])
                    let ts = fii_dii_Data[i][0];
                    let FII_Buy = fii_dii_Data[i][1];
                    let FII_Sell = fii_dii_Data[i][2];
                    let FII_Net = fii_dii_Data[i][3];
                    let DII_Buy = fii_dii_Data[i][4];
                    let DII_Sell = fii_dii_Data[i][5];
                    let DII_Net = fii_dii_Data[i][6];
                    fii_dii_Data[i][0] = moment.unix(ts).format('DD-MM-YYYY')
                    fii_dii_Data[i][1] = FII_Buy
                    fii_dii_Data[i][2] = FII_Sell
                    fii_dii_Data[i][3] = FII_Net
                    fii_dii_Data[i][4] = parseFloat(parseFloat(FII_Net) + parseFloat(DII_Net)).toFixed(2)
                    fii_dii_Data[i][5] = DII_Net
                    fii_dii_Data[i][6] = DII_Buy
                    fii_dii_Data[i][7] = DII_Sell
                }

                tableIds.forEach(tableId => {

                    if (fii_dii_Data) {
                        datatable = $("#" + tableId).DataTable({
                            "columnDefs": [{ targets: [0, 1, 2, 3, 5, 6, 7], className: 'dt-body-center' },
                            { targets: [4], className: 'dt-body-center' }],
                            "autoWidth": false,
                            "rowCallback": function (row, data) {
                                if (data[3] > 0) {
                                    $('td:eq(3)', row).html('<span style=color:#00d3c0>' + data[3] + '</span>');
                                }
                                else {
                                    $('td:eq(3)', row).html('<span style=color:#ff5253>' + data[3] + '</span>');
                                }
                                if (data[5] > 0) {
                                    $('td:eq(5)', row).html('<span style=color:#00d3c0>' + data[5] + '</span>');
                                }
                                else {
                                    $('td:eq(5)', row).html('<span style=color:#ff5253>' + data[5] + '</span>');
                                }
                                if (data[4] > 0) {
                                    $('td:eq(4)', row).html('<span><div style=color:white;background-color:#308f86;border-radius:5px;>' + data[4] + '</div></span>');
                                }
                                else {
                                    $('td:eq(4)', row).html('<span><div style=color:white;background-color:#ff5253;border-radius:5px;>' + data[4] + '</div></span>');
                                }
                            },
                            paging: false,
                            info: false,
                            ordering: false,
                            scrollX: true,
                            pageLength: 50,
                        });
                        datatable.clear();
                        datatable.rows.add(fii_dii_Data);
                        datatable.draw();
                    }
                });

                FII_DII_data = fii_dii_Data

                chart_data()

                $('.dataTables_scrollHeadInner').attr('style', 'box-sizing: content-box; padding-right: 0px;')
            }
        }
    } else if (page_access[2] == 0) {
        $('.dataTableFD tbody').empty();

        var jsonData;

        fetch("json/table.json")
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                populateTableBodies();
            });

        function populateTableBodies() {
            var tableIds = ["fii_dii_datatable"];

            var fii_dii_Data = jsonData.fii_dii_table;

            for (var i = 0; i < fii_dii_Data.length; i++) {
                xAxis.push(fii_dii_Data[i][0])
                let ts = fii_dii_Data[i][0];
                let FII_Buy = fii_dii_Data[i][1];
                let FII_Sell = fii_dii_Data[i][2];
                let FII_Net = fii_dii_Data[i][3];
                let DII_Buy = fii_dii_Data[i][4];
                let DII_Sell = fii_dii_Data[i][5];
                let DII_Net = fii_dii_Data[i][6];
                fii_dii_Data[i][0] = moment.unix(ts).format('DD-MM-YYYY')
                fii_dii_Data[i][1] = FII_Buy
                fii_dii_Data[i][2] = FII_Sell
                fii_dii_Data[i][3] = FII_Net
                fii_dii_Data[i][4] = parseFloat(parseFloat(FII_Net) + parseFloat(DII_Net)).toFixed(2)
                fii_dii_Data[i][5] = DII_Net
                fii_dii_Data[i][6] = DII_Buy
                fii_dii_Data[i][7] = DII_Sell
            }

            tableIds.forEach(tableId => {

                if (fii_dii_Data) {
                    datatable = $("#" + tableId).DataTable({
                        "columnDefs": [{ targets: [0, 1, 2, 3, 5, 6, 7], className: 'dt-body-center' },
                        { targets: [4], className: 'dt-body-center' }],
                        "autoWidth": false,
                        "rowCallback": function (row, data) {
                            if (data[3] > 0) {
                                $('td:eq(3)', row).html('<span style=color:#00d3c0>' + data[3] + '</span>');
                            }
                            else {
                                $('td:eq(3)', row).html('<span style=color:#ff5253>' + data[3] + '</span>');
                            }
                            if (data[5] > 0) {
                                $('td:eq(5)', row).html('<span style=color:#00d3c0>' + data[5] + '</span>');
                            }
                            else {
                                $('td:eq(5)', row).html('<span style=color:#ff5253>' + data[5] + '</span>');
                            }
                            if (data[4] > 0) {
                                $('td:eq(4)', row).html('<span><div style=color:white;background-color:#308f86;border-radius:5px;>' + data[4] + '</div></span>');
                            }
                            else {
                                $('td:eq(4)', row).html('<span><div style=color:white;background-color:#ff5253;border-radius:5px;>' + data[4] + '</div></span>');
                            }
                        },
                        paging: false,
                        info: false,
                        ordering: false,
                        scrollX: true,
                        pageLength: 50,
                    });
                    datatable.clear();
                    datatable.rows.add(fii_dii_Data);
                    datatable.draw();
                }
            });

            FII_DII_data = fii_dii_Data

            chart_data()

            $('.dataTables_scrollHeadInner').attr('style', 'box-sizing: content-box; padding-right: 0px;')
        }
    }
})