// Change max days if tuberculosis is clicked
$('input[name="tuberculosis"]').click(() => {
    if($('input[name="tuberculosis"]')[0].checked){
        $('#sick-leave').attr('max', '240');
    } else{
        $('#sick-leave').attr('max', '182');
        if($('#sick-leave').val() > 182){
            $('#sick-leave').val(182)
        }
    }
})

function Calculate(){
    let average_income = Number($('#average-income').val())
    let days = Number($('#sick-leave').val())
    let has_tuberculosis = $('input[name="tuberculosis"]')[0].checked

    let emp_compensated_days = 0
    let emp_compensated_cash = 0
    let emp_compensated_cash_daily = 0
    let insur_compensated_days = 0
    let insur_compensated_cash = 0
    let insur_compensated_cash_daily = 0
    let total_compensated_days = 0
    let total_compensated_cash = 0
    let income_tax = 0.8


    //Check if has tuberculosis 
    if(days > 182 && !has_tuberculosis){
        $('#sick-leave').val(182)
        days = 182;
    } else if(days > 240){
        $('#sick-leave').val(240)
        days = 240;
    }

    // Calculate compensated days
    if(days < 4){
        emp_compensated_days = 0;
        insur_compensated_days = 0;
    } else if(days >= 4 && days < 9){
        emp_compensated_days = days - 3;
        insur_compensated_days = 0;
    } else if(days >= 9){
        emp_compensated_days = 5;
        insur_compensated_days = days - emp_compensated_days - 3;
    } 

    // Calculate cash compensation
    emp_compensated_cash = average_income * 0.7 * 6 / 184 * income_tax * emp_compensated_days;
    insur_compensated_cash = average_income * 0.7 * 6 / 184 * income_tax * insur_compensated_days;
    if(emp_compensated_days > 0 && days < 9){
        emp_compensated_cash_daily = emp_compensated_cash / emp_compensated_days;
    } else if(emp_compensated_days > 0 && insur_compensated_days > 0){
        emp_compensated_cash_daily = emp_compensated_cash / emp_compensated_days;
        insur_compensated_cash_daily = insur_compensated_cash / insur_compensated_days;
    }

    //Calculate total
    total_compensated_cash = emp_compensated_cash + insur_compensated_cash;
    
    // Show results
    $('#emp-comp-days').html(emp_compensated_days)
    $('#emp-comp-cash').html(emp_compensated_cash.toFixed(2).replace('.', ',')+'€')
    $('#emp-comp-cash-d').html(emp_compensated_cash_daily.toFixed(2).replace('.', ','))
    $('#insur-comp-days').html(insur_compensated_days)
    $('#insur-comp-cash').html(insur_compensated_cash.toFixed(2).replace('.', ',') + '€')
    $('#insur-comp-cash-d').html(insur_compensated_cash_daily.toFixed(2).replace('.', ','))
    $('#total-comp-days').html(days)
    $('#total-comp-cash').html(total_compensated_cash.toFixed(2).replace('.', ',') + '€')
}