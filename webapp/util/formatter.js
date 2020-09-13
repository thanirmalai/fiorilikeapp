sap.ui.define(["sap/ui/core/format/NumberFormat"],
function(NumberFormat){
	return{
	currencyFormat : function(amount,curr){
	var oCurrencyFormat = NumberFormat.getCurrencyInstance({
		currencyCode : true
	});	
	return oCurrencyFormat.format(amount,curr);	
	}
	};
	
});