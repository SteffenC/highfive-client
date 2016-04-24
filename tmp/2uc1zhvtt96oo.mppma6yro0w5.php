<html>
<head>
  <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
  <link rel="stylesheet" type="text/css" href="ui/css/main.css">
  <link rel="stylesheet" type="text/css" href="ui/css/theme.css">
  <link rel="stylesheet" type="text/css" href="ui/css/gcards.css">
  <link rel="stylesheet" type="text/css" href="ui/css/normalize.css">
  <style>

  </style>
</head>
<body>
  <img height=""; width="100%" src="ui/css/logo.png" />
  <h1 id="products" hidden> <?php echo $products; ?> </h1>

<main id="main">
</main>
</body>

<script>

drawTable(document.getElementById('products').innerHTML);
function drawTable(data) {
  data = JSON.parse(JSON.parse(data));

  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
    drawRow(data[i]);
  }
}

function drawRow(rowData) {
    var main = document.getElementById('main');
    var card = document.createElement("section");
    card.className = "card";
    var a    = document.createElement("A");
    var h1   = document.createElement("H1");
    h1.innerHTML = rowData.title;
    a.appendChild(h1);
    a.href = "/product/" + rowData._id;

    var h2   = document.createElement("H2");
    h2.innerHTML = rowData.description;
    var pri  = document.createElement("STRONG");
    pri.innerHTML = "Price: " + rowData.price;

    main.appendChild(card);
    card.appendChild(a);
    card.appendChild(pri);
    card.appendChild(h2);

    var img  = document.createElement("IMG");
    img.src  = rowData.picture;
    card.appendChild(img);
}

</script>
</html>
