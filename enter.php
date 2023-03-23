<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
</head>

<body>
  
  <h1>ThreeD-Pixel</h1>
<main>
  <h2>Minecraft in your Browser</h2>
  <button class="play" type="submit">play</button>
  <br />
  <br />
  <button class="GitHub " type="submit">Git Hub</button>
  <br />
  <br />
  <a href="https://loines.ch">WebSite</a>
</main>
<style type="text/css" media="all">
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: url(https://www.online-tech-tips.com/wp-content/uploads/2019/11/minecraft-game.jpg);
    background-position: top;
    background-size: 400%;
    text-align: center;
  }
  h1 {
    font-size: 300%;
  }
  main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: gray;
  }
  button {
    color: black;
    border: 1px solid black;
    background: transparent;
    box-shadow: 1px 1px black;
    padding: 10%;
    width: 70%;
  }
</style>
<script type="text/javascript" charset="utf-8">
  document.querySelector(".play").addEventListener("click",()=>{
    window.location = "create.php"
  })
</script>
</body>
</html>
