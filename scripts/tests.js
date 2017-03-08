QUnit.test("Test_1", function(assert) {
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.equal('tea', ds.get('m@bond.com'));
    assert.equal('eshpressho', ds.get('james@bond.com'));
    assert.deepEqual({
        'james@bond.com': 'eshpressho',
        'm@bond.com': 'tea'
    }, ds.getAll());
    ds.remove('james@bond.com');
    assert.deepEqual({
        'm@bond.com': 'tea'
    }, ds.getAll());
    assert.equal('tea', ds.get('m@bond.com'));
    assert.equal(undefined, ds.get('james@bond.com'));
});

QUnit.test("Test_2", function(assert) {
    // There is no function that prints all the current orders, printOrders returns undefined so you can't
    // use any of the assert functions to check for it. So I made a function return an array of emails
    // that contain current orders.
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var myTruck = new Truck('ncc-1701', new DataStore());
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    //myTruck.printOrders();
    assert.deepEqual(['me@goldfinger.com', 'dr@no.com', 'm@bond.com'], myTruck.Orders());
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    //myTruck.printOrders();
    assert.deepEqual(['me@goldfinger.com'], myTruck.Orders());
});
