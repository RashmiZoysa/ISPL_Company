function ItemDto(code, name, qty, unitprice) {
    var __code = code;
    var __name = name;
    var __qty = qty;
    var __unitprice = unitprice;

    this.getItemCode = function () {
        return __code;
    }

    this.getItemName = function () {
        return __name;
    }

    this.getItemqty = function () {
        return __qty;
    }

    this.getUnitPrice = function () {
        return __unitprice;
    }


    this.setItemCode = function (newcode) {
        return __code = newcode;
    }

    this.setItemName = function (newName) {
        return __name = newName;
    }

    this.setItemQty = function (newQty) {
        return __qty = newQty;
    }

    this.setUnitPrice = function (newUnitPrice) {
        return __unitprice = newUnitPrice;
    }
}