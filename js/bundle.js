
function listDrinks() {
    $("table.list").empty();
    var dataWait;
    $("table.list").append("<tr><td>id</td><td>Név</td><td>Ár</td></tr>");
    $.ajax({
        type: "GET",
        url: "/customer/listDrinks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){dataWait = data;
            $.each(dataWait, function(i, data){
                $("table.list").append("<tr><td>" + data._id + "</td><td>" + data.name + "</td><td>" + data.price + "FT" + "   " +  "</td><td><button onclick='newOrder(this.name)' class='newOrderClass' id=foodBtn name=" + data._id +">+</button></td></tr>");
            })
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

global.listDrinks = listDrinks;

function listFoods() {
    $("table.list").empty();
    $("table.list").append("<tr><td>id</td><td>Név</td><td>Ár</td></tr>");
    var dataWait;
    $.ajax({
        type: "GET",
        url: "/customer/listFoods",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){dataWait = data;
            $.each(dataWait, function(i, data){
                $("table.list").append("<tr><td>" + data._id + "</td><td>" + data.name + "</td><td>" + data.price + "FT" + "   "+" </td><td><button onclick='newOrder(this.name)' id=foodBtn name="+ data.name +" >+</button> </td></tr>");
            })
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

global.listFoods = listFoods;

function newOrder(name) {
    var idBack;
    var foodDatasBack;
    var parameters = '{' +
        '"name":"'+document.getElementById("customerNameBox").value + '"' +
        '}';
    var parameters2 = '{' +
        '"_id":"' + name + '"}';
    $.ajax({
        type: "POST",
        url: "/customer/getCustomerIDByName",
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
                idBack = data._id
                $.ajax({
                    type: "POST",
                    url: "/customer/getFoodByID",
                    data: parameters2,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){
                        foodDatasBack = data;
                        uploadOrder(idBack,foodDatasBack);
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });


}

global.newOrder = newOrder;

function uploadOrder(id,food) {
    /**
     * '{' + '"food_fk":"' + food._id + '",' +
                '"customer_fk":"' + '"' + id + '",' +
                '"totalCost":' + food.price +
        '}'
     */
    var data = {
        food_fk: food._id,
        customer_fk: id,
        totalCost: food.price
    };
    $.ajax({
        type: "POST",
        url: "/customer/orderFood",
        data: '{' + '"food_fk":"' + food._id + '",' +
        '"customer_fk":"' + id + '",' +
        '"totalCost":' + food.price +
        '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            dataBack = data;
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

global.uploadOrder = uploadOrder;

function listOpenJobs() {
    //Calculate TotalCost
    var dataWait;
    $("table.order").empty();
    $("table.order").append("<tr><td>id</td><td>Név</td><td>Étel</td></tr>");
    $.ajax({
        type: "GET",
        url: "/bartender/listOpenOrders",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){dataWait = data;
            $.each(dataWait, function(i, data){
                $("table.order").append("<tr><td>" + data._id + "</td><td>" + data.customer_fk.name + "</td><td>" + data.food_fk.name + "      " +  "</td><td><button class='acceptOrderClass'  onclick='acceptJob(this.name)' id=bartenderBtn name=" + data._id +">Accept</button></td></tr>");
            })
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

global.listOpenJobs = listOpenJobs;

function acceptJob(id){
    $.ajax({
        type: "POST",
        url: "/bartender/fullfillOrder",
        data: '{' + '"_id":"' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            dataBack = data;
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

global.acceptJob = acceptJob;

function showProfitInTable() {
    //Calculate TotalCost
    var dataWait;
    $("table.manager").empty();

    $.ajax({
        type: "GET",
        url: "/manager/profit",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
                $("table.manager").append("<tr><td>" + " Next Profit " + "</td><td>" + data.totalPrice + "</td></tr>");
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        type: "GET",
        url: "/manager/cleanProfit",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
                $("table.manager").append("<tr><td>" + " Clean Profit " + "</td><td>" + data.totalPrice + "</td></tr>");
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });


    $.ajax({
        type: "GET",
        url: "/manager/sumProfit",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
                $("table.manager").append("<tr><td>" + " Sum Profit " + "</td><td>" + data.totalPrice + "</td></tr>");
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

global.showProfitInTable = showProfitInTable;

function showAllOrders() {
    //Calculate TotalCost
    var dataWait;
    $("table.manager").empty();
    $.ajax({
        type: "GET",
        url: "/manager/listOrders",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){dataWait = data;
            $.each(dataWait, function(i, data){
                $("table.manager").append("<tr><td>" + data._id + "</td><td>" + data.customer_fk.name + "</td><td>" + data.food_fk.name + "</td></tr>");
            })
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

global.showAllOrders = showAllOrders;
