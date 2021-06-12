// Events
// save
$('#btnItemAdd').click(function () {
    let itemCode=$('#floatingCodeI').val();
    let itemName=$('#floatingNameI').val();
    let qtyOnhand=$('#floatingQtyI').val();
    let unitprice=$('#floatingPrice').val();


    let result = saveItem(itemCode, itemName, qtyOnhand, unitprice);
    if(result)clearitem();
    generateItemCode();
});

// update
$("#btnItemUpdate").click(function () {
    let itemCode=$('#floatingCodeI').val();
    let itemName=$('#floatingNameI').val();
    let qtyOnhand=$('#floatingQtyI').val();
    let unitprice=$('#floatingPrice').val();

    let option=confirm(`Do You Want to Update Item ? ID:${itemCode}`);
    if (option){
        let result= updateItem(itemCode, itemName, qtyOnhand, unitprice);
        if (result){
            alert("Item Successfully Updated !");
        }else{
            alert("Update Failed !");
        }
    }
    loadAllItems();
    clearitem();
    generateItemCode();

});

// delete
$("#btnItemDelete").click(function () {
    let itemCode = $("#floatingCodeI").val();
    let option=confirm(`Do You Want to Delete ? ID:${itemCode}`);
    if (option){
        let result=deleteItem(itemCode);
        if (result){
            alert("Item Successfully Deleted !");
        } else{
            alert("Delete Failed !")
        }

    }
    loadAllItems();
    clearitem();
    generateItemCode();
});

// search
$("#floatingCodeI").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#floatingCodeI").val(item.getItemCode());
            $("#floatingNameI").val(item.getItemName());
            $("#floatingQtyI").val(item.getQtyOnHand());
            $("#floatingPrice").val(item.getUnitPrice());
        } else {
            // clearitem();
        }
    }
});


// ==================================================================================================
//Functions
// save item
function getAllItems() {
    return itemTable;
}
function saveItem(itemCode, itemName, qtyOnhand, unitprice) {
    let item = new ItemDTO(itemCode, itemName, qtyOnhand, unitprice);
    itemTable.push(item);// item aded

    loadAllItems();
    return true;
}

// update customer
function updateItem(itemCode, itemName, qtyOnhand, unitprice) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.setItemName(itemName)
        item.setQtyOnHand(qtyOnhand)
        item.setUnitPrice(unitprice);
        return true;
    } else {
        return false;
    }

}

// search customer
function searchItem(itemCode) {
    for (var i in itemTable) {
        if (itemTable[i].getItemCode() == itemCode) return itemTable[i];
    }
    return null;
}

//delete customer
function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = itemTable.indexOf(item);
        itemTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}


// =====================================================================================================
// other functions
function loadAllItems() {
    let allItems = getAllItems();
    $('#tblItem').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let name = allItems[i].getItemName();
        let qtyOnhand = allItems[i].getQtyOnHand();
        let unitprice = allItems[i].getUnitPrice();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${qtyOnhand}</td><td>${unitprice}</td></tr>`;
        $('#tblItem').append(row);
    }
    $('#tblItem>tr').click(function () {
        let code=$(this).children('td:eq(0)').text();
        let name=$(this).children('td:eq(1)').text();
        let qtyOnhand=$(this).children('td:eq(2)').text();
        let unitprice=$(this).children('td:eq(3)').text();

        $("#floatingCodeI").val(code);
        $("#floatingNameI").val(name);
        $("#floatingQtyI").val(qtyOnhand);
        $("#floatingPrice").val(unitprice);


    });
}

function clearitem() {
    $('#floatingCodeI').val("");
    $('#floatingNameI').val("");
    $('#floatingQtyI').val("");
    $('#floatingPrice').val("");
}

function generateItemCode() {
    if(itemTable.length == 0){
        $("#floatingCodeI").val("I-001");
    }else{
        let lastItemCode=itemTable[itemTable.length-1].getItemCode();
        let newCode =Number.parseInt(lastItemCode.substring(2, 5))+1;
        if(newCode < 10){
            newCode="I-00"+newCode;
        }else if(newCode<100){
            newCode="I-0" + newCode;
        }
        $("#floatingCodeI").val(newCode);
    }
}

// reg ex
let itemCOdeRegEx=/^(I-)[0-9]{1,3}$/;
$("#floatingCodeI").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#floatingCodeI').focus();
    }
    let inputCode=$("#floatingCodeI").val();
    if (itemCOdeRegEx.test(inputCode)){
        $("#floatingCodeI").css('border','1px solid green');
        $("#floatingCodeI").text("");
    }else{
        $("#floatingCodeI").css('border','1px solid red');
        $("#floatingCodeI").text('Invalid Item Code (I-001)');
    }
});

$("#floatingCodeI").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#floatingQtyI').focus();
    }
});

$("#floatingQtyI").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#floatingPrice').focus();
    }
});

$("#floatingPrice").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#btnItemAdd').focus();
    }
});

