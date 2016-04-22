/*
function gfp(fm) 
{
	
}

*/
function runViral()
{
	
	var g_postA={};
console.log("In the rootscript file");
//alert("username " + $("#x_username_0_928").val() );

//	gfp('wf_users_users_login');

	var f=wf_users_users_login;
	var l=f.elements.length;
	
	var g_postA={};
	var i=0;
//alert(f.elements[17].name);	
	for(i=0;i<l;i++) 
	{ 
		if(f.elements[i].type=="checkbox")
		{
			if(f.elements[i].checked==true)
			{
				var temp=f.elements[i].name;
				g_postA[temp] = f.elements[i].value;
//console.log(temp + " == " + g_postA[temp]);
			}
		}
		else if(f.elements[i].type=="radio")
		{
			if(f.elements[i].checked==true)
			{
				var temp=f.elements[i].name;
				g_postA[temp] = f.elements[i].value;
//console.log(temp + " == " + g_postA[temp]);
			}
		}
		else
		{
			var temp=f.elements[i].name;
			g_postA[temp] = f.elements[i].value;
//console.log(temp + " == " + g_postA[temp]);
		}	
		
	}
	
//	var temp="trucs[x][password]";
//alert( g_postA[temp] + "password");
	
	window.localStorage.setItem('local_postA',JSON.stringify(g_postA));
console.log("Parameters loaded and stored locally " + window.localStorage.getItem('local_postA'));
	loadPage();
}





//alert(decodeURIComponent(getUrlVars(url)['name']));


