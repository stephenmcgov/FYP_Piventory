/*eslint-env jquery*/
var deliveryHTML = "";
var deliveryExcelHTML = "";

var stockCountHTML = "";
var stockCountExcelHTML = "";

var ReportTitle = "";
var thisDate = "";
var uID = "";
var i = 0;

/*
! ADD CODE TO READ-IN EXCEL AND DISPLAY INFO !
! REMOVE STORE CONTROLS !
*/

//show reports list on shopfront page
//going to replace this with search reports function
//CHECK BRACKETS HERE
$(document).ready(
    //call API @routes/index.js
    function getreports() 
    {
		$("#eodSearchForm").submit(function (event) 
		{
            event.preventDefault();
            $.ajax(
            {
                type: 'GET',
                url: '/getReports',
                dataType: 'json',
                success: function (data) 
                {
					var reports = "";
					
					//if all fields blank
					if(event.target.storeReportName.value==""&&event.target.prevEODMonth.value==""&&event.target.prevEODYear.value=="")
					{
						for (i = 0; i < data.length; i++) 
						{
							uID = data[i].Curr_Date + " : " + data[i].storeName;
							uID = uID.replace("T"," at ");
							uID = uID.replace(".000Z"," ");
							
							thisDate = data[i].Curr_Date;
							thisDate = thisDate.replace("T"," at ");
							thisDate = thisDate.replace(".000Z"," ");
							
							reports += "<button class='btn-success'>";
							reports += uID+"</button>";
							
							reports += "<div class='panel'><br>";
							reports += "<p>Store: " + data[i].storeName + "</p>";
							reports += "<p>Date: " + thisDate + "</p>";
							reports += "<p>Staff: " + data[i].staffName + "</p>";
							reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
							reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
							reports += "<br>";
							reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
							reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
							reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
							reports += "<p>Other: " + data[i].EOD_Other + "</p>";
							reports += "<p>Expenses: " + data[i].Expenses + "</p>";
							reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
							reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
							reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
							reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
							
							reports += "</div><br>"
						}
					}
					
					//if only store
					if(event.target.storeReportName.value!=""&&event.target.prevEODMonth.value==""&&event.target.prevEODYear.value=="")
					{
						for (i = 0; i < data.length; i++) 
						{
							if(event.target.storeReportName.value==data[i].storeName)
							{
							uID = data[i].Curr_Date + " : " + data[i].storeName;
							uID = uID.replace("T"," at ");
							uID = uID.replace(".000Z"," ");
							
							thisDate = data[i].Curr_Date;
							thisDate = thisDate.replace("T"," at ");
							thisDate = thisDate.replace(".000Z"," ");
							
							reports += "<button class='btn-success'>";
							reports += uID+"</button>";
							
							reports += "<div class='panel'><br>";
							reports += "<p>Store: " + data[i].storeName + "</p>";
							reports += "<p>Date: " + thisDate + "</p>";
							reports += "<p>Staff: " + data[i].staffName + "</p>";
							reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
							reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
							reports += "<br>";
							reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
							reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
							reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
							reports += "<p>Other: " + data[i].EOD_Other + "</p>";
							reports += "<p>Expenses: " + data[i].Expenses + "</p>";
							reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
							reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
							reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
							reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
							
							reports += "</div><br>"
						}
					}
					
					//if only month
					if(event.target.storeReportName.value==""&&event.target.prevEODMonth.value!=""&&event.target.prevEODYear.value=="")
					{
						var parseMonth = "";
						
						if(event.target.prevEODMonth.value=="January")
							parseMonth="01";
						if(event.target.prevEODMonth.value=="February")
							parseMonth="02";
						if(event.target.prevEODMonth.value=="March")
							parseMonth="03";
						if(event.target.prevEODMonth.value=="April")
							parseMonth="04";
						if(event.target.prevEODMonth.value=="May")
							parseMonth="05";
						if(event.target.prevEODMonth.value=="June")
							parseMonth="06";
						if(event.target.prevEODMonth.value=="July")
							parseMonth="07";
						if(event.target.prevEODMonth.value=="August")
							parseMonth="08";
						if(event.target.prevEODMonth.value=="September")
							parseMonth="09";
						if(event.target.prevEODMonth.value=="October")
							parseMonth="10";
						if(event.target.prevEODMonth.value=="November")
							parseMonth="11";
						if(event.target.prevEODMonth.value=="December")
							parseMonth="12";
						
						for (i = 0; i < data.length; i++) 
						{
							if(parseMonth==data[i].Curr_Date.substring(5,7))
							{
								uID = data[i].Curr_Date + " : " + data[i].storeName;
								uID = uID.replace("T"," at ");
								uID = uID.replace(".000Z"," ");
								
								thisDate = data[i].Curr_Date;
								thisDate = thisDate.replace("T"," at ");
								thisDate = thisDate.replace(".000Z"," ");
								
								reports += "<button class='btn-success'>";
								reports += uID+"</button>";
								
								reports += "<div class='panel'><br>";
								reports += "<p>Store: " + data[i].storeName + "</p>";
								reports += "<p>Date: " + thisDate + "</p>";
								reports += "<p>Staff: " + data[i].staffName + "</p>";
								reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
								reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
								reports += "<br>";
								reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
								reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
								reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
								reports += "<p>Other: " + data[i].EOD_Other + "</p>";
								reports += "<p>Expenses: " + data[i].Expenses + "</p>";
								reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
								reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
								reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
								reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
								reports += "</div><br>"
							}
						}
					}
					
					//if only year
					if(event.target.storeReportName.value==""&&event.target.prevEODMonth.value==""&&event.target.prevEODYear.value!="")
					{
						for (i = 0; i < data.length; i++) 
						{
							if(event.target.prevEODYear.value==data[i].Curr_Date.substring(0,4))
							{
								uID = data[i].Curr_Date + " : " + data[i].storeName;
								uID = uID.replace("T"," at ");
								uID = uID.replace(".000Z"," ");
								
								thisDate = data[i].Curr_Date;
								thisDate = thisDate.replace("T"," at ");
								thisDate = thisDate.replace(".000Z"," ");
								
								reports += "<button class='btn-success'>";
								reports += uID+"</button>";
								
								reports += "<div class='panel'><br>";
								reports += "<p>Store: " + data[i].storeName + "</p>";
								reports += "<p>Date: " + thisDate + "</p>";
								reports += "<p>Staff: " + data[i].staffName + "</p>";
								reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
								reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
								reports += "<br>";
								reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
								reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
								reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
								reports += "<p>Other: " + data[i].EOD_Other + "</p>";
								reports += "<p>Expenses: " + data[i].Expenses + "</p>";
								reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
								reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
								reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
								reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
								
								reports += "</div><br>"
							}
						}
					}
					
					//if store + month
					if(event.target.storeReportName.value!=""&&event.target.prevEODMonth.value!=""&&event.target.prevEODYear.value=="")
					{	
						if(event.target.prevEODMonth.value=="January")
							parseMonth="01";
						if(event.target.prevEODMonth.value=="February")
							parseMonth="02";
						if(event.target.prevEODMonth.value=="March")
							parseMonth="03";
						if(event.target.prevEODMonth.value=="April")
							parseMonth="04";
						if(event.target.prevEODMonth.value=="May")
							parseMonth="05";
						if(event.target.prevEODMonth.value=="June")
							parseMonth="06";
						if(event.target.prevEODMonth.value=="July")
							parseMonth="07";
						if(event.target.prevEODMonth.value=="August")
							parseMonth="08";
						if(event.target.prevEODMonth.value=="September")
							parseMonth="09";
						if(event.target.prevEODMonth.value=="October")
							parseMonth="10";
						if(event.target.prevEODMonth.value=="November")
							parseMonth="11";
						if(event.target.prevEODMonth.value=="December")
							parseMonth="12";
						
						for (i = 0; i < data.length; i++) 
						{
							if(event.target.storeReportName.value==data[i].storeName&&parseMonth==data[i].Curr_Date.substring(5,7))
							{
								uID = data[i].Curr_Date + " : " + data[i].storeName;
								uID = uID.replace("T"," at ");
								uID = uID.replace(".000Z"," ");
								
								thisDate = data[i].Curr_Date;
								thisDate = thisDate.replace("T"," at ");
								thisDate = thisDate.replace(".000Z"," ");
								
								reports += "<button class='btn-success'>";
								reports += uID+"</button>";
								
								reports += "<div class='panel'><br>";
								reports += "<p>Store: " + data[i].storeName + "</p>";
								reports += "<p>Date: " + thisDate + "</p>";
								reports += "<p>Staff: " + data[i].staffName + "</p>";
								reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
								reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
								reports += "<br>";
								reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
								reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
								reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
								reports += "<p>Other: " + data[i].EOD_Other + "</p>";
								reports += "<p>Expenses: " + data[i].Expenses + "</p>";
								reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
								reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
								reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
								reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
								
								reports += "</div><br>"
							}
						}
					}
					
					//if store + year
					if(event.target.storeReportName.value!=""&&event.target.prevEODMonth.value==""&&event.target.prevEODYear.value!="")
					{
						for (i = 0; i < data.length; i++) 
						{
							if(event.target.storeReportName.value==data[i].storeName&&event.target.prevEODYear.value==data[i].Curr_Date.substring(0,4))
							{
								uID = data[i].Curr_Date + " : " + data[i].storeName;
								uID = uID.replace("T"," at ");
								uID = uID.replace(".000Z"," ");
								
								thisDate = data[i].Curr_Date;
								thisDate = thisDate.replace("T"," at ");
								thisDate = thisDate.replace(".000Z"," ");
								
								reports += "<button class='btn-success'>";
								reports += uID+"</button>";
								
								reports += "<div class='panel'><br>";
								reports += "<p>Store: " + data[i].storeName + "</p>";
								reports += "<p>Date: " + thisDate + "</p>";
								reports += "<p>Staff: " + data[i].staffName + "</p>";
								reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
								reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
								reports += "<br>";
								reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
								reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
								reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
								reports += "<p>Other: " + data[i].EOD_Other + "</p>";
								reports += "<p>Expenses: " + data[i].Expenses + "</p>";
								reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
								reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
								reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
								reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
								
								reports += "</div><br>"
							}
						}
					}
					
					//if month + year
					if(event.target.storeReportName.value==""&&event.target.prevEODMonth.value!=""&&event.target.prevEODYear.value!=""){
						
						if(event.target.prevEODMonth.value=="January")
							parseMonth="01";
						if(event.target.prevEODMonth.value=="February")
							parseMonth="02";
						if(event.target.prevEODMonth.value=="March")
							parseMonth="03";
						if(event.target.prevEODMonth.value=="April")
							parseMonth="04";
						if(event.target.prevEODMonth.value=="May")
							parseMonth="05";
						if(event.target.prevEODMonth.value=="June")
							parseMonth="06";
						if(event.target.prevEODMonth.value=="July")
							parseMonth="07";
						if(event.target.prevEODMonth.value=="August")
							parseMonth="08";
						if(event.target.prevEODMonth.value=="September")
							parseMonth="09";
						if(event.target.prevEODMonth.value=="October")
							parseMonth="10";
						if(event.target.prevEODMonth.value=="November")
							parseMonth="11";
						if(event.target.prevEODMonth.value=="December")
							parseMonth="12";
						
						for (i = 0; i < data.length; i++) 
						{
							if(parseMonth==data[i].Curr_Date.substring(5,7)&&event.target.prevEODYear.value==data[i].Curr_Date.substring(0,4))
							{
								uID = data[i].Curr_Date + " : " + data[i].storeName;
								uID = uID.replace("T"," at ");
								uID = uID.replace(".000Z"," ");
								
								thisDate = data[i].Curr_Date;
								thisDate = thisDate.replace("T"," at ");
								thisDate = thisDate.replace(".000Z"," ");
								
								reports += "<button class='btn-success'>";
								reports += uID+"</button>";
								
								reports += "<div class='panel'><br>";
								reports += "<p>Store: " + data[i].storeName + "</p>";
								reports += "<p>Date: " + thisDate + "</p>";
								reports += "<p>Staff: " + data[i].staffName + "</p>";
								reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
								reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
								reports += "<br>";
								reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
								reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
								reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
								reports += "<p>Other: " + data[i].EOD_Other + "</p>";
								reports += "<p>Expenses: " + data[i].Expenses + "</p>";
								reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
								reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
								reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
								reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
								
								reports += "</div><br>"
							}
						}
					}
					
					//if all fields filled
					if(event.target.storeReportName.value!=""&&event.target.prevEODMonth.value!=""&&event.target.prevEODYear.value!="")
					{
						if(event.target.prevEODMonth.value=="January")
							parseMonth="01";
						if(event.target.prevEODMonth.value=="February")
							parseMonth="02";
						if(event.target.prevEODMonth.value=="March")
							parseMonth="03";
						if(event.target.prevEODMonth.value=="April")
							parseMonth="04";
						if(event.target.prevEODMonth.value=="May")
							parseMonth="05";
						if(event.target.prevEODMonth.value=="June")
							parseMonth="06";
						if(event.target.prevEODMonth.value=="July")
							parseMonth="07";
						if(event.target.prevEODMonth.value=="August")
							parseMonth="08";
						if(event.target.prevEODMonth.value=="September")
							parseMonth="09";
						if(event.target.prevEODMonth.value=="October")
							parseMonth="10";
						if(event.target.prevEODMonth.value=="November")
							parseMonth="11";
						if(event.target.prevEODMonth.value=="December")
							parseMonth="12";
						
						for (i = 0; i < data.length; i++) 
						{
							if(event.target.storeReportName.value==data[i].storeName&&parseMonth==data[i].Curr_Date.substring(5,7)&&event.target.prevEODYear.value==data[i].Curr_Date.substring(0,4))
							{
								uID = data[i].Curr_Date + " : " + data[i].storeName;
								uID = uID.replace("T"," at ");
								uID = uID.replace(".000Z"," ");
								
								thisDate = data[i].Curr_Date;
								thisDate = thisDate.replace("T"," at ");
								thisDate = thisDate.replace(".000Z"," ");
								
								reports += "<button class='btn-success'>";
								reports += uID+"</button>";
								
								reports += "<div class='panel'><br>";
								reports += "<p>Store: " + data[i].storeName + "</p>";
								reports += "<p>Date: " + thisDate + "</p>";
								reports += "<p>Staff: " + data[i].staffName + "</p>";
								reports += "<p>Shift Start: " + data[i].shiftStart + "</p>";
								reports += "<p>Shift End: " + data[i].shiftEnd + "</p>";
								reports += "<br>";
								reports += "<p>Start Float: " + data[i].BOD_Float + "</p>";
								reports += "<p>Cash Sales: " + data[i].EOD_Cash + "</p>";
								reports += "<p>Card Sales: " + data[i].EOD_Card + "</p>";
								reports += "<p>Other: " + data[i].EOD_Other + "</p>";
								reports += "<p>Expenses: " + data[i].Expenses + "</p>";
								reports += "<p>Cash Total: " + data[i].EOD_CashTotal + "</p>";
								reports += "<p>Full Total: " + data[i].EOD_Total + "</p>";
								reports += "<p>End Float: " + data[i].EOD_Float + "</p>";
								reports += "<p>Float Error: " + data[i].floatDiff + "</p>";
								
								reports += "</div><br>"
							}
						}
					}
					
					$("#feedreports").html(reports);
				}
			}
		});
	});
});

