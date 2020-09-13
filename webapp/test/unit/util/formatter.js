QUnit.module("Test case for formatter");
sap.ui.define(["cap/fin/ar/util/formatter"],function(actualFunctionality){
	
	function callFunctionality (assert,price,unit,expected){
		var obtainedValue = actualFunctionality.currencyFormat(price,unit);
		assert.strictEqual(obtainedValue,expected,"test passed");
	}
	
	QUnit.test("Testing basic EUR format",function(assert){
		callFunctionality.call(this, assert, 530, "EUR", "530.00 EUR");
		
	});
	
}) ;