## Apresentação do Projeto: Consulta de Temperatura

### Slide 1: Título
**Consulta de Temperatura**
Uma aplicação web simples para consultar a temperatura de qualquer cidade utilizando a API OpenWeatherMap.

---

### Slide 2: Introdução
**Objetivo do Projeto:**
Desenvolver uma aplicação web que permite ao usuário consultar a temperatura atual de uma cidade específica, utilizando o padrão de projeto Strategy.

---

### Slide 3: Estrutura do Projeto
**Arquivos Principais:**
- `index.html`: Estrutura HTML da aplicação.
- `styles.css`: Estilos CSS para a aplicação.
- `main.js`: Lógica da aplicação em JavaScript.

---

### Slide 4: Funcionalidades
**Funcionalidades Principais:**
- Entrada de texto para o nome da cidade.
- Botão para buscar a temperatura.
- Exibição da temperatura atual da cidade inserida.
- Tratamento de erros (ex. cidade não encontrada).

---

### Slide 5: Padrão de Projeto Strategy
**Padrão de Projeto Utilizado:**
- **Strategy:** Permite a definição de uma família de algoritmos, encapsulando cada um deles e tornando-os intercambiáveis.
- **Aplicação:** Diferentes estratégias para obter a temperatura podem ser implementadas e usadas de forma intercambiável.

---

### Slide 6: Estrutura do HTML (`index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de Temperatura</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Consulta de Temperatura</h1>
        <div class="input-group">
            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" placeholder="Digite o nome da cidade">
            <button id="buscar">Buscar</button>
        </div>
        <div class="output-group">
            <p id="resultado"></p>
        </div>
    </div>
    <script src="main.js"></script>
</body>
</html>
```

---

### Slide 7: Estilos CSS (`styles.css`)
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
    background-image: url('https://vivoverde.com.br/wp-content/uploads/2020/01/weather_capa-720x434.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.container {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 80%;
    max-width: 350px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

/* Outros estilos... */
```

---

### Slide 8: Lógica JavaScript (`main.js`)
```javascript
// Interface da estratégia
class EstrategiaTemperatura {
    obterTemperatura(cidade, apiKey) {
        throw new Error("Este método deve ser implementado pelas subclasses.");
    }
}

// Implementação concreta da estratégia usando OpenWeatherMap
class EstrategiaOpenWeatherMap extends EstrategiaTemperatura {
    obterTemperatura(cidade, apiKey) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    return data.main.temp;
                } else {
                    throw new Error(data.message);
                }
            });
    }
}

// Contexto que utiliza a estratégia de obtenção de temperatura
class ServicoDeTemperatura {
    constructor(estrategia) {
        this.estrategia = estrategia;
    }

    definirEstrategia(estrategia) {
        this.estrategia = estrategia;
    }

    obterTemperatura(cidade, apiKey) {
        return this.estrategia.obterTemperatura(cidade, apiKey);
    }
}

document.getElementById('buscar').addEventListener('click', function() {
    const cidade = document.getElementById('cidade').value;
    const apiKey = 'CHAVE_API';
    const estrategia = new EstrategiaOpenWeatherMap();
    const servico = new ServicoDeTemperatura(estrategia);

    if (cidade) {
        servico.obterTemperatura(cidade, apiKey)
            .then(temperatura => {
                document.getElementById('resultado').innerText = `A temperatura atual em ${cidade} é ${temperatura.toFixed(1)}°C`;
            })
            .catch(error => {
                document.getElementById('resultado').innerText = `Erro ao obter dados da cidade ${cidade}: ${error.message}`;
            });
    } else {
        document.getElementById('resultado').innerText = 'Por favor, insira o nome da cidade.';
    }
});
```

---

### Slide 9: Demonstração
**Demonstração ao vivo da aplicação:**
1. Abra a aplicação em um navegador.
2. Insira o nome de uma cidade.
3. Clique no botão "Buscar".
4. Veja a temperatura atual da cidade exibida.

---

### Slide 10: Conclusão
**Benefícios do Projeto:**
- Simplicidade e clareza do código.
- Flexibilidade e extensibilidade devido ao uso do padrão Strategy.
- Aplicação prática de conceitos de desenvolvimento web.

**Próximos Passos:**
- Adicionar suporte para múltiplas APIs.
- Implementar testes unitários.
- Melhorar a interface do usuário.