function showEOD_report()
{
	var storeName = document.getElementById("storeName").value;
	var staffName = document.getElementById("inputStaffName").value;
	var shiftStart = document.getElementById("inputShiftStart").value;
	var shiftEnd = document.getElementById("inputShiftEnd").value;
	var BODfloat = parseInt(document.getElementById("inputBOD_Float").value);
	var cashAmount = parseInt(document.getElementById("inputEOD_Cash").value);
	var cardAmount = parseInt(document.getElementById("inputEOD_Card").value);
	var otherAmount = parseInt(document.getElementById("inputEOD_Other").value);
	var expensesAmount = parseInt(document.getElementById("inputEOD_Expenses").value);
	var EODfloat = parseInt(document.getElementById("inputEOD_Float").value);
	var EODtotal = cashAmount + cardAmount + otherAmount - expensesAmount;
	var EODcash_total = cashAmount + otherAmount - expensesAmount;
	var EODcard_total = cardAmount;
	var floatDiff = EODfloat - (EODcash_total + BODfloat);
	
	var currentDate = new Date();
	var date = currentDate.getDate();
	var month = currentDate.getMonth(); //Be careful! January is 0 not 1
	var year = currentDate.getFullYear();
	var timeStamp = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	var dateString = date + "-" +(month + 1) + "-" + year;
	
	var EODreport = "";
	EODreport += "<br>";EODreport += "<br>";EODreport += "<br>";
	EODreport += "<h2>EOD Report for: " + storeName + " on " + dateString + " at " + timeStamp + "</h2><br>";
	EODreport += "<p>Staff: " + staffName + "</p>";
	EODreport += "<p>Shift Start: " + shiftStart + "</p>";
	EODreport += "<p>Shift End: " + shiftEnd + "</p>";
	EODreport += "<p>Cash Amount: " + cashAmount + "</p>";
	EODreport += "<p>Other Amount: " + otherAmount + "</p>";
	EODreport += "<p>Expenses: " + expensesAmount + "</p>";
	EODreport += "<br>";
    EODreport += "<p>Cash Total: " + EODcash_total + "</p>";
    EODreport += "<p>Card Total: " + EODcard_total + "</p>";
	EODreport += "<p>Total Amount: " + EODtotal + "</p>";
	EODreport += "<br>";
	EODreport += "<p>Float Start: " + BODfloat + "</p>";
    EODreport += "<p>Float End: " + EODfloat + "</p>";
	EODreport += "<p>Float Error: " + floatDiff + "</p>";
	EODreport += "<br>";
    EODreport += "<button type='submit' class='btn btn-success btn-md' id='submitReportButton'>Submit Report</button>";
	EODreport += "<br><br>";
				
    //pass the reports variable to the feedreports div id in shopFront
    $("#eod_draft").html(EODreport);
	document.getElementById("inputCurr_Date").value = currentDate;
	document.getElementById("inputfloatDiff").value = floatDiff;
	document.getElementById("inputCashTotal").value = EODcash_total;
	document.getElementById("inputTotal").value = EODtotal;
}

