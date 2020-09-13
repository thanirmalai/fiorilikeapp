sap.ui.define(["cap/fin/ar/customControls/NewCtrlRenderer"],

function(NewCtrlRenderer) {
	
return sap.ui.core.Control.extend( "cap.fin.ar.customControls.Heading",{
	metadata :{
		properties : {
			"text": "",
			"color": "",
			"border": "",
			"back": ""
		}
		
	},
	init : function() {
		this.setColor("grey");
	},
	renderer: NewCtrlRenderer
	// function(oRm,oControl) {
		// oRm.write("<h1");
		// oRm.addStyle("background-color",oControl.getBack());
		// oRm.addStyle("border",oControl.getBorder());
		// oRm.addStyle("color",oControl.getColor());
		// oRm.addStyles();
		// oRm.write(">" + oControl.getText() + "</h1>");
	// }
	
});	

});
	