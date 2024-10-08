# nlw-pocket
Repositório do projeto NLW Pocket da Rocketseat

### Anotações importantes - Backend:
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
- DATE, dentro do SQL, pega apenas a data, excluindo outras informações, como hora e minutos.
- JSON_AGG, em alguns bancos, como o PostgreSQL, essa função no SQL pega um retorno e converte para um array, usado com o JSON_BUILD_OBJECT, permite retornar array de objetos construidos durante a consulta.
- JSON_OBJECT_AGG, cria um objeto


### Anotações importantes - Frontend:
- Os espaçamentos do Tailwind.css são em múltiplos de 4.
- Utilizar [] em uma varíavel quando não há valor mapeado disponível, ex: max-w-[400px]
- Criar componentes para svgs pequenos é uma boa opção para o carregamento dos mesmos no html
- Quando em um formulário, houver um componente que não é um input nativo, na react-hook-forms,usar o componente Controller resolve esse problema para a hora de submeter os valores.
- As ferramentas do Zod ajudam a deixar o código organizado e permite centralizar nele informações que vão sendo reaproveitadas.


### Extra
- Crie a parte de desfazer uma meta, já que alguma meta pode ser completada mais de uma vez no dia, é interessante ter a opção de excluir uma que você tenha registrado errado.