function genBatchSalesExcel() 
{
	var store = document.getElementById("storeReportName").value;
	var month = document.getElementById("prevEODMonth").value
	var year = document.getElementById("prevEODYear").value;	
	var parseMonth = "";
						
	if(month=="January")
		parseMonth="01";
	if(month=="February")
		parseMonth="02";
	if(month=="March")
		parseMonth="03";
	if(month=="April")
		parseMonth="04";
	if(month=="May")
		parseMonth="05";
	if(month=="June")
		parseMonth="06";
	if(month=="July")
		parseMonth="07";
	if(month=="August")
		parseMonth="08";
	if(month=="September")
		parseMonth="09";
	if(month=="October")
		parseMonth="10";
	if(month=="November")
		parseMonth="11";
	if(month=="December")
		parseMonth="12";
	
    $.ajax({
        type: 'GET',
        url: '/getReports/',
        success: function (data) 
        {
			console.log("exporting");
			var CSV = '';    
			//Set Report title in first row or line
			ReportTitle = "Batch Sales Reports";
			CSV += ReportTitle + '\r\n\n';
	
			//init rows
			var row = "";
	
			row += '"' + "DATE" + '",';
			row += '"' + "STORE" + '",';
			row += '"' + "STAFF NAME" + '",';
			row += '"' + "SHIFT START" + '",';
			row += '"' + "SHIFT END" + '",';
			row += '"' + "START FLOAT" + '",';
			row += '"' + "CASH SALES" + '",';
			row += '"' + "OTHER SALES" + '",';
			row += '"' + "CARD SALES" + '",';
			row += '"' + "EXPENSES" + '",';
			row += '"' + "CASH TOTAL" + '",';
			row += '"' + "TOTAL" + '",';
			row += '"' + "END FLOAT" + '",';
			row += '"' + "FLOAT ERROR" + '",';
			
			CSV += row + '\r\n';
			
			//if all fields blank
			if(store==""&&month==""&&year=="")
			{
				for (i = 0; i < data.length; i++)
				{
					row = "";
        
					row += '"' + data[i].Curr_Date + '",';
					row += '"' + data[i].storeName + '",';
					row += '"' + data[i].staffName + '",';
					row += '"' + data[i].shiftStart + '",';
					row += '"' + data[i].shiftEnd + '",';
					row += '"' + data[i].BOD_Float + '",';
					row += '"' + data[i].EOD_Cash + '",';
					row += '"' + data[i].EOD_Other + '",';
					row += '"' + data[i].EOD_Card + '",';
					row += '"' + data[i].Expenses + '",';
					row += '"' + data[i].EOD_CashTotal + '",';
					row += '"' + data[i].EOD_Total + '",';
					row += '"' + data[i].EOD_Float + '",';
					row += '"' + data[i].floatDiff + '",';

					//add a line break after each row
					CSV += row + '\r\n';
				}
			}

			//if only store
			if(store!=""&&month==""&&year=="")
			{
				for (i = 0; i < data.length; i++)
				{
					if(store==data[i].storeName)
					{
						row = "";

						row += '"' + data[i].Curr_Date + '",';
						row += '"' + data[i].storeName + '",';
						row += '"' + data[i].staffName + '",';
						row += '"' + data[i].shiftStart + '",';
						row += '"' + data[i].shiftEnd + '",';
						row += '"' + data[i].BOD_Float + '",';
						row += '"' + data[i].EOD_Cash + '",';
						row += '"' + data[i].EOD_Other + '",';
						row += '"' + data[i].EOD_Card + '",';
						row += '"' + data[i].Expenses + '",';
						row += '"' + data[i].EOD_CashTotal + '",';
						row += '"' + data[i].EOD_Total + '",';
						row += '"' + data[i].EOD_Float + '",';
						row += '"' + data[i].floatDiff + '",';

						//add a line break after each row
						CSV += row + '\r\n';
					}
				}
			}

			//if only month
			if(store==""&&month!=""&&year=="")
			{
				for (i = 0; i < data.length; i++)
				{
					if(parseMonth==data[i].Curr_Date.substring(5,7))
					{
						row = "";

						row += '"' + data[i].Curr_Date + '",';
						row += '"' + data[i].storeName + '",';
						row += '"' + data[i].staffName + '",';
						row += '"' + data[i].shiftStart + '",';
						row += '"' + data[i].shiftEnd + '",';
						row += '"' + data[i].BOD_Float + '",';
						row += '"' + data[i].EOD_Cash + '",';
						row += '"' + data[i].EOD_Other + '",';
						row += '"' + data[i].EOD_Card + '",';
						row += '"' + data[i].Expenses + '",';
						row += '"' + data[i].EOD_CashTotal + '",';
						row += '"' + data[i].EOD_Total + '",';
						row += '"' + data[i].EOD_Float + '",';
						row += '"' + data[i].floatDiff + '",';

						//add a line break after each row
						CSV += row + '\r\n';
					}
				}
			}

			//if only year
			if(store==""&&month==""&&year!="")
			{
				for (i = 0; i < data.length; i++)
				{
					if(year==data[i].Curr_Date.substring(0,4))
					{
						row = "";

						row += '"' + data[i].Curr_Date + '",';
						row += '"' + data[i].storeName + '",';
						row += '"' + data[i].staffName + '",';
						row += '"' + data[i].shiftStart + '",';
						row += '"' + data[i].shiftEnd + '",';
						row += '"' + data[i].BOD_Float + '",';
						row += '"' + data[i].EOD_Cash + '",';
						row += '"' + data[i].EOD_Other + '",';
						row += '"' + data[i].EOD_Card + '",';
						row += '"' + data[i].Expenses + '",';
						row += '"' + data[i].EOD_CashTotal + '",';
						row += '"' + data[i].EOD_Total + '",';
						row += '"' + data[i].EOD_Float + '",';
						row += '"' + data[i].floatDiff + '",';

						//add a line break after each row
						CSV += row + '\r\n';
					}
				}
			}

			//if store + month
			if(store!=""&&month!=""&&year=="")
			{
				for (i = 0; i < data.length; i++)
				{
					if(store==data[i].storeName&&parseMonth==data[i].Curr_Date.substring(5,7))
					{
						row = "";

						row += '"' + data[i].Curr_Date + '",';
						row += '"' + data[i].storeName + '",';
						row += '"' + data[i].staffName + '",';
						row += '"' + data[i].shiftStart + '",';
						row += '"' + data[i].shiftEnd + '",';
						row += '"' + data[i].BOD_Float + '",';
						row += '"' + data[i].EOD_Cash + '",';
						row += '"' + data[i].EOD_Other + '",';
						row += '"' + data[i].EOD_Card + '",';
						row += '"' + data[i].Expenses + '",';
						row += '"' + data[i].EOD_CashTotal + '",';
						row += '"' + data[i].EOD_Total + '",';
						row += '"' + data[i].EOD_Float + '",';
						row += '"' + data[i].floatDiff + '",';

						//add a line break after each row
						CSV += row + '\r\n';
					}
				}
			}

			//if store + year
			if(store!=""&&month==""&&year!="")
			{
				for (i = 0; i < data.length; i++)
				{
					if(store==data[i].storeName&&year==data[i].Curr_Date.substring(0,4))
					{
						row = "";

						row += '"' + data[i].Curr_Date + '",';
						row += '"' + data[i].storeName + '",';
						row += '"' + data[i].staffName + '",';
						row += '"' + data[i].shiftStart + '",';
						row += '"' + data[i].shiftEnd + '",';
						row += '"' + data[i].BOD_Float + '",';
						row += '"' + data[i].EOD_Cash + '",';
						row += '"' + data[i].EOD_Other + '",';
						row += '"' + data[i].EOD_Card + '",';
						row += '"' + data[i].Expenses + '",';
						row += '"' + data[i].EOD_CashTotal + '",';
						row += '"' + data[i].EOD_Total + '",';
						row += '"' + data[i].EOD_Float + '",';
						row += '"' + data[i].floatDiff + '",';

						//add a line break after each row
						CSV += row + '\r\n';
					}
				}
			}

			//if month + year
			if(store==""&&month!=""&&year!="")
			{
				for (i = 0; i < data.length; i++)
				{
					if(parseMonth==data[i].Curr_Date.substring(5,7)&&year==data[i].Curr_Date.substring(0,4))
					{
						row = "";

						row += '"' + data[i].Curr_Date + '",';
						row += '"' + data[i].storeName + '",';
						row += '"' + data[i].staffName + '",';
						row += '"' + data[i].shiftStart + '",';
						row += '"' + data[i].shiftEnd + '",';
						row += '"' + data[i].BOD_Float + '",';
						row += '"' + data[i].EOD_Cash + '",';
						row += '"' + data[i].EOD_Other + '",';
						row += '"' + data[i].EOD_Card + '",';
						row += '"' + data[i].Expenses + '",';
						row += '"' + data[i].EOD_CashTotal + '",';
						row += '"' + data[i].EOD_Total + '",';
						row += '"' + data[i].EOD_Float + '",';
						row += '"' + data[i].floatDiff + '",';

						//add a line break after each row
						CSV += row + '\r\n';
					}
				}
			}

			//if all fields filled
			if(store!=""&&month!=""&&year!="")
			{
				for (i = 0; i < data.length; i++)
				{
					if(store==data[i].storeName&&parseMonth==data[i].Curr_Date.substring(5,7)&&year==data[i].Curr_Date.substring(0,4))
					{
						row = "";

						row += '"' + data[i].Curr_Date + '",';
						row += '"' + data[i].storeName + '",';
						row += '"' + data[i].staffName + '",';
						row += '"' + data[i].shiftStart + '",';
						row += '"' + data[i].shiftEnd + '",';
						row += '"' + data[i].BOD_Float + '",';
						row += '"' + data[i].EOD_Cash + '",';
						row += '"' + data[i].EOD_Other + '",';
						row += '"' + data[i].EOD_Card + '",';
						row += '"' + data[i].Expenses + '",';
						row += '"' + data[i].EOD_CashTotal + '",';
						row += '"' + data[i].EOD_Total + '",';
						row += '"' + data[i].EOD_Float + '",';
						row += '"' + data[i].floatDiff + '",';

						//add a line break after each row
						CSV += row + '\r\n';
					}
				}
			}                    	

			if (CSV == '') 
			{        
				alert("Invalid data");
				return;
			}

			//Generate a file name
			var fileName = "";
			//this will remove the blank-spaces from the title and replace it with an underscore
			fileName += ReportTitle.replace(/ /g,"_");   
			
			//Initialize file format you want csv or xls
			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
			
			// Now the little tricky part.
			// you can use either>> window.open(uri);
			// but this will not work in some browsers
			// or you will not get the correct file extension    
			
			//this trick will generate a temp <a /> tag
			var link = document.createElement("a");    
			link.href = uri;

			//set the visibility hidden so it will not effect on your web-layout
			link.style = "visibility:hidden";
			link.download = fileName + ".csv";

			//this part will append the anchor tag and remove it after automatic click
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	});
}

function updateDeliveryTotal()
{
	var cS = parseInt(document.getElementById("deliveryProductS").value);
	var cM = parseInt(document.getElementById("deliveryProductM").value);
	var cL = parseInt(document.getElementById("deliveryProductL").value);
	var cXL = parseInt(document.getElementById("deliveryProductXL").value);
	var c2XL = parseInt(document.getElementById("deliveryProduct2XL").value);
	var c3XL = parseInt(document.getElementById("deliveryProduct3XL").value);
	var c4XL = parseInt(document.getElementById("deliveryProduct4XL").value);
	var cTotal = cS + cM + cL + cXL + c2XL + c3XL + c4XL;
	document.getElementById("deliveryProductTotal").value = parseInt(cTotal);
}

function updateStockCountTotal()
{
	var cS = parseInt(document.getElementById("stockCountProductS").value);
	var cM = parseInt(document.getElementById("stockCountProductM").value);
	var cL = parseInt(document.getElementById("stockCountProductL").value);
	var cXL = parseInt(document.getElementById("stockCountProductXL").value);
	var c2XL = parseInt(document.getElementById("stockCountProduct2XL").value);
	var c3XL = parseInt(document.getElementById("stockCountProduct3XL").value);
	var c4XL = parseInt(document.getElementById("stockCountProduct4XL").value);
	var cTotal = cS + cM + cL + cXL + c2XL + c3XL + c4XL;
	document.getElementById("stockCountProductTotal").value = parseInt(cTotal);
}


function addDeliveryProduct()
{
	document.getElementById("deliverySummaryBanner").style = "display:block";
	document.getElementById("printDeliveryReport").style = "display:block";

	deliveryHTML += "<br>";
	deliveryHTML += "<br><a>Product Name: " + document.getElementById("deliveryProductName").value + "</a><br>";
	deliveryHTML += "<br><a>Sub Code: " + document.getElementById("deliveryProductCode").value + "</a><br>";
	deliveryHTML += "<br><a>Sizes:</a><br>";
	deliveryHTML += "<a>S: " + document.getElementById("deliveryProductS").value + " </a>";
	deliveryHTML += "<a>M: " + document.getElementById("deliveryProductM").value + " </a>";
	deliveryHTML += "<a>L: " + document.getElementById("deliveryProductL").value + " </a>";
	deliveryHTML += "<a>XL: " + document.getElementById("deliveryProductXL").value + " </a>";
	deliveryHTML += "<a>2XL: " + document.getElementById("deliveryProduct2XL").value + " </a>";
	deliveryHTML += "<a>3XL: " + document.getElementById("deliveryProduct3XL").value + " </a>";
	deliveryHTML += "<a>4XL: " + document.getElementById("deliveryProduct4XL").value + " </a><br>";
	deliveryHTML += "<br><a>Total: " + document.getElementById("deliveryProductTotal").value + "</a><br>";
	
	$("#deliverySummary").html(deliveryHTML);
	
	//discretely add data to excelHTML for printing
	var row = "";
	
	row += '"' + document.getElementById("deliveryProductName").value + '",';
	row += '"' + document.getElementById("deliveryProductCode").value + '",';
	row += '"' + document.getElementById("deliveryProductS").value + '",';
	row += '"' + document.getElementById("deliveryProductM").value + '",';
	row += '"' + document.getElementById("deliveryProductL").value + '",';
	row += '"' + document.getElementById("deliveryProductXL").value + '",';
	row += '"' + document.getElementById("deliveryProduct2XL").value + '",';
	row += '"' + document.getElementById("deliveryProduct3XL").value + '",';
	row += '"' + document.getElementById("deliveryProduct4XL").value + '",';
	row += '"' + document.getElementById("deliveryProductTotal").value + '",';
	
	deliveryExcelHTML += row + '\r\n';
	
	//reset fields
	document.getElementById("deliveryProductName").value = "";
	document.getElementById("deliveryProductCode").value = "";
	document.getElementById("deliveryProductS").value = 0;
	document.getElementById("deliveryProductM").value = 0;
	document.getElementById("deliveryProductL").value = 0;
	document.getElementById("deliveryProductXL").value = 0;
	document.getElementById("deliveryProduct2XL").value = 0;
	document.getElementById("deliveryProduct3XL").value = 0;
	document.getElementById("deliveryProduct4XL").value = 0;
	document.getElementById("deliveryProductTotal").value = 0;
}

function genDeliveryExcel() 
{
	var CSV = '';    
    //Set Report title in first row or line
	var currentDate = new Date();
	var date = currentDate.getDate();
	var month = currentDate.getMonth(); //Be careful! January is 0 not 1
	var year = currentDate.getFullYear();
	//var timeStamp = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	var dateString = date + "-" +(month + 1) + "-" + year;
	
    ReportTitle = "Delivery_" + dateString + "_" + document.getElementById("fromStore").value + "_to_" + document.getElementById("toStore").value;
	
    CSV += ReportTitle + '\r\n\n';

	var row = "";
	
	row += '"' + "PRODUCT NAME" + '",';
	row += '"' + "SUB CODE" + '",';
	row += '"' + "S" + '",';
	row += '"' + "M" + '",';
	row += '"' + "L" + '",';
	row += '"' + "XL" + '",';
	row += '"' + "2XL" + '",';
	row += '"' + "3XL" + '",';
	row += '"' + "4XL" + '",';
	row += '"' + "TOTAL" + '",';
	
	CSV += row + '\r\n';
	
	CSV += deliveryExcelHTML;
	
	if (CSV == '') 
	{        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    //var fileName = ReportTitle + dateString + "_" + document.getElementById("fromStore").value + "_to_" + document.getElementById("toStore").value;
    //this will remove the blank-spaces from the title and replace it with an underscore
    //fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
      
    //this will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = ReportTitle + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function addStockCountProduct()
{
	document.getElementById("stockCountSummaryBanner").style = "display:block";
	document.getElementById("printStockCountReport").style = "display:block";

	stockCountHTML += "<br>";
	stockCountHTML += "<br><a>Product Name: " + document.getElementById("stockCountProductName").value + "</a><br>";
	stockCountHTML += "<br><a>Sub Code: " + document.getElementById("stockCountProductCode").value + "</a><br>";
	stockCountHTML += "<br><a>Sizes:</a><br>";
	stockCountHTML += "<a>S: " + document.getElementById("stockCountProductS").value + " </a>";
	stockCountHTML += "<a>M: " + document.getElementById("stockCountProductM").value + " </a>";
	stockCountHTML += "<a>L: " + document.getElementById("stockCountProductL").value + " </a>";
	stockCountHTML += "<a>XL: " + document.getElementById("stockCountProductXL").value + " </a>";
	stockCountHTML += "<a>2XL: " + document.getElementById("stockCountProduct2XL").value + " </a>";
	stockCountHTML += "<a>3XL: " + document.getElementById("stockCountProduct3XL").value + " </a>";
	stockCountHTML += "<a>4XL: " + document.getElementById("stockCountProduct4XL").value + " </a><br>";
	stockCountHTML += "<br><a>Total: " + document.getElementById("stockCountProductTotal").value + "</a><br>";
	
	$("#stockCountSummary").html(stockCountHTML);
	
	//discretely add data to excelHTML for printing
	var row = "";
	
	row += '"' + document.getElementById("stockCountProductName").value + '",';
	row += '"' + document.getElementById("stockCountProductCode").value + '",';
	row += '"' + document.getElementById("stockCountProductS").value + '",';
	row += '"' + document.getElementById("stockCountProductM").value + '",';
	row += '"' + document.getElementById("stockCountProductL").value + '",';
	row += '"' + document.getElementById("stockCountProductXL").value + '",';
	row += '"' + document.getElementById("stockCountProduct2XL").value + '",';
	row += '"' + document.getElementById("stockCountProduct3XL").value + '",';
	row += '"' + document.getElementById("stockCountProduct4XL").value + '",';
	row += '"' + document.getElementById("stockCountProductTotal").value + '",';
	
	stockCountExcelHTML += row + '\r\n';
	
	//reset fields
	document.getElementById("stockCountProductName").value = "";
	document.getElementById("stockCountProductCode").value = "";
	document.getElementById("stockCountProductS").value = 0;
	document.getElementById("stockCountProductM").value = 0;
	document.getElementById("stockCountProductL").value = 0;
	document.getElementById("stockCountProductXL").value = 0;
	document.getElementById("stockCountProduct2XL").value = 0;
	document.getElementById("stockCountProduct3XL").value = 0;
	document.getElementById("stockCountProduct4XL").value = 0;
	document.getElementById("stockCountProductTotal").value = 0;
}

function genStockCountExcel() 
{
	var CSV = '';    
    //Set Report title in first row or line
	var currentDate = new Date();
	var date = currentDate.getDate();
	var month = currentDate.getMonth(); //Be careful! January is 0 not 1
	var year = currentDate.getFullYear();
	//var timeStamp = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	var dateString = date + "-" +(month + 1) + "-" + year;
	
    ReportTitle = "StockCount_" + document.getElementById("storeCountName").value + "_" + dateString;
	
    CSV += ReportTitle + '\r\n\n';

	var row = "";
	
	row += '"' + "PRODUCT NAME" + '",';
	row += '"' + "SUB CODE" + '",';
	row += '"' + "S" + '",';
	row += '"' + "M" + '",';
	row += '"' + "L" + '",';
	row += '"' + "XL" + '",';
	row += '"' + "2XL" + '",';
	row += '"' + "3XL" + '",';
	row += '"' + "4XL" + '",';
	row += '"' + "TOTAL" + '",';
	
	CSV += row + '\r\n';
	
	CSV += stockCountExcelHTML;
	
	if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    //var fileName = ReportTitle + dateString + "_" + document.getElementById("fromStore").value + "_to_" + document.getElementById("toStore").value;
    //this will remove the blank-spaces from the title and replace it with an underscore
    //fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = ReportTitle + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}	

$(document).ready(
function popEODYear()
{
	var date = "";
	var yID = "";
	var yearList = "";
	var yearListArray = [];
	
	$.ajax({
		type: 'GET',
        url: '/getReports/',
        success: function (data) 
        {
			for (i = 0; i < data.length; i++)
			{			
				date = data[i].Curr_Date;
				yID = date.substring(0,4);
					
				if (yearListArray.includes(yID)) 
				{
					continue;
				}
				else 
				{
					yearList += "<option name=" + yID + " value=" + yID + ">" + yID + "</option>";
					yearListArray.push(yID);
				}
			}
					
			$("#prevEODYearList").html(yearList);	
		}		
	});
});

function fillEODMonth() 
{
    document.getElementById("prevEODMonth").value = document.getElementById("prevEODMonthList").value;
}

function fillEODYear() 
{
    document.getElementById("prevEODYear").value = document.getElementById("prevEODYearList").value;
}