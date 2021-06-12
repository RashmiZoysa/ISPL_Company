// Events
// save
$('#btnCustomerAdd').click(function () {
    let customerID = $("#floatingID1").val();
    let customerName = $("#floatingName2").val();
    let customerAddress = $("#CustomerAddress").val();
    let customerSalary = $("#CustomerSalary").val();

    let result = saveCustomer(customerID, customerName, customerAddress, customerSalary);
    if(result)clearcustomer();
    generateCustomerID()
});

// update
$("#btnCustomerUpdate").click(function () {
    let customerID = $("#floatingID1").val();
    let customerName = $("#floatingName2").val();
    let customerAddress = $("#CustomerAddress").val();
    let customerSalary = $("#CustomerSalary").val();

    let option=confirm(`Do You Want to Update Customer ? ID:${customerID}`);
    if (option){
        let result= updateCustomer(customerID, customerName, customerAddress, customerSalary);
        if (result){
            alert("Customer Successfully Updated !");
        }else{
            alert("Update Failed !");
        }
    }
    loadAllCustomers();
    clearcustomer();
    generateCustomerID()

});

// delete
$("#btnCustomerDelete").click(function () {
    let cusID = $("#floatingID1").val();
    let option=confirm(`Do You Want to Delete ? ID:${cusID}`);
    if (option){
        let result=deleteCustomer(cusID);
        if (result){
            alert("Customer Successfully Deleted !");
        } else{
            alert("Delete Failed !")
        }

    }
    loadAllCustomers();
    clearcustomer();
    generateCustomerID()

});

// search
$("#floatingID1").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#floatingID1").val(customer.getCustomerID());
            $("#floatingName2").val(customer.getCustomerName());
            $("#CustomerAddress").val(customer.getCustomerAddress());
            $("#CustomerSalary").val(customer.getCustomerSalary());
        } else {
            clearcustomer();
        }
    }
});



// ==============================================================================================
//Functions

// save customer
function getAllCustomers() {
    return customerTable;
}
function saveCustomer(customerID, customerName, customerAddress, customerSalary) {
    let customer = new CustomerDto(customerID, customerName, customerAddress, customerSalary);
    customerTable.push(customer);// customer added

    // load the table
    loadAllCustomers();
    return true;
}

// update customer
function updateCustomer(customerID, customerName, customerAddress, customerSalary) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.setCustomerName(customerName)
        customer.setCustomerAddress(customerAddress)
        customer.setCustomerSalary(customerSalary);
        return true;
    } else {
        return false;
    }

}

// search customer
function searchCustomer(customerID) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == customerID)
            return customerTable[i];
    }
    return null;
}

//delete customer
function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}



// ================================================================================================


// other functions
function loadAllCustomers() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tblCustomer').append(row);
    }
    $('#tblCustomer>tr').click(function () {
        let id=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let address=$(this).children('td:eq(2)').text();
        let salary=$(this).children('td:eq(3)').text();

        $("#floatingID1").val(id);
        $("#floatingName2").val(name);
        $("#CustomerAddress").val(address);
        $("#CustomerSalary").val(salary);


    });
}
function clearcustomer() {
    $('#floatingID1').val("");
    $('#floatingName2').val("");
    $('#CustomerAddress').val("");
    $('#CustomerSalary').val("");

}

function generateCustomerID() {
    if(customerTable.length == 0){
        $("#floatingID1").val("C-001");
    }else{
        let lastCustomerID=customerTable[customerTable.length-1].getCustomerID();
        let newID =Number.parseInt(lastCustomerID.substring(2, 5))+1;
        if(newID < 10){
            newID="C-00"+newID;
        }else if(newID<100){
            newID="C-0" + newID;
        }
        $("#floatingID1").val(newID);
    }
}

// reg ex
let cusIDRegEx=/^(C-)[0-9]{1,3}$/;
$("#floatingID1").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#floatingID1').focus();
    }
    let inputID=$("#floatingID1").val();
    if (cusIDRegEx.test(inputID)){
        $("#floatingID1").css('border','1px solid green');
        $("#lblcusid").text("");
    }else{
        $("#floatingID1").css('border','1px solid red');
        $("#lblcusid").text('Invalid Customer ID (C-001)');
    }
});

$("#floatingName2").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#CustomerAddress').focus();
    }
});

$("#CustomerAddress").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#CustomerSalary').focus();
    }
});

$("#CustomerSalary").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#btnCustomerAdd').focus();
    }
});
