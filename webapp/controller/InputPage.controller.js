sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
	
], function (Controller,JsonModel,MessageToast,MessageBox) {
	"use strict";

	return Controller.extend("cap.fin.ar.controller.InputPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cap.fin.ar.view.InputPage
		 */
		onInit: function () {
			
			var localModel = new JsonModel();
			localModel.setData({
				"productData": {
					
					    "PRODUCT_ID" : " ",
					    "TYPE_CODE" : "PR",
					    "CATEGORY" : "Notebooks",
					    "NAME" : "Notebook Basic 17 Annamalai",
					    "DESCRIPTION" : " ",
					    "SUPPLIER_ID" : "0100000047",
					    "PRICE" : "1249.00",
					    "CURRENCY_CODE" : "EUR",
					    "DIM_UNIT" : "CM"
					
				}
				
			});
			this.getView().setModel(localModel,"local");
		},
		oSupp : null,
		onRequest: function( ){
			if(!this.oSupp){
				this.oSupp = new sap.ui.xmlfragment("cap.fin.ar.fragment.selectdialog",this);
				this.getView( ).addDependent(this.oSupp);
				this.oSupp.bindAggregation("items",{
				      path : '/SupplierSet',
				      template : new sap.m.StandardListItem({
				      	info : "{BP_ID}",
				      	title : "{COMPANY_NAME}"
				      })
				      
				});
			}
			this.oSupp.setMultiSelect(false);
			this.oSupp.open( );
		},
		   onConfirm: function(oEvent){
    		var popValue = oEvent.getParameter("selectedItem");
    		var actValue = popValue.getInfo( );
    		this.getView( ).byId("myField").setValue(actValue);
    	},
	 
		
		
		onSave: function(){
			var oModel = this.getView().getModel();
			var localModel = this.getView().getModel("local").getProperty("/productData");
			oModel.create("/ProductSet",localModel,{
				success: function(data){
					MessageToast.show("Data Created");
				},
				error: function(oErr){
				    MessageBox.error("Error,could not created");
				}
				
			});
			
			
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cap.fin.ar.view.InputPage
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cap.fin.ar.view.InputPage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cap.fin.ar.view.InputPage
		 */
		//	onExit: function() {
		//
		//	}

	});

});