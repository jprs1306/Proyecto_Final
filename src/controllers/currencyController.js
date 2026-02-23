// src/controllers/currencyController.js

exports.getExchangeRates = async (req, res) => {
    try {
        // Consumimos una API pública y gratuita de tipos de cambio
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();

        if (data.result === 'success') {
            res.status(200).json({
                base: 'USD',
                rates: {
                    MXN: data.rates.MXN, // Pesos Mexicanos
                    EUR: data.rates.EUR  // Euros
                },
                message: 'Datos obtenidos de API externa con éxito'
            });
        } else {
            throw new Error('La API externa falló');
        }
    } catch (error) {
        console.error('Error al obtener tipo de cambio:', error);
        res.status(500).json({ message: 'Error al conectar con la API externa' });
    }
};