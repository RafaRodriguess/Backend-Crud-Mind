# Backend Case Mind Consulting

## Descrição do Projeto

O projeto tem como objetivo um Crud de cursos, podendo ser acessado apenas pelos professores cadastrados com email e senha juntamente com o token.

## Importante

- Instalar as dependências do projeto
- NodeJs
- npm install
- Dentro de src/models/db.js -> alterar os dados do banco mysql ( "nomeBanco", "root", "senha")

### Rotas

- http://localhost:5000/login (Email e Senha)[POST]
- http://localhost:5000/user (Criar usuário)[POST]
- http://localhost:5000/user (Listar todos os usuários)[GET]
- http://localhost:5000/user/id (Deletar curso a partir do ID)[DELETE]

- http://localhost:5000/course (Criar curso)[post]
- http://localhost:5000/course (Listar cursos)[GET]
- http://localhost:5000/course/id (Editar curso através do ID)[PUT]
- http://localhost:5000/course/id (Deletar curso através do ID)[DELETE]

### Para iniciar o projeto

```
$ npm run start
```

### Efetuar o login

Email: admin@admin  
Senha: 123

# Autores

Rafael Rodrigues

# Licença

-Nenhuma
