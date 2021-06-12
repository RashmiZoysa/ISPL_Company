
hideAll();

$("#home").css('display', 'block');
     
// home
$('#btnHome').click(function () {
    hideAll();
    $("#home").css('display', 'block');
     
});

// customer
$('#btnCustomer').click(function () {
    hideAll();
    $("#customerForm").css('display', 'block');
    $("#floatingID1").focus(); 
});

// item
$('#btnItem').click(function () {
    hideAll();
    $("#itemForm").css('display', 'block');
    $("#floatingCodeI").focus();
});

// orders
$('#btnOrders').click(function () {
    hideAll();
    $("#orderForm").css('display', 'block');
    // setDate();
});

// orderdetails
$('#btnOrderDetails').click(function () {
    hideAll();
    $("#order_detailsform").css('display', 'block');
     
});

function hideAll() {
    $("#home,#customerForm,#itemForm,#orderForm,#order_detailsform").css('display', 'none');
}

// function setDate() {
//     let today = new Date().toISOString().slice(0, 10)
//     $("#txtDate").val(today);
// }