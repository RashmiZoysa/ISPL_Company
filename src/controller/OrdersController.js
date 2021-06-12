// search customer
$("#floatingID").on('keyup', function (eObj) {
    if (eObj.key === "Enter") {
        let customer = searchCustomer2($(this).val());
        if (customer != null) {
            $("#floatingName").val(customer.getCustomerName());
        } else {
            clearcustomer2();
        }
    }
});

function searchCustomer2(customerID) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() === customerID) return customerTable[i];
    }
    return null;
}

function clearcustomer2() {
    $('#floatingID').val("");
}

// search item
$("#floatingCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem2($(this).val());
        if (item != null) {
            $("#floatingName1").val(item.getItemName());
            $("#floatingQty").val(item.getQtyOnHand());
            $("#floatingUnitPrice").val(item.getUnitPrice());
        } else {
            clearcustomer2();
        }
    }
});

function searchItem2(itemCode) {
    for (var i in itemTable) {
        if (itemTable[i].getItemCode() == itemCode)
            return itemTable[i];
    }
    return null;
}

function clearItem2() {
    $('#floatingCode').val("");
}

// ===============================================================================================
// save add to list
$('#btnAddToList').click(function () {
    let itemcode = $("#floatingCode").val();
    let itemname = $("#floatingName1").val();
    let unitprice = $("#floatingUnitPrice").val();
    let qty = $("#floatingQty").val();
    let total = $('#subTotal').val()* $('#txtUnitPrice2').val()

    let result = saveItemList(itemcode, itemname, unitprice, qty, total);
    if(result)clearfields();
    subTotal();
    // updateStocks(itemcode);
});

function saveItemList(itemcode, itemname, unitprice, qty, total) {
    let itemlist = new ItemListDTO(itemcode, itemname, unitprice, qty, total);
    itemList.push(itemlist);// customer aded

    // load the table
    loadAllItemList();
    return true;
}

