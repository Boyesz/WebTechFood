
function listDrinks() {
    $("table.list").empty();
    var dataWait;
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
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var orderCount;
    var employeeCount;
    var customerCount;
    $.ajax({
        type: "GET",
        url: "/manager/countOrder",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            orderCount = data;
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    $.ajax({
        type: "GET",
        url: "/manager/countCustomer",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            customerCount = data;
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    $.ajax({
        type: "GET",
        url: "/manager/countEmployee",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            employeeCount = data;
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

    var data = google.visualization.arrayToDataTable([
        ['Peoples', 'Count'],
        ['Orders', orderCount],
        ['Customers', customerCount],
        ['Employees', employeeCount]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {'title':'My Average Day', 'width':550, 'height':400};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}




