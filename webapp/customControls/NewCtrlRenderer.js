sap.ui.define(["sap/ui/core/mvc/Controller",
               "sap/ui/core/Renderer"],
               
               function(Controller,Renderer){
               	
               	var NewCtrlRenderer1 = Renderer.extend("cap.fin.ar.customControls.NewCtrlRenderer");
               	
               	NewCtrlRenderer1.render = function(oRm,oControl){
               	
               	oRm.write("<h1");
		        oRm.addStyle("background-color",oControl.getBack());
				oRm.addStyle("border",oControl.getBorder());
				oRm.addStyle("color",oControl.getColor());
				oRm.addStyles();
				oRm.write(">" + oControl.getText() + "</h1>");	
               		
               	};
               	
               	return NewCtrlRenderer1;
	
	
	
});