function getAllList() {
    return itemList;
}
function loadAllItemList() {
    let allItemList = getAllList();
    $('#tblLIst').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItemList) {
        let code = allItemList[i].getIlcode();
        let name = allItemList[i].getIlname();
        let uprice = allItemList[i].getIluprice();
        let qty = allItemList[i].getIlqty();
        let total = allItemList[i].getIltotal();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${uprice}</td><td>${qty}</td><td>${total}</td></tr>`;
        $('#tblLIst').append(row);
    }
    $('#tblLIst>tr').click(function () {
        let code=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let uprice=$(this).children('td:eq(2)').text();
        let qty=$(this).children('td:eq(3)').text();
        let total=$(this).children('td:eq(4)').text();

        $("#txtItemCode2").val(code);
        $("#txtItemName2").val(name);
        $("#txtUnitPrice2").val(uprice);
        $("#txtQuantity").val(qty);



    });
}

// ========================================================================================================
// delete list
$("#btnClear").click(function () {
    let itemCode = $("#txtItemCode2").val();
    let option=confirm(`Do You Want to Remove This Item ? ID:${itemCode}`);
    if (option){
        let result=deleteItemList(itemCode);
        if (result){
            alert("Item Successfully Removed From the List !");
        } else{
            alert("Delete Failed !")
        }

    }
    loadAllItemList();
    clearfields();
    subTotal();
});

function searchItemList(itemCode) {
    for (var i in itemList) {
        if (itemList[i].getIlcode() == itemCode) return itemList[i];
    }
    return null;
}
function deleteItemList(itemCode) {
    let item = searchItemList(itemCode);
    if (item != null) {
        let indexNumber = itemList.indexOf(item);
        itemList.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// delete all list
$("#btnClearAll").click(function () {
    let option=confirm(`Do You Want to Remove This Item List ?`);
    let allItemList = getAllItemList();
    if (option){
        for (var i in allItemList){
            // allItemList.pop();
            allItemList.splice(i);

        }
    }
    loadAllItemList();
    clearfields();
    subTotal();
});


function getAllItemList() {
    return itemList;
}

// ===============================================================================================
// clear feilds
function clearfields() {
    $("#txtItemCode2").val("");
    $("#txtItemName2").val("");
    $("#txtUnitPrice2").val("");
    $("#txtQuantity").val("");
    $("#txtInStocks2").val("");
    // $("#txtOrderId").val("");
    // $("#txtCustomerID").val("");
    // $("#txtCustomerName2").val("");


}

// =============================================================================================
// calculate total
function subTotal() {
    var orderTotal = 0;
    for (var i in itemList) {
        var rowTotals =itemList[i].getIltotal() ;
        orderTotal += rowTotals;
    }
    $("#subTotal").text(orderTotal);

}

// =================================================================================================
// manage payments
$("#txtCash").on('keyup', function (eObj) {
    let balance=0;
    let total =$("#subTotal").text();
    let discount=0;
    if (eObj.key == "Enter") {
        if(total==2000){
            discount=total*(10/100);
        }else if(total==5000){
            discount=total*(20/100);
        }
        let cash = $("#txtCash").val();
        balance= cash-(total-discount);

    }
    $("#txtDiscount").val(discount);
    $("#txtBalance").val(balance);
});

// clear
function clearpaymentfields() {
    $("#txtCash").val("");
    $("#txtDiscount").val("");
    $("#txtBalance").val("");
}

// function updateStocks(itemcode){
//     var newStocks = 0;
//     for (var i in itemList) {
//         for (var j in itemTable) {

//         if ((itemList[i].getIlcode() && itemTable[j].getQtyOnHand())==itemcode )
//             newStocks=itemTable[j].getQtyOnHand()-itemlist[i].getIlqty();

//     }
//     }alert(newStocks);
// }

// ====================================================================================================
// place order
$('#btnPlaceOrder').click(function () {
    let orderID = $("#txtOrderId").val();
    let date = $("#txtCustomerID").val();
    let cID = $("#txtDate").val();


    let itemcode = $("#txtItemCode2").val();
    let unitprice = $("#txtUnitPrice2").val();
    let qty = $("#txtQuantity").val();


    let result1 = saveOrder(orderID, date, cID);
    let result2 = saveOrderDetails(orderID, itemcode, unitprice, qty);
    if(result1 && result2)clearOrderfields();
    generateOrderID();

});

function saveOrder(orderID, date, cID) {
    let order = new OrderDTO(orderID, date, cID);
    orderTable.push(order);// order aded

    // load the table
    loadAllOrderList();
    return true;
}
function saveOrderDetails(orderID, itemcode, unitprice, qty) {
    let orderDetails = new OrderDetailsDTO(orderID, itemcode, unitprice, qty);
    orderDetailsTable.push(orderDetails);// order details aded

    // load the table
    loadAllOrderDetails();
    return true;
}

function getAllOrders() {
    return orderTable;
}

function loadAllOrderList() {
    let allOrderList = getAllOrders();
    $('#tblOrders').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allOrderList) {
        let id = allOrderList[i].getOrderId();
        let date = allOrderList[i].getDate();
        let cid = allOrderList[i].getCusId();

        var row = `<tr><td>${id}</td><td>${date}</td><td>${cid}</td></tr>`;
        $('#tblOrders').append(row);
    }
}

function getAllOrderDetails() {
    return orderDetailsTable;
}

function loadAllOrderDetails() {
    let allOrderDetailsList = getAllOrderDetails();
    $('#tblPrderDetails').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allOrderDetailsList) {
        let oid = allOrderDetailsList[i].getId();
        let code = allOrderDetailsList[i].getCode();
        let price = allOrderDetailsList[i].getUprice();
        let qtyl = allOrderDetailsList[i].getQty();

        var row = `<tr><td>${oid}</td><td>${code}</td><td>${price}</td><td>${qtyl}</td></tr>`;
        $('#tblOrderDetails').append(row);
    }

}

function clearOrderfields() {
    $("#txtItemCode2").val("");
    $("#txtItemName2").val("");
    $("#txtUnitPrice2").val("");
    $("#txtQuantity").val("");
    $("#txtInStocks2").val("");
    $("#txtOrderId").val("");
    $("#txtCustomerID").val("");
    $("#txtCustomerName2").val("");

}


function generateOrderID() {
    if(orderTable.length == 0){
        $("#txtOrderId").val("R-001");
    }else{
        let lastOrderID=orderTable[orderTable.length-1].getOrderId();
        let newID =Number.parseInt(lastOrderID.substring(2, 5))+1;
        if(newID < 10){
            newID="R-00"+newID;
        }else if(newID<100){
            newID="R-0" + newID;
        }
        $("#txtOrderId").val(newID);
    }
}
