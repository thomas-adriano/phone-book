# phone-book

## Observacoes:

- Após executar `docker-compose up`, acesse o webapp em `http://localhost:8080`;
- E possivel acessar o webapp com dois usuarios, codigos 123 e 456;
- Como o frontend está sendo servido via `http-server`, não é possível acessar as urls diretamente por limitacoes do angular router com http-server;
- Alguns dos DODs especificavam o uso de dialogs para alguns cadastros, porem foram utilizadas paginas com lazy load;
- Os assets (js/css...) de cada rota do frontend sao carregados sob demanda (paginas lazy load);
- O webapp pode ser utilizado em mobile ou deskop;
- Para verificar o funcionamento do banco de dados, basta acessar a url localhost:8081, banco de dados phone-book;
- Operacoes assincronas como alguns submits ou o proprio login nao apresentam estado de loading nem feedback visual de erro ou sucesso;
