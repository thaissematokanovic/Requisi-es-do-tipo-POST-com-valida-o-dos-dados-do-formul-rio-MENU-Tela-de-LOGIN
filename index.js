import express from "express";

const app = express();
const host = "0.0.0.0";
const porta = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
let fornecedores = [];

function pagina(titulo, conteudo) {
  return `

<!DOCTYPE html>
<html lang="pt-br">

<head>
<meta charset="UTF-8">
<title> ${titulo} </title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>
body{
font-family: arial;
background: linear-gradient(to right, #da08ac, #1bc9c9);
margin:0;
}

nav{
background: #c208b2;
padding:15px;
}

nav a {
color:white;
margin-right:15px;
font-weight:bold;
}

.container{
width:600px;
margin:40px auto;
background:white;
padding:30px;
border-radius:10px;
box-shadow:0px 4px 10px rgba(5, 87, 54, 0.2);
}

h2{
text-align:center;
}

h1{
text-align: center;
}

input{
width:100%;
padding:8px;
margin:5px 0 15px 0;
border-radius:5px;
border:1px solid #ccc;
}

button{
width:100%;
padding:10px;
background: linear-gradient(to right, #da08ac, #1bc9c9);
color:white;
border:none;
border-radius:8px;
}

button:hover{
background: #05594f ;
}

ul{
background:#f4f4f4;
padding:15px;
border-radius:8px;
}
</style>
</head>

<body>

<nav style="text-align: center;">
<a href="/"> Inicio </a>
<a href="/fornecedor"> Cadastro Fornecedor </a>
<a href="/login"> Login </a>
<a href="/logout"> Logout </a>
</nav>

<div class="container">

${conteudo}

</div>
</body>
</html>`;
}

app.get("/", (req, res) => {
  res.send(
    pagina(
      "Inicio",
      `
<h1> Cadastro de Fornecedores </h1>
`,
    ),
  );
});

app.get("/login", (req, res) => {
  res.send(
    pagina(
      "Login",
      `
<h2> Login </h2>
<form method="POST" action="/login">

<label> Usuário </label>
<input type="text" name="usuario">

<label> Senha </label>
<input type="password" name="senha">

<button type="submit"> Logar </button>

</form>
`,
    ),
  );
});

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "ana" && senha === "123456") {
    res.send(pagina("Login Sucesso", `<h2> Login realizado com sucesso </h2>`));
  } else {
    res.send(pagina("Erro", `<h2> Usuário ou senha inválidos </h2>`));
  }
});

app.get("/logout", (req, res) => {
  res.send(pagina("Logout", `<h2> Logout efetuado com sucesso!! </h2>`));
});

app.get("/fornecedor", (req, res) => {
  let lista =
    fornecedores.length > 0
      ? fornecedores.map((f) => `<li>${f.razao} - ${f.cnpj}</li>`).join("")
      : "<li> Não há fornecedores cadastrados! </li>";

  res.send(
    pagina(
      "Cadastro de Fornecedor",
      `
<h3>Cadastro de Fornecedor</h3>

<form method="POST" action="/fornecedor">

<label>CNPJ</label>
<input type="number" name="cnpj" placeholder="00.000.000/0000-00">

<label>Razão Social</label>
<input type="text" name="razao" placeholder="Ana Souza ME 123456789 ">

<label>Nome Fantasia</label>
<input type="text" name="fantasia" placeholder="Loja do Dez">

<label>Endereço</label>
<input type="text" name="endereco" placeholder="Rua paraná, 10. Centro.">

<label>Cidade</label>
<input type="text" name="cidade" placeholder="Presidente Prudente ">

<label>UF</label>
<input type="text" name="uf"placeholder="São Paulo">

<label>CEP</label>
<input type="number" name="cep" placeholder="19000000">

<label>Email</label>
<input type="email" name="email"placeholder="anasouza@gmail.com.br">

<label>Telefone</label>
<input type="number" name="telefone"placeholder="18999999999">

<button type="submit">Cadastrar</button>

</form>

<h3>Fornecedores Cadastrados</h3>

<ul>
${lista}
</ul>

`,
    ),
  );
});

app.post("/fornecedor", (req, res) => {
  const { cnpj, razao, fantasia, endereco, cidade, uf, cep, email, telefone } =
    req.body;

  let erros = [];

  if (
    !cnpj ||
    !razao ||
    !fantasia ||
    !endereco ||
    !cidade ||
    !uf ||
    !cep ||
    !email ||
    !telefone
  )
    erros.push("Dados não preenchidos corretamente!");

  if (erros.length > 0) {
    res.send(
      pagina(
        "Erro!",
        `
<h2>Erro! Cadastre novamente. </h2>

<ul>
${erros.map((e) => `<li>${e}</li>`).join("")}
</ul>

<a href="/fornecedor"> Voltar </a>
`,
      ),
    );
  } else {
    fornecedores.push({
      cnpj,
      razao,
      fantasia,
      endereco,
      cidade,
      uf,
      cep,
      email,
      telefone,
    });

    res.redirect("/fornecedor");
  }
});

app.listen(porta, host, () => {
  console.log("Servidor rodando em http://localhost:3000");
});