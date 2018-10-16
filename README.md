# phone-book

## Getting started
- Após executar `docker-compose up`, acesse o webapp em `http://localhost:8080`;
- Autentique utilizando os códigos 123 ou 456;
- Para verificar o funcionamento do banco de dados, basta acessar a url `localhost:8081`, banco de dados phone-book;

## Highlights
- O webapp pode ser utilizado em mobile ou deskop;
- Os assets (js/css...) de cada rota do frontend sao carregados sob demanda (paginas lazy load), fazendo com que o Time To Interactive seja muito mais baixo do que carregando o webapp todo na primeira página;
- Pode ser utilizado offline (serviceworkers);
- IndexedDB par armazenamento, evitando possíveis bloqueios na UI em operações de storage;

## Poderia ter sido melhor:
- Como o frontend está sendo servido via `http-server`, não é possível acessar as urls diretamente por limitações do angular router com http-server;
- Operacoes assincronas como alguns submits ou o proprio login não apresentam estado de loading nem feedback visual de erro ou sucesso;
- Não há proteção contra perda de dados quando uma página contendo formulários é atualizada ou quando uma navegação para outra página ocorre;
- Não há redirect para acessos com token expirado. O controle de autenticacao verifica apenas se existe um token no storage, caso nao existir faz o redirect para o login.
