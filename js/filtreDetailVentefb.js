$(document).ready(function(){

total();   
sortTable("tableTrier", "1", "desc");
function total(){
     var total=0;
     var quant=0;
    $(".quantProduit").each(function(){
        if($(this).parent().attr("style")!='display: none;'){
          var prixtempesp=$(this).next().html();
          var prixtipsaneso=prixtempesp.replace(/\s/g,'');
          var prix=prixtipsaneso.split(",");
           total+=Number(prix[0]);
           quant+=Number($(this).html());
           
        }
    });
  
   $('.nbProduit').empty().append(quant+" Produit(s)");
   $('.nbPrix').empty().append(total+" Ar");
   $('.nbPrix').number( true, 2 );
   
}

    
function demo(){
$(".inputiltre").on("keyup", function() {
  var value = $(this).val().toLowerCase();
   $(".tbody tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
     total();
   });
});
}
demo();

$(".Pro").on("change",function(event){
    event.preventDefault();
    var col=$('.Pro').val();
 sortTable("tableTrier", col, "desc");

});


function sortTable(tid, col, ord){
	var mybody = $("#"+tid).children('tbody'),
		lines = mybody.children('tr'),
		sorter = [],
		i = -1,
		j = -1;
		
	while(lines[++i]){
		sorter.push([lines.eq(i), lines.eq(i).children('td').eq(col).text()])
	}
	
	if (ord == 'asc') {
		sorter.sort();
	} else if (ord == 'desc') {
		sorter.sort().reverse();
	} else if (ord == 'nasc'){
		sorter.sort(function(a, b){return(a[1] - b[1]);});
	} else if (ord == 'ndesc'){
		sorter.sort(function(a, b){return(b[1] - a[1]);});
	} else if (ord == '?asc'){
		sorter.sort(function(a, b){
			var x = parseInt(a[1], 10),
				y = parseInt(b[1], 10);
			
			if (isNaN(x) || isNaN(y)){
				if (a[1] > b[1]){
					return 1;
				} else if(a[1] < b[1]){
					return -1;
				} else {
					return 0;
				}
			} else {
				return(a[1] - b[1]);
			}
		});
	} else if (ord == '?desc'){
		sorter.sort(function(a, b){
			var x = parseInt(a[1], 10),
				y = parseInt(b[1], 10);
			
			if (isNaN(x) || isNaN(y)){
				if (a[1] > b[1]){
					return -1;
				} else if(a[1] < b[1]){
					return 1;
				} else {
					return 0;
				}
			} else {
				return(b[1] - a[1]);
			}
		});
	}
	
	while(sorter[++j]){
		mybody.append(sorter[j][0]);
	}
}
});