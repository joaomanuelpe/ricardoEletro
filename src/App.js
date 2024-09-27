import GradeProdutos from "./componentes/GradeProdutos";
import BarraBusca from "./templates/BarraBusca";
import Cabecalho from "./templates/Cabecalho";
import TabelaProdutos from "./componentes/TabelaProdutos";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resposta) => resposta.json())
      .then((produtos) => {
        setProdutos(produtos);
      });
  }, []);

  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []; // Recupera o carrinho do localStorage ou inicia vazio
  });
  const [exibirMenu, setExibirMenu] = useState(true);

  return (
    <div className="App">
      {exibirMenu ?
        <>
          <Cabecalho />
          <BarraBusca carrinho={carrinho} setCarrinho={setCarrinho} setExibirMenu={setExibirMenu} />
          <GradeProdutos listaProdutos={produtos} carrinho={carrinho} setCarrinho={setCarrinho} />
        </>
        : <TabelaProdutos setCarrinho={setCarrinho} setExibirMenu={setExibirMenu} carrinho={carrinho}/>}
    </div>
  );
}

export default App;
