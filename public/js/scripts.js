 $body = $("body");
let opportunitytrailclone = $("#opportunity-trail").clone();
/*
    $(document).ajaxStart(function(){
      $("#loader").show();
  });

  $(document).ajaxComplete(function(){
       $("#loader").hide();
  });

  $(document).on({
      ajaxStart:function(){$body.addClass("loading");},
      ajaxStop: function(){$body.addClass("loading");}
  });
*/
  function invokeMenu(){
      $("#sidenavmenu").show();
  }

  $(document).ready(function(){
      $(opportunitySummary);
      $( getCurrentopportunities);
  });

 // HIDE SIDE MENU WHEN CLICK OUTSIDE IT
 $(document).mouseup(function(e){
     var container =  $("#sidenavmenu");
     if(!container.is(e.target)&& container.has(e.target).length === 0){
         container.hide();
     }
     $("#sidenavmenu").mouseleave(function(){
         container.hide();
     });
 });

function invokeLogout(){
      window.location.replace("/logout");
  }

//CHANGE URL
 $(document).ready(function(){
     $(".menuitem").click(function(e){
         e.preventDefault(); // prevent browser refresh
         var value = $(this).attr('id');
         window.location.replace(value); // it replaces id to url without refresh
         $(this).addClass('active').siblings().removeClass('active');
         $("#container").load(this.href, function(){
         });
     });
 });

//HANDLE OPPORTUNITIES
 $(document).ready(function(){
    
     $(".taskitem").click(function(){
         var task = $(this).text();
         $(".tasktitle").text(task);
         $(".subtitle-underline").show();
     });
 });

 function openTask(event,taskid){
     var i;
  var x = document.getElementsByClassName("task");
  for( i=0; i<x.length;i++){
      x[i].style.display = "none";
      document.getElementById(taskid).style.display ="block";
      if(taskid==="currentopportunitytask"){
          getCurrentopportunities();
        //  alert("Fetching...");
      }
  }
}

 function adminTask(event,taskid){
     var i;
     var x = document.getElementsByClassName("admintask");
     for( i=0; i<x.length;i++){
         x[i].style.display = "none";
         document.getElementById(taskid).style.display ="block";

     }
 }

//LEAD FORM
$(document).ready(function(){
 $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#newopportunityform').parsley();

    $("#newopportunityform").on("submit", function(event){
        event.preventDefault();

        if($('#newopportunityform').parsley().isValid()){
            $.ajax({
                type:"POST",
                url:"/opportunities",
                data:$(this).serialize(),
                dataType:"json",
                beforeSend:function () {
                    $('#submit').attr('disabled', 'disabled');
                    $('#submit').val('Submitting...');
                },
                success:function(data){

                    if(data.response>0){
                        $("#opportunitymsg").removeClass("alert-danger");
                        $("#opportunitymsg").addClass("alert-success");

                        $("#errormsq").html("Opportunity created successfully!");

                        $("#opportunitymsg").css("display","block");

                        $('#newopportunityform')[0].reset();
                        $('#newopportunityform').parsley().reset();
                        $('#submit').attr('disabled', false);
                        $('#submit').val('Create');
                    }else{
                        $("#errormsq").html("Something went wrong!");
                    }
                },error: function(data){
                   // console.log(data);
                }

            });

        }else{
            $(".opportunitymsg").show();
            $("#errormsq").html("Oops! Fill all the required fields");
        }
    });
});

/**
 * Get Top 5 Leads Preview
 */
$(document).ready(function(){
    $.ajax({
        type:"get",
         url:"leads/preview",
         dataType:"json",
         success:function (data) {
            var i=1;
            $("#opport_general").DataTable({
                searching:false,
                paging:false,
                info:false,
                data: data,
                columns:[
                    {mRender:function(){
                            return i++;
                        }},
                     {mRender:function(data,type,row){
                            var createddate = row.created_at;
                            return moment(createddate).format("Do MMM,YYYY");
                    }},
                    {data:"clientname"},
                    {data:"title"},
                    {mRender:function(data,type,row){
                        var opportunityvalue = parseFloat(row.estimatevalue);
                        return row.currency+" "+numeral(opportunityvalue).format("0,0.0");
                    }},
                    {data:"stage"},
                ]

            });
         }
    });
});

 // GET CURRENT LEADS AJAX FUNCTION

 function getCurrentopportunities(){

   // $("#opportunitiestable").DataTable().destroy();

     $.ajax({
         type:"get",
         url:"leads/create",
         dataType:"json",
         success:function (data) {
                    
            var i =1;
             $("#opportunitiestable").DataTable({
                 data: data,
                 createdRow: function(row,data,index){
                     $(row).attr('id',data.id).find('td').eq(1).attr('class','td-client');
                     $(row).attr('id',data.id).find('td').eq(2).attr('class','td-title');
                     $(row).attr('id',data.id).find('td').eq(3).attr('class','td-descrip');
                     $(row).attr('id',data.id).find('td').eq(4).attr('class','td-createdon');
                     $(row).attr('id',data.id).find('td').eq(5).attr('class','td-createdby');
                     $(row).attr('id',data.id).find('td').eq(6).attr('class','td-estvalue');
                     $(row).attr('id',data.id).find('td').eq(7).attr('class','td-estclosing');
                     $(row).attr('id',data.id).find('td').eq(9).attr('class','td-stage');
                     $(row).attr('id',data.id).find('td').eq(10).attr('class','td-status');
                     if(data.status==="Closed"){
                         $(row).attr('class','text-success');
                     }else{
                         $(row).attr('class','text-danger');
                     }
                     $(row).attr('id',data.id).find('td').eq(11).attr('class','td-status');
                 },
                 columns:[
                     {mRender:function(){
                             return i++;
                         }},
                     {data:"clientname"},
                     {data:"title"},
                     {data:"description"},
                     {mRender:function(data,type,row){
                             var createddate = row.created_at;
                             return moment(createddate).format("ddd Do MMM,YYYY");
                         }},
                     {data:"name"},
                     {mRender:function(data,type,row){
                             var opportunityvalue = parseFloat(row.estimatevalue);
                             return row.currency+" "+numeral(opportunityvalue).format("0,0.0");
                         }},
                     {mRender:function(data,type,row){
                             var estimateclosingddate = row.estimateclosuredate;
                             return moment(estimateclosingddate).format("ddd Do MMM,YYYY");
                         }},
                     {data:"stage"},
                     /*{data:"phone"},*/
                     /*{data:"email"},*/
                     {mRender:function(data,type,row){
                         var status = row.status;
                         if(status==="Closed"){
                             $("#opportunitiestable tbody tr").addClass('status-closed');

                         }else{
                             $("#opportunitiestable tbody tr").addClass('status-active');
                         }
                         return status;
                         }
                     }
                 ],
                 pageLength:15,
                 bLengthChange:false,
                 bAutoWidth:false,
                 autowidth:false,
                 bDestroy: true
             });

         } ,
         error:function () {      }
     });
 }


 /**
  * LEADS TABLE CLICK TO UPDATE STATUS
  */
$(document).ready(function(){
 /*   let status = $("#opportunitiestable").closest('tr').find('td.td-title').text();
    if()*/
});
 $(document).on("click","table#opportunitiestable >tbody >tr",function(e){

     var winW = window.innerWidth;
     var winH = window.innerHeight;
     var dialogoverlay =  document.getElementById("dialogoverlay");
     var opportunity_trail =  document.getElementById("opportunity-trail");
   // style the dialog overlay window
     dialogoverlay.style.display = "block";
     dialogoverlay.style.height = winH+"px";
     dialogoverlay.style.width = winW+"px";
     opportunity_trail.style.display = "block";
     const opportunitytitle = $(this).closest('tr').find('td.td-title').text();
     const opportunityclient = $(this).closest('tr').find('td.td-client').text();
     const opportunitycreatedon = $(this).closest('tr').find('td.td-createdon').text();
     const opportunityvalue = $(this).closest('tr').find('td.td-estvalue').text();
     let opportunitycreatedby =  $(this).closest('tr').find('td.td-createdby').text();
    let opportunity_id = $(this).attr('id');
    let description =  $(this).closest('tr').find('td.td-descrip').text();
     let status =  $(this).closest('tr').find('td.td-status').text();
     $("#opportunity_title").text(opportunitytitle) ;
     $("#opport_client").text(opportunityclient) ;
     $("#opport_createdon").text(opportunitycreatedon) ;
     $("#opport_value").text(opportunityvalue) ;
     $("#opport_createdby").text(opportunitycreatedby) ;
     $("#opportunityid").text(opportunity_id);
     $("#opport_status").text(status);
     $("#descript_area").html(description);
 });


 $(document).on("click","#dialogoverlay",function(e){
     let dialogoverlay =  document.getElementById("dialogoverlay");
     let opportunity_trail =  document.getElementById("opportunity-trail");
     let trailsview =  document.getElementById("trailsview");
     trailsview.style.display = "none";
     dialogoverlay.style.display = "none";
     opportunity_trail.style.display = "none";
    $("#opportunity_trail").replaceWith(opportunitytrailclone);
    $(".statusmsg").hide();
 });


 /**
  * ADD LEAD TRAIL
  */
 $(document).ready(function(){
     $.ajaxSetup({
         headers: {
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         }
     });
     $("#opportunitytrailform").parsley();
     $("#opportunitytrailform").on("submit",function(event){
         event.preventDefault();
         if( $("#opportunitytrailform").parsley().isValid()){
            var data ={
                "opportunity_id": document.getElementById("opportunityid").innerText,
                "event_trail":$("#trailupdate").val(),
                "trail_date":$("#statusdate").val(),
                "stage":$("#stage").val(),
            }
             $.ajax({
                type:"post",
                url:"lead/addtrail",
                dataType:"json",
                data:data,
                success:function(response){
                    $("#trailupdatemsg").show();
                    if(response>0){
                        $("#trailupdatemsg").removeClass("alert-danger");
                        $("#trailupdatemsg").addClass("alert-success");
                        $("#errormsq").css({"color":"#20860C "});
                        $("#errormsq").html("Lead trail added successfully!");
                        $('#opportunitytrailform')[0].reset();
                        $('#opportunitytrailform').parsley().reset();
                        $('#addtrailbtn').attr('disabled', false);
                        $('#addtrailbtn').val('Add Trail');
                    }else{
                        $("#errormsq").addClass(".text-danger");
                        $("#errormsq").html("Something went wrong!");
                    }
                },
                 error: function(data){
                   // console.log(data);
                 }
             });
         }
     });
 });

 function viewTrails(){
     var opportunity_trail =  document.getElementById("opportunity-trail");
     opportunity_trail.style.display = "none";

     var trailsview =  document.getElementById("trailsview");
     trailsview.style.display = "block";
     $("#opportunity_title2").text($("#opportunity_title").text()+" | "+$("#opport_client").text());

     var opportunity_id = $("#opportunityid").text();

     $.ajax({
         type:"get",
         url:"opportunities/show/"+opportunity_id+"",
         dataType:"json",
         data:opportunity_id,
         success:function(data){
             let i=1;
            $("#trailstable").DataTable({
                data:data,
                createdRow: function(row,data,index){
                    $(row).attr('id',data.id).find('td').eq(0).attr('class','td-counter');
                    $(row).attr('id',data.id).find('td').eq(1).attr('class','td-statusevent');
                    $(row).attr('id',data.id).find('td').eq(3).attr('class','td-eventdate');
                    $(row).attr('id',data.id).find('td').eq(4).attr('class','td-updatedby');
                    },
                columns:[
                    {mRender:function () {return i++; }},
                    {data:"event_trail"},
                    {mRender:function(data,type,row){
                            var createddate = row.trail_date;
                            return moment(createddate).format("ddd Do MMM,YYYY");
                        }},
                    {data:"name"}
                ],
                pageLength: 5,
                bLengthChange: false,
                bAutoWidth: false,
                bDestroy: true
            })
         }
     });
 }

 function getMessages(){
     let msgs = $("#unread_msg").text();
     if(msgs<1){
         alert("No new Messages for  now");
     }else{
         alert("Messages underway");
     }
 }
 function getReminders() {
     let msgs = $("#unread_msg").text();
     if(msgs<1){
         alert("No new Messages for  now");
     }else{
         alert("Messages underway");
     }
 }

 function opportunitySummary(){
     $.ajax({
         type:"get",
         url:"opportunities/summary",
         dataType:"json",
         success:function(data){
             console.log(data);
             let tbody = "<tr><td><strong>Total Leads</strong></td> <td>"+numeral(data[0].total_opport).format('0,000')+"</td></tr>" +
                 "<tr><td><strong>New This Week</strong></td> <td>"+numeral(data[0].New_This_Week).format('0,000')+"</td></tr>" +
                 " <tr><td><strong>Ongoing</strong></td> <td>"+data[0].Ongoing+"</td></tr>" +
                 "<tr><td><strong>Closed</strong></td> <td>"+data[0].All_Closed+"</td></tr>" +
                 "<tr><td ><strong>Top Lead</strong></td> <td>"+data[0].max_currency+' '+ numeral(data[0].max_value).format('0,000.00')+"</td></tr>";
             $("#summarytbody").append(tbody);
         },
         error:function(data){
            // console.log(data);
         }
     });
 }




 function closeOpportunity(){

     let opportunity_id = $("#opportunityid").text();
     $.ajax({
         type:"post",
         url:"opportunities/update/"+opportunity_id+"",
         dataType:"text",
         beforeSend:function () {
            $('#closebtn').attr('disabled', 'disabled');
           $('#closebtn').val('Submitting...');
         },
         data:{"opportunity_id":opportunity_id},
         success:function(response){
           //  console.log("response is "+response);
             $("#trailupdatemsg").show();
             if(response ==="1"){
                 $("#trailupdatemsg").removeClass("alert-danger");
                 $("#trailupdatemsg").addClass("alert-success");
                 $("#errormsq").css({"color":"#20860C "});
                 $("#errormsq").html("Opportunity closed successfully!");

                 $('#closebtn').attr('disabled', false);
                 $('#closebtn').val('Mark Closed');
             }else{
                 $("#trailupdatemsg").removeClass("alert-success");
                 $("#trailupdatemsg").addClass("alert-danger");
               //  $("#errormsq").css({"color":"");
                 $("#errormsq").addClass(".text-danger");
                 $("#errormsq").html("Opportunity is already closed!");
             }
         }
     });
 }

 //CREATE USER FORM SUBMISSION

 $(document).ready(function(){
     $.ajaxSetup({
         headers: {
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         }
     });

     $("#createuserform").parsley();
     $("#createuserform").on("submit",function(event){
         event.preventDefault();
         if($("#createuserform").parsley().isValid()){
            $.ajax({
                type:"post",
                url:"createuser",
                dataType:"json",
                data:$(this).serialize(),
                beforeSend:function(){
                    $('#createuserbtn').attr('disabled', 'disabled');
                    $('#createuserbtn').val('Creating User...');
                },
                success:function(data){
                    $("#createusermsg").show();
                   // console.log(data);
                    $('#createuserbtn').attr('disabled', false);
                    $('#createuserbtn').val('Create User');
                    if(data.status>0){
                        $("#createusermsg").removeClass("alert-danger");
                        $("#createusermsg").addClass("alert-success");
                        $("#errormsq").removeClass("text-danger");
                        $("#errormsq").addClass("text-success");
                        $("#errormsq").html(data.msg);
                        $("#createuserform").parsley().reset();
                        $("#createuserform")[0].reset();
                    }else{

                        $("#createusermsg").removeClass("alert-success");
                        $("#createusermsg").addClass("alert-danger");
                        $("#errormsq").removeClass("text-success");
                        $("#errormsq").addClass(".text-danger");
                        $("#errormsq").html(data.msg);
                    }
                },
                error:function(data){
                    $('#createuserbtn').attr('disabled', false);
                    $('#createuserbtn').val('Create User');
                    $("#createusermsg").show();
                    $("#createusermsg").removeClass("alert-success");
                    $("#createusermsg").addClass("alert-danger");
                    $("#errormsq").html("An error occured! Try again");
                }
            });
         }
     })
 });

