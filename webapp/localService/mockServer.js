sap.ui.define(["sap/ui/core/util/MockServer"],
function(MockServer){
	return {
	Annamalai : function(){
	 var oMockServer = new MockServer({
	 	rootUri : "/sap/opu/odata/sap/ZANNA_JUNE20_SRV/"
	 });
	 //MockServer.config({
	 //	autoRespond : true,
	 //	autoRespondAfter : 1000
	 //});
	 var sPath = jQuery.sap.getModulePath("cap.fin.ar.localService");
	 var sMeta = sPath + "/metadata.xml";
	 
	 oMockServer.simulate(sMeta,{
	 	sMockdataBaseUrl : sPath + "/mockdata",

	 	bGenerateMissingMockData : true
	 });
	 oMockServer.start();
	}
	};
	
	
});