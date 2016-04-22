var joobimlname=new Array();
var joobimlsrv=new Array();
var joobimlext=new Array();

function joobRecEmail( id, emailname, emailserver,  emailext ) {
	joobimlname[id]=emailname;
	joobimlsrv[id]=emailserver;
	joobimlext[id]=emailext;
}

//for now it is kept like that but this function may be called within the on domready later on to parse the full arrays
//and show the email based on the id of the span
//function joobenEmail( id ,idLabel) {
//
//	 span=document.getElementById(idLabel);
//	 span.appendChild( document.createTextNode( joobimlname[id]+'@'+joobimlsrv[id]+'.'+joobimlext[id]) );
//
//}

function joobenEmail( id ,idLabel, truncate) {

	 span=document.getElementById(idLabel);

	 var text = joobimlname[id]+'@'+joobimlsrv[id]+'.'+joobimlext[id];
	 if(span.nodeName=='INPUT'){
		span.value=text;
		return true;
	 }

	 if ((text.length > truncate) && (truncate!=0)){
	 	text = text.substring(0, truncate);
	 	text += '...';
	 }
	 if(span.firstChild && span.firstChild.nodeValue==text){
	 	return;
	 }
	 span.appendChild( document.createTextNode( text ) );
}