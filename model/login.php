<?php

class login{

  public function validate($username, $password){
    if($username === "steffen" && $password === "1234"){
      return true;
    }
  }

}
