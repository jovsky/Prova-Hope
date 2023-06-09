# Prova-Hope

Aplicação desenvolvida como etapa do processo seletivo para a vaga de desenvolvedor no Grupo Hope Lingerie. A aplicação possui um back-end e um front-end com a seguinte estrutura e tecnologias:

________________________
### Back-End

- Utilização de containers no Docker.
- Banco de dados MySQL. O banco de dados possui uma tabela de dados de produtos e uma tabela de usuários cadastrados.
- Servidor web Apache-Php. Implementação de API em PHP que faz comunicação com o banco e com o Front-end. 
- A API implementa uma solução JWT para gerencimento de sessão de usuários na aplicação, sem o uso de bibliotecas externas.
- Rotas da API:
  - /authenticate --> Faz autenticação de usuários cadastrados e retorna um token JWT para uma sessão de 10 minutos
  - /registerUser --> Cadastra usuários e faz hash da senha
  - /products --> Retorna lista de produtos do banco de dados, é necessário fornecer o token da sessão
- Para armazenar com segurança as senhas dos usuários utiliza-se uma teconologia de hash (bcrytp)

#### Como subir o servidor localmente

Para executar o servidor back-end em php, siga as instruções:

1 - Em um terminal, vá até a pasta `api` do repositório e monte as imagens dos containers (definida no `docker-compose.yml`) com o comando:

`docker-compose build`

2- Para criar e iniciar os containers a partir da imagem criada, execute:

`docker-compose up`

Com isso, o servidor php já está pronto para ser utilizado: o banco de dados MySql estará disponível para queries e a API para web pode ser acessada através da url `http://localhost:8000/`.

3 - **[Importante]** O banco de dados é iniciado vazio após montar o container do docker, ou seja, não possui as tabelas de produto e de usuários da plataforma web. Para iniciar o modelo do banco de dados, foi feito um script em php responsável por essa inicialização. Para executá-lo, basta acessar no navegador `http://localhost:8000/initDatabase/`.

Importante: Sempre que esta url for executada, o banco de dados será reiniciado, portanto dados já salvos de usuários cadastrados da plataforma web serão perdidos.

________________________
### Front-End

- Utilização de ReactJS + Typescript para criação de uma interface, segura e autenticada.
- Estilização com Tailwind css
- Tela de login com opção de cadastrar usuário
- Utiliza-se ContextAPI para armazenar dados da sessão e lidar com login/logoff do usuário
- Tela de dashboard, que lista os produtos da API e possui opções de pesquisa e ordenação.
- Clique em um produto da lista para visualizar mais detalhes.
- Não realiza ações de armazenamento em carrinho e de comprar

#### Como executar localmente a aplicação front-end

1. Em um novo terminal vá até a pasta `web` do repositório e rode `npm install` para instalar as dependências:

2. Em seguida, para iniciar a aplicação: `npm run dev`

3. Para acessar use a url: `http://127.0.0.1:5173/`


![image](https://github.com/jovsky/Prova-Hope/assets/22126034/c89208ec-e493-4e6b-9aa3-0b064d85f946)

![image](https://github.com/jovsky/Prova-Hope/assets/22126034/a329410b-9936-40aa-bd29-ad759db56723)



________________________
### Prova Teórica


1. De acordo com a prova prática, qual é a finalidade do arquivo Dockerfile?

a. **Configurar o ambiente do PHP-Apache.** 

2. De acordo com a prova prática, qual é a finalidade do arquivo docker-compose.yml?

**c. Configurar o ambiente do Docker.** --> Primeiro monta o banco de dados utilizando a imagem citada (mysql:5.7) e depois utiliza o Dockerfile para montar o servidor Apache-PHP.

3. Como o Docker Compose sabe que precisa criar dois contêineres diferentes para o PHP-Apache e o MySQL?

a. **Por meio dos nomes dos serviços definidos no arquivo docker-compose.yml**  --> No arquivo docker-compose.yml, em `services`: `db` e `web`

4. Qual é a finalidade da seção depends_on no arquivo docker-compose.yml?

c. **Informar ao Docker Compose qual contêiner depende de outro contêiner**

5. Qual é a finalidade do comando docker-compose up?

d. **Criar e iniciar vários contêineres Docker em um único comando, com base nas instruções do arquivo "docker-compose.yml".**

6. Qual é a diferença entre useState() e useReducer()?

b. **useReducer() é utilizado apenas para gerenciamento de estados complexos e useState() para
estados simples.**

7. O que são refs em React e quando são usadas?

d. **Refs são utilizadas para acessar elementos do DOM e controlar o seu comportamento a partir de**

8. O que é estado ?

d. **Estado em React é a capacidade de armazenar dados dentro de um componente e gerenciá-los**

9. O que é Redux? Como se compara com a Context API?

c. **O Redux é uma solução de gerenciamento de estado mais escalável do que a Context API, sendo
capaz de gerenciar estados em aplicações de qualquer tamanho.**   

10. Qual a diferença entre o método componentDidMount() e o hook useEffect() no React?

b. **O componentDidMount() é utilizado apenas em componentes de classe, enquanto o useEffect() é
utilizado apenas em componentes funcionais.**

