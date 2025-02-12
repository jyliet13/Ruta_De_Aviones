function dijkstra(grafo, inicio, fin) {
    const costos = {};
    const padres = {};
    const procesados = [];

    for (let nodo in grafo) {
        costos[nodo] = nodo === inicio ? 0 : Infinity;
        padres[nodo] = null;
    }

    let nodo = encontrarNodoMasBarato(costos, procesados);

    while (nodo !== null) {
        let costo = costos[nodo];
        let vecinos = grafo[nodo];

        for (let vecino in vecinos) {
            let nuevoCosto = costo + (vecinos[vecino] || Infinity); // Evita NaN en costos
            if (nuevoCosto < costos[vecino]) {
                costos[vecino] = nuevoCosto;
                padres[vecino] = nodo;
            }
        }
        procesados.push(nodo);
        nodo = encontrarNodoMasBarato(costos, procesados);
    }

    return reconstruirRuta(padres, fin);
}

function encontrarNodoMasBarato(costos, procesados) {
    let menorCosto = Infinity;
    let nodoMasBarato = null;

    for (let nodo in costos) {
        let costo = costos[nodo];
        if (costo < menorCosto && !procesados.includes(nodo)) {
            menorCosto = costo;
            nodoMasBarato = nodo;
        }
    }
    return nodoMasBarato;
}

function reconstruirRuta(padres, destino) {
    let ruta = [];
    let nodo = destino;

    while (nodo) {
        ruta.unshift(nodo);
        nodo = padres[nodo];
    }

    return ruta.length > 1 ? ruta : [];
}


module.exports = { dijkstra };
