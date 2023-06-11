# Prova-Hope

### Back-end: Como subir o servidor localmente

Para executar o servidor back-end em php, siga as instruções:

1 - Aba um terminal Primeiro monte a imagem definida no docker-compose.yml com o comando:

`docker-compose build`

2- Para criar e iniciar o container a partir da imagem criada, execute:

`docker-compose up`

3- Já temos o container rodando, no entanto falta fazer a instalação da lib firebase/jwt de php. Abra um novo terminal e execute:

`docker-compose exec web bash`

4- Dentro do terminal no container, execute o comando abaixo e feche este terminal.

`./install-jwt.sh`

Com isso, o servidor php já está pronto para ser utilizado: o banco de dados MySql estará disponível para queries e a API para web pode ser acessada através da url `https://localhost:9090/`.

5 - O banco de dados é iniciado vazio após montar o container do docker, ou seja, não possui as tabelas de produto e de usuários da plataforma web. Para iniciar o modelo do banco de dados, foi feito um script em php para iniciar o banco de dados. Para executá-lo, basta acessar no navegador `https://localhost:9090/initDatabase`.

Importante: Sempre que esta url for executada, o banco de dados será reiniciado, portanto dados já salvos de usuários cadastrados da plataforma web serão perdidos.
