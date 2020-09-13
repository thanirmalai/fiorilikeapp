sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"cap/fin/ar/util/formatter"
], function (Controller, MessageBox, MessageToast,formatter) {
	"use strict";
	return Controller.extend("cap.fin.ar.controller.View1", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis1, this);
		},
		formatter : formatter,
		herculis1: function (oEvent) {
			var sId = oEvent.getParameter("arguments").fruitId;
			var listItemtoDele = oEvent.getParameter("listItem");
			var sPath = "/" + sId;
		},
		mostExpensive: function () {
			var oModel = this.getView().getModel();
			var searchParam = this.getView().byId("idSearch").getValue();
			var that = this;
			oModel.callFunction("/MostExpensiveProduct", {
				urlParameters: {
					I_CATEGORY: searchParam
				},
				success: function (data) {
					var lv_prod_id = data.PRODUCT_ID;
					that.oRouter.navTo("drilldown", {
						fruitId: "ProductSet('" + lv_prod_id + "')"
					});
					MessageToast.show("Most Expensive Product found");
				}
			});
		},
		onCreate: function (oEvent) {
			this.oRouter.navTo("create");
		},
		onNext: function (sPath) {
			var titleId = this.getView().byId("idSearch").getValue();
			var oContControl = this.getView().getParent().getParent();
			/*			var myPage = this.getView().byId("MyPage2");*/
			/*			myPage.setTitle(titleId);*/
			/*            var view2 = oContControl.getPage("view2");*/
			var view2 = oContControl.getDetailPages()[0];
			view2.getContent()[0].getContent()[0].bindElement(sPath);
			view2.getContent()[0].setTitle(titleId);
			/*            page2.setTitle("Test");*/
			/*            page2.*/
			oContControl.to("view2");
		},
		myDelete: function (oEvent) {
			var listItemtoDele = oEvent.getParameter("listItem");
			var listItems = oEvent.getSource();
			listItems.removeItem(listItemtoDele);
		},
		idnewpage: function () {
			this.oRouter.navTo("toolbarpage");
		},
		itempress: function (oEvent) {
			debugger;
			/*	this.onNext(oEvent.getParameter("listItem").getBindingContextPath());*/
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			var sId = sPath.split("/")[sPath.split("/").length - 1];
			this.oRouter.navTo("drilldown", {
				fruitId: sId
			});
		},
		onSearch: function (oEvent) {
			var oQuery = oEvent.getParameter("query");
			var list = this.getView().byId("idLeo");
			var oBinding = list.getBinding("items");
			var that = this;
			if (oQuery.indexOf("-") !== -1) {
				var oModel = this.getView().getModel();
				oModel.read("/ProductSet('" + oQuery + "')", {
					success: function (data) {
						//	alert("Found value");
						that.oRouter.navTo("drilldown", {
							fruitId: "ProductSet('" + oQuery + "')"
						});
						MessageToast.show(oQuery);
					},
					error: function (oErr) {
						//	alert("Not Found value");
						MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);
					}
				});
			} else {
				var oFilter = new sap.ui.model.Filter("CATEGORY", sap.ui.model.FilterOperator.EQ, oQuery);
				// var oFilter1 = new sap.ui.model.Filter("type",sap.ui.model.FilterOperator.Contains,oQuery);
				// var oFilter2 = new sap.ui.model.Filter({
				// 	filters :[oFilter,oFilter1],
				// 	and : false
				// });
				oBinding.filter([oFilter]);
			}
		},
		/**
		 *@memberOf cap.fin.ar.controller.View1
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});