define(
    ["lib/qunit"],
    function () {
        module("first thing we want to test");
        test("do something", function () {
            equal(1, 1, "1 equals 1");
        });
    }
);
