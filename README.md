# nlw-pocket
Repositório do projeto NLW Pocket da Rocketseat

### Anotações importantes:
- Drizzle é um ORM para node
- Necessário criar o drizzle.config.ts ( há templates no próprio site do drizzle )
- Comandos importantes no Drizzle
    - **npx drizzle-kit generate**: Irá criar as migrations a partir do arquivo de schema configurado.
    - **npx drizzle-kit migrate**: Cria as migrations e as salva no local configurado
    - **npx drizzle-kit studio**: Abre uma interface no navegador para interagir com o banco de dados
- npm i @paralleldrive/cuid2 instala uma biblioteca para geração de IDs únicos usando o algoritmo cuid2.
- dayjs, uma boa opção de lib para mexer com datas no javascript.
- O fastify-type-provider-zod é uma ótima opção para validação de schema nas rotas.
- COALESCE, dentro do SQL permite criar um IF que caso a variável seja null, ele retorna uma valor default