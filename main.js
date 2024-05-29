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
    const apiKey = 'f50240869ab9e8c2545f6c41145d54d2'; // Substitua por sua chave de API
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