async function juntaDadosEntradaESaida() {
  const entradas = await buscaDadosEntradas();
  const saidas = await buscaDadosSaidas();

  const todosDados = [...entradas, ...saidas];

  return todosDados
}