
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
    $("#floatingID").focus();
});

// item
$('#btnItem').click(function () {
    hideAll();
    $("#itemform").css('display', 'block');
    $("#txtItemCode").focus();
});

// orders
$('#btnOrders').click(function () {
    hideAll();
    $("#orderform").css('display', 'block');

});

// orderdetails
$('#btnOrderDetails').click(function () {
    hideAll();
    $("#order_detailsform").css('display', 'block');

});

function hideAll() {
    $("#home,#customerform,#itemform,#orderform,#order_detailsform").css('display', 'none');
}