$(document).ready(function(){
    $(".close").on("click",function(){
        $(".statusmsg").hide();
    });

    $('#loginForm').parsley();

    $('#loginForm').on('submit', function(event){
        event.preventDefault();

        if($('#loginForm').parsley().isValid())
        {
            $.ajax({
                url: 'post-login',
                method:"post",
                data:$(this).serialize(),
                dataType:"json",
                beforeSend:function()
                {
                    $('#submit').attr('disabled', 'disabled');
                    $('#submit').val('Submitting...');
                },
                success:function(data)
                {
                    $(".statusmsg").css("display","block");
                    if(data.response>0){
                        $(".statusmsg").removeClass("alert-danger");
                        $(".statusmsg").addClass("alert-success");
                        $("#errormsq").html("Login Successful");
                        $('#loginForm')[0].reset();
                        $('#loginForm').parsley().reset();
                        $('#submit').val('Signing in...');
                        window.location.replace("/dashboard");
                    }else{
                        $("#errormsq").html("Oops! Email or password invalid!");
                        $('#submit').attr('disabled', false);
                        $('#submit').val('Submit');
                    }

                   // alert(data.success);
                },
                error:function(data){
                    console.log(data);
                }
            });
        }
    });

});
