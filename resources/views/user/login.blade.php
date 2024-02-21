<!DOCTYPE html>
<html>
<head>
	<title>Login - PrimeCRM</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/ico" href="{{url('images',['primecrm.ico'])}}" />
	<!--Bootsrap 4 CDN-->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="{{url('css',['login.css'])}}">
    
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
	<script src="https://parsleyjs.org/dist/parsley.js"></script>
  <script type="text/javascript" src="{{url('js',['login.js'])}}"></script>
</head>
<body>
  <div class="container-fluid">
  <div class="row no-gutter">
    <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div><!-- left div with image -->
    
       <div class="col-md-8 col-lg-6 d-flex justify-content-center"> <!-- right div with login form -->
       
        <div class="login d-flex flex-row align-items-center">

          <div class=" logindiv card p-5"><!--login form -->
            <h1 style="font-family:Ubuntu-Light; font-weight:bolder;text-align:center;">Prime CRM</h1>
            <h3 class="login-heading mb-4">Welcome back!</h3>
            <div id="loginmsg" class="alert alert-danger alert-block statusmsg"  >
              <button type="button" class="close" data-dismiss="alert">x</button>
              <strong> <span id="errormsq"></span></strong>
            </div>
            <form action="" method="POST" id="loginForm">
              {{ csrf_field() }} <!-- for handling multiple exceptions -->

              <div class="form-label-group">
              <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required data-parsley-type="email" data-parsley-trigger="keyup" data-parsley-required-message="Email is required!"/>
              <label for="inputEmail">Email address</label>
              </div>

              <div class="form-label-group">
                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required data-parsley-length="[4,16]" data-parsley-trigger="keyup" data-parsley-required-message="Password is required!"/>
                <label for="inputPassword">Password</label>
               </div>

             <input class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" id="submit" value="Sign In"/>
              <!--<a class="small" href="{{url('registration')}}">Sign Up</a>-->
           </form>
          </div>
        </div>
        
        <footer style="position:absolute; bottom:0px;">
          <div class="text-center">
            <span id='dev-link'>Built By: <a class='foot-link' href='https://joashowaga.netlify.app' target="_blank">Joash Owaga </a>
                     &#169;<script>document.write(new Date().getFullYear())</script></span> 
         </div>

        </footer>
        

       </div>
      </div>
    </div>
</body>
<footer>
    
</footer>
</html>

