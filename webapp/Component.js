sap.ui.define(
	["sap/ui/core/UIComponent"],
	function(UIComponent){
	return UIComponent.extend("cap.fin.ar.Component",{
		metadata : {
			"manifest":"json"
		},
		init:function(){
			UIComponent.prototype.init.apply(this);
			var oRouter = this.getRouter();
			oRouter.initialize();
		},

/*		createContent:function(){*/
		// return	new sap.m.Button({
		// text : "Chal Gaya"
		// 	});
	/*	var oview = new sap.ui.view({
		    type :"XML",
		    viewName : "cap.fin.ar.view.App"
		    
		});
				var oview1 = new sap.ui.view("view1",{
		    type :"XML",
		    viewName : "cap.fin.ar.view.View1"
		    
		});
		
		      var oview2 = new sap.ui.view("view2",{
		      	type:"XML",
		      	viewName : "cap.fin.ar.view.View2"
		      });
		oview.byId("anna").addMasterPage(oview1).addDetailPage(oview2);
		return oview;*/
		
/*		},*/
		destroy:function(){
		UIComponent.prototype.destroy.apply(this);	
		}
		
		
	});
	
	
	
});