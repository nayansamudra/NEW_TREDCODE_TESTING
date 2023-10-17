scanner_root = "https://students.tradingcafeindia.com"
route = '/calcApi2'

// -------------------------- Datatable ------------------------

$.fn.dataTable.ext.errMode = 'none';

const API_call = () => {
    $.post(scanner_root + route + default_url, function (data, status) {
        // logger.info(status)
        HD_FnO = JSON.parse(JSON.stringify(data));
        if(scan_value == '_hd_data_') {
            $('#scanner_datatable').removeClass('dataTableSc dataTableSc_dsp').addClass('dataTableSc')
            for (var i = 0; i < HD_FnO.length; i++) {
                // data pre preprocessing
                let Name = HD_FnO[i][0];
                let LTP = HD_FnO[i][1];
                let Volume = HD_FnO[i][2];
                let Delivery_percentage = HD_FnO[i][3];
                let ts = HD_FnO[i][4];
                let Avg_delivery_percentage = HD_FnO[i][5];
                HD_FnO[i][0] = Name
                HD_FnO[i][1] = LTP;
                HD_FnO[i][2] = Volume;
                HD_FnO[i][3] = parseFloat(Avg_delivery_percentage).toFixed(2);
                HD_FnO[i][4] = `${Delivery_percentage} <progress max=100 value=${Delivery_percentage}>`;
            }
        } else if(scan_value == '_dsp_data_') {
            $('#scanner_datatable').removeClass('dataTableSc dataTableSc_dsp').addClass('dataTableSc_dsp')
            for (var i = 0; i < HD_FnO.length; i++) {
                // data pre preprocessing
                let Name = HD_FnO[i][0];
                let LTP = HD_FnO[i][1];
                let Delivery_percentage = HD_FnO[i][2];
                let Increase_in_Delivery = HD_FnO[i][3];
                let ts = HD_FnO[i][4];
                let Avg_delivery_percentage = HD_FnO[i][5];
                HD_FnO[i][0] = Name
                HD_FnO[i][1] = LTP;
                HD_FnO[i][2] = parseFloat(Avg_delivery_percentage).toFixed(2);
                HD_FnO[i][3] = `${Delivery_percentage} <progress max=100 value=${Delivery_percentage}>`;
                HD_FnO[i][4] = Increase_in_Delivery;
            }
        }
        
        if (HD_FnO) {
            if (counter_for_datatable == 0) {
                counter_for_datatable += 1;
                datatable = $("#scanner_datatable").DataTable({
                    paging: false,
                    pageLength: 50,
                    info: false,
                    scrollX: true,
                    ordering: false
                });
            }
            datatable.clear();
            datatable.rows.add(HD_FnO);
            datatable.draw();
        }
    }).fail(function (response) {
        // logger.error("Error: " + response);
    });
}

$(document).on('click', "input[type='radio']", function () {
    scan_value = $("input[name='market_option']:checked").val()
    segment_value = $("input[name='market_option_1']:checked").val()
    default_url = '/fetch' + scan_value + segment_value;

    if (scan_value == '_hd_data_') {
        $('#scanner_datatable_thead').empty()
        $('#scanner_datatable_thead').append(`<tr><th>Name</th><th>LTP</th><th>Volume</th><th>Avg. Del %</th><th>Delivery (%)</th></tr>`)
    } else if (scan_value == '_dsp_data_') {
        $('#scanner_datatable_thead').empty()
        $('#scanner_datatable_thead').append(`<tr><th>Name</th><th>LTP</th><th>Avg. Del %</th><th>Delivery (%)</th><th>Increase in Delivery (%)</th></tr>`)
    }

    API_call()
})

$(document).ready(function () {

    counter_for_datatable = 0
    default_url = "/fetch_hd_data_fno"
    scan_value = "_hd_data_"

    API_call()

    // ------------------ Update Code ------------------- 

    setInterval(function () {
        if (dtime_clock() == false) { return }
        API_call()
    }, 47000);

})