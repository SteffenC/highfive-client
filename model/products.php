<?php

class Products{

  public function getAll(){
    $json = file_get_contents("http://139.59.128.218:12354/products/");
    return $json;
  }

  public function getById($id){
    $json = file_get_contents("http://139.59.128.218:12354/products/" . $id);
    return $json;
  }
}
