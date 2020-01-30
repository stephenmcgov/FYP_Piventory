/*eslint-env jquery*/
$(document).ready(
function hideReportMenus()
{
	document.getElementById("eod_report").style.display = "none";
	document.getElementById("hide_eod").style.display = "none";
	
	document.getElementById("deliveryReports").style.display = "none";
	document.getElementById("hide_deliveryReport").style.display = "none";
	
	document.getElementById("stockCountReports").style.display = "none";
	document.getElementById("hide_stockCountReport").style.display = "none";
});

$(document).ready(
function hideProductMenus()
{
	document.getElementById("productMenu").style.display = "none";
	document.getElementById("hide_newProductMenu").style.display = "none";
	
	document.getElementById("updateProducts").style.display = "none";
	document.getElementById("hide_updateProductMenu").style.display = "none";
	
	document.getElementById("previousReports").style.display = "none";
	document.getElementById("hide_prevEOD").style.display = "none";
	
	document.getElementById("accountManagement").style.display = "none";
	document.getElementById("hide_accountManagement").style.display = "none";
});

function showEOD()
{
	if(document.getElementById("eod_report").style.display == "none")
	{
		document.getElementById("eod_report").style.display = "block";
		document.getElementById("hide_eod").style.display = "block";
		document.getElementById("show_eod").style.display = "none";
	}
	
	if(document.getElementById("deliveryReports").style.display == "block")
	{
		document.getElementById("deliveryReports").style.display = "none";
		document.getElementById("hide_deliveryReport").style.display = "none";
		document.getElementById("show_deliveryReport").style.display = "block";
	}
	
	if(document.getElementById("stockCountReports").style.display == "block")
	{
		document.getElementById("stockCountReports").style.display = "none";
		document.getElementById("hide_stockCountReport").style.display = "none";
		document.getElementById("show_stockCountReport").style.display = "block";
	}
}

function hideEOD()
{
	if(document.getElementById("eod_report").style.display == "block")
	{
		document.getElementById("eod_report").style.display = "none";
		document.getElementById("hide_eod").style.display = "none";
		document.getElementById("show_eod").style.display = "block";
	}
}

function showPrevEOD()
{
	if(document.getElementById("previousReports").style.display == "none")
	{
		document.getElementById("previousReports").style.display = "block";
		document.getElementById("hide_prevEOD").style.display = "block";
		document.getElementById("show_prevEOD").style.display = "none";
	}
	
	if(document.getElementById("productMenu").style.display == "block")
	{
		document.getElementById("productMenu").style.display = "none";
		document.getElementById("hide_newProductMenu").style.display = "none";
		document.getElementById("show_newProductMenu").style.display = "block";
	}
	
	if(document.getElementById("updateProducts").style.display == "block")
	{
		document.getElementById("updateProducts").style.display = "none";
		document.getElementById("hide_updateProductMenu").style.display = "none";
		document.getElementById("show_updateProductMenu").style.display = "block";
	}
	
	if(document.getElementById("accountManagement").style.display == "block")
	{
		document.getElementById("accountManagement").style.display = "none";
		document.getElementById("hide_accountManagement").style.display = "none";
		document.getElementById("show_accountManagement").style.display = "block";
	}
}

function hidePrevEOD()
{
	if(document.getElementById("previousReports").style.display == "block")
	{
		document.getElementById("previousReports").style.display = "none";
		document.getElementById("hide_prevEOD").style.display = "none";
		document.getElementById("show_prevEOD").style.display = "block";
	}
}

function showDeliveryReport()
{
	if(document.getElementById("deliveryReports").style.display == "none")
	{
		document.getElementById("deliveryReports").style.display = "block";
		document.getElementById("hide_deliveryReport").style.display = "block";
		document.getElementById("show_deliveryReport").style.display = "none";
	}
	
	if(document.getElementById("eod_report").style.display == "block")
	{
		document.getElementById("eod_report").style.display = "none";
		document.getElementById("hide_eod").style.display = "none";
		document.getElementById("show_eod").style.display = "block";
	}
	
	if(document.getElementById("stockCountReports").style.display == "block")
	{
		document.getElementById("stockCountReports").style.display = "none";
		document.getElementById("hide_stockCountReport").style.display = "none";
		document.getElementById("show_stockCountReport").style.display = "block";
	}
}

function hideDeliveryReport()
{
	if(document.getElementById("deliveryReports").style.display == "block")
	{
		document.getElementById("deliveryReports").style.display = "none";
		document.getElementById("hide_deliveryReport").style.display = "none";
		document.getElementById("show_deliveryReport").style.display = "block";
	}
}

