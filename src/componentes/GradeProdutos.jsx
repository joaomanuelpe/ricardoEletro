import Produto from "../templates/Produto";

export default function GradeProdutos(props){
    if (props.listaProdutos){
        return(
            <div style={{
                width: '100%', 
                display: 'flex', 
                flexWrap: 'wrap',
                alignItems: 'center', 
                margin: '10px',
                padding: '10px',
                gap: '20px'}}>
                    {props.listaProdutos.map((produto) => (
                        <Produto key={produto.id} carrinho={props.carrinho} setCarrinho = {props.setCarrinho} produto={produto}/>
                    ))}
            </div>
        )
    }
    else{
        return (<h1>Carregando...</h1>)
    }
}