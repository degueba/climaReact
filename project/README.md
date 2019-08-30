Em components temos todos os componentes do Projeto

    * Prediction
       - index.js
       - styles.scss

Em pages temos todas as páginas do Projeto

    * Main
       - index.js
       - styles.scss


Em services/api.js criei todos os serviços usados
lá iremos encontrar o forecast (Alguns dias) e o weather (Hoje)

Com a api de forecast eu já tenho o atual e mais 2 dias a frente, pois o parâmetro &cnt={dias} define a
quantidade de dias que eu quero.

Acabei não lendo tão bem a documentação no início e então usei a weather para o atual e o forecast para amanhã e depois de amanhã,
mas depois percebi que tenho todas as informações em uma única api só (forecast).

    * services
        - api.js {bing, weather, opencage, forecast}


Temos um arquivo de utils.js para nos auxiliar em algo que precisaria fazer em várias partes do meu projeto
como por exemplo verificar se estou no localhost ou não e dependendo nos retornar a url do Heroku para evitar problema de CORS.


Sobre ícones eu não sei se entendi perfeitamente, mas acontece que a api sempre me retorna 2 letras e um número (04N), sendo que 
cada caractere é um ícone, ou seja, estou printando 3 ícones ao invés de 1.

Sobre estilos eu usei sass pela maior familiaridade, espero que não me faça perder pontos. :)