function showNewProductMenu()
{
	if(document.getElementById("productMenu").style.display == "none")
	{
		document.getElementById("productMenu").style.display = "block";
		document.getElementById("hide_newProductMenu").style.display = "block";
		document.getElementById("show_newProductMenu").style.display = "none";
	}
	
	if(document.getElementById("updateProducts").style.display == "block")
	{
		document.getElementById("updateProducts").style.display = "none";
		document.getElementById("hide_updateProductMenu").style.display = "none";
		document.getElementById("show_updateProductMenu").style.display = "block";
	}
		
	if(document.getElementById("previousReports").style.display == "block")
	{
		document.getElementById("previousReports").style.display = "none";
		document.getElementById("hide_prevEOD").style.display = "none";
		document.getElementById("show_prevEOD").style.display = "block";
	}
	
	if(document.getElementById("accountManagement").style.display == "block")
	{
		document.getElementById("accountManagement").style.display = "none";
		document.getElementById("hide_accountManagement").style.display = "none";
		document.getElementById("show_accountManagement").style.display = "block";
	}
}

function hideNewProductMenu()
{
	if(document.getElementById("productMenu").style.display == "block")
	{
		document.getElementById("productMenu").style.display = "none";
		document.getElementById("hide_newProductMenu").style.display = "none";
		document.getElementById("show_newProductMenu").style.display = "block";
	}
}

function showUpdateProductMenu()
{
	if(document.getElementById("updateProducts").style.display == "none")
	{
		document.getElementById("updateProducts").style.display = "block";
		document.getElementById("hide_updateProductMenu").style.display = "block";
		document.getElementById("show_updateProductMenu").style.display = "none";
	}
	
	if(document.getElementById("productMenu").style.display == "block")
	{
		document.getElementById("productMenu").style.display = "none";
		document.getElementById("hide_newProductMenu").style.display = "none";
		document.getElementById("show_newProductMenu").style.display = "block";
	}
		
	if(document.getElementById("previousReports").style.display == "block")
	{
		document.getElementById("previousReports").style.display = "none";
		document.getElementById("hide_prevEOD").style.display = "none";
		document.getElementById("show_prevEOD").style.display = "block";
	}
	
	if(document.getElementById("accountManagement").style.display == "block")
	{
		document.getElementById("accountManagement").style.display = "none";
		document.getElementById("hide_accountManagement").style.display = "none";
		document.getElementById("show_accountManagement").style.display = "block";
	}
}

function hideUpdateProductMenu()
{
	if(document.getElementById("updateProducts").style.display == "block")
	{
		document.getElementById("updateProducts").style.display = "none";
		document.getElementById("hide_updateProductMenu").style.display = "none";
		document.getElementById("show_updateProductMenu").style.display = "block";
	}
}

function showAccountManagement()
{	
	if(document.getElementById("accountManagement").style.display == "none")
	{
		document.getElementById("accountManagement").style.display = "block";
		document.getElementById("hide_accountManagement").style.display = "block";
		document.getElementById("show_accountManagement").style.display = "none";
	}

	if(document.getElementById("productMenu").style.display == "block")
	{
		document.getElementById("productMenu").style.display = "none";
		document.getElementById("hide_newProductMenu").style.display = "none";
		document.getElementById("show_newProductMenu").style.display = "block";
	}
	
	if(document.getElementById("updateProducts").style.display == "block")
	{
		document.getElementById("updateProducts").style.display = "none";
		document.getElementById("hide_updateProductMenu").style.display = "none";
		document.getElementById("show_updateProductMenu").style.display = "block";
	}
		
	if(document.getElementById("previousReports").style.display == "block")
	{
		document.getElementById("previousReports").style.display = "none";
		document.getElementById("hide_prevEOD").style.display = "none";
		document.getElementById("show_prevEOD").style.display = "block";
	}
}

function hideAccountManagement()
{
	if(document.getElementById("accountManagement").style.display == "block")
	{
		document.getElementById("accountManagement").style.display = "none";
		document.getElementById("hide_accountManagement").style.display = "none";
		document.getElementById("show_accountManagement").style.display = "block";
	}
}

function showStockCountReport()
{
	if(document.getElementById("stockCountReports").style.display == "none")
	{
		document.getElementById("stockCountReports").style.display = "block";
		document.getElementById("hide_stockCountReport").style.display = "block";
		document.getElementById("show_stockCountReport").style.display = "none";
	}
	
	if(document.getElementById("deliveryReports").style.display == "block")
	{
		document.getElementById("deliveryReports").style.display = "none";
		document.getElementById("hide_deliveryReport").style.display = "none";
		document.getElementById("show_deliveryReport").style.display = "block";
	}
	
	if(document.getElementById("eod_report").style.display == "block")
	{
		document.getElementById("eod_report").style.display = "none";
		document.getElementById("hide_eod").style.display = "none";
		document.getElementById("show_eod").style.display = "block";
	}
}

function hideStockCountReport()
{
	if(document.getElementById("stockCountReports").style.display == "block")
	{
		document.getElementById("stockCountReports").style.display = "none";
		document.getElementById("hide_stockCountReport").style.display = "none";
		document.getElementById("show_stockCountReport").style.display = "block";
	}
}