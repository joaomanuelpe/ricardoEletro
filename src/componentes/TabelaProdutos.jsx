import { Button, Table, Alert } from "react-bootstrap";

export default function TabelaProdutos(props) {
    const atualizarLocalStorage = (carrinho) => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    };

    const alterarQuantidade = (id, novaQuantidade) => {
          const novoCarrinho = props.carrinho.map(produto => 
            produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
        );

        props.setCarrinho(novoCarrinho);
        atualizarLocalStorage(novoCarrinho);
    };

    const removerProduto = (produto) => {
        const novoCarrinho = props.carrinho.filter((aux) => {return aux.id !== produto.id});
        props.setCarrinho(novoCarrinho);
        atualizarLocalStorage(novoCarrinho);
    };

    return (
        <>
            <Alert variant="primary" className="text-center">
                <h1>Carrinho com Produtos Selecionados</h1>
            </Alert>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Imagem</th>
                        <th>Avaliação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.carrinho.length ? (
                        props.carrinho.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.title}</td>
                                <td>{produto.price}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={() => alterarQuantidade(produto.id, produto.quantidade - 1)} 
                                            disabled={produto.quantidade <= 1}
                                        >
                                            -
                                        </Button>
                                        <input 
                                            type="number" 
                                            value={produto.quantidade} 
                                            max={10}
                                            style={{ width: '50px', textAlign: 'center', margin: '0 5px' }} 
                                            disabled
                                        />
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={() => alterarQuantidade(produto.id, produto.quantidade + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </td>
                                <td>{produto.description}</td>
                                <td>{produto.category}</td>
                                <td><img src={produto.image} alt={produto.title} width="50" /></td>
                                <td>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Nota</th>
                                                <th>Contagem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{produto.rating.rate}</td>
                                                <td>{produto.rating.count}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => removerProduto(produto)}>Remover</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>Carrinho vazio</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" onClick={() => props.setExibirMenu(true)}>
                    Voltar
                </Button>
            </div>
        </>
    );
}
