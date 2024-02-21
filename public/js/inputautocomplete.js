  var clientslist=[];

 $(document).ready(function(){
       $.ajax({
            url: 'clients/create',
            type: 'get',
             dataType: 'json',
            success:function(data){
                $.each(data,function(index,value){
                    clientslist.push(value.clientname);
                  //  alert(clientslist);
                });
            }
            });

 });


 $(function(){

     $("#client").autocomplete({
         source:function(request,response){
             var results = $.ui.autocomplete.filter(clientslist,request.term);
             response(results.slice(0,10));
         }
     });
 });

 $(document).ready(function(){
     $("#client").change(function(){
        // alert("The text has been changed.");
         $.ajax({
             url:"clients/show"+"/"+$(this).val(),
             type:"get",
             dataType: "json",
             data: $(this).val(),
             success:function (data) {
                // console.log(data);
                 if(data.length>0){
                     $("#contactperson").val(data[0].contact);
                     $("#phone").val(data[0].phone);
                     $("#email").val(data[0].email);
                     $("#address").val(data[0].address);
                 }

             },
             error:function (data) {

             }
         })
     });
 });


