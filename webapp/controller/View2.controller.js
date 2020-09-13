sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller,MsgToast) {
	"use strict";

	return Controller.extend("cap.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cap.fin.ar.view.View2
		 */
		onInit: function () {
         this.oRouter = this.getOwnerComponent().getRouter();
         this.oRouter.attachRoutePatternMatched(this.herculis,this);
    	},
    	oSupppop : null,
    	oCity : null,
    	myField : null,
    	
    	onFilter:function(){

    		if(!this.oSupppop){
    	 this.oSupppop = new sap.ui.xmlfragment("cap.fin.ar.fragment.selectdialog") ;
    	 this.getView().addDependent(this.oSupppop);
    		}
    		
    		this.oSupppop.bindAggregation("items",{
    		       path	:'/suppliers',
    		       template : new sap.m.DisplayListItem({
    		       	      label :"{name}",
    		       	      value  :"{city}"
    		       })
    		});
    		
    		
    		this.oSupppop.open();
    	},
    	onPress: function(){
    		MsgToast.show("Extended Button event fired");
    	},
    	onDelete:function(){
    		debugger;
    		var oContext = this.oRouter.getHashChanger().getHash().replace("joker","");
    		var oModel = this.getView().getModel();
    		oModel.remove(oContext,{
    		       success: function(){
    		       	MsgToast.show("Deleted Successfully");
    		       },
    		       error: function(){
    		       	MsgToast.show("Not Deleted");
    		       }
    		});
    		
    	},
    	onConfirm:function(oEvent){
    		var popValue = oEvent.getParameter("selectedItem");
    		var actValue = popValue.getValue(popValue);
    		this.myField.setValue(actValue);
    		
    		
    	},
    	onCity:function(oEvent){
    		this.myField = oEvent.getSource();
    		if(!this.oCity){
    	 this.oCity = new sap.ui.xmlfragment("cap.fin.ar.fragment.selectdialog",this) ;
    	 this.getView().addDependent(this.oCity);
    	 this.oCity.setMultiSelect(false);
    
    	 
    		}
  
    		
    		this.oCity.bindAggregation("items",{
    		       path	:'/cities',
    		       template : new sap.m.DisplayListItem({
    		       	      value  :"{cityname}"
    		       })
    		});
    		
    		  			 
    		this.oCity.open();
    		
    	},
    	
		flag : true,
	    onHide:function(oEvent){
	    	var tabId = this.getView().byId("idTable");
	    	var columndet = tabId.getColumns();
	    	var colcity = columndet[2];
	    	if (this.flag === true){
	    	colcity.setVisible(false);
	    	oEvent.getSource().setText("Show");
	    	this.flag = false;
	    }
	    else{
	    
	    	this.flag=true;
	        colcity.setVisible(true);
	    	oEvent.getSource().setText("Hide");
	    	
	    	
	    }
	    },
		herculis:function(oEvent){
		
			var sId = oEvent.getParameter("arguments").fruitId;

			var sPath = "/" + sId;
						this.getView().bindElement({
				
				path: sPath,
				parameters:{
					expand: 'ToSupplier'
				}
				
				
			});
		},
		/**@type of sap.ui.base.Event */
		onBack:function(){

			/**@type of sap.m.App */
		var oContControl = this.getView().getParent();

		oContControl.to("view1");
	
			
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});