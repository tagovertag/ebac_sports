import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import * as S from './styles'
import { RootState } from '../store'
import { adicionarAoCarrinho } from '../store/reducers/carrinho'
import { favoritar } from '../store/reducers/favoritos'
import { useGetProdutosQuery } from '../services/api'

const ProdutosComponent = () => {
  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)
  const { data: produtos = [], isLoading, error } = useGetProdutosQuery()

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((f) => f.id === produto.id)
  }

  if (isLoading) return <h2>Carregando...</h2>
  if (error) return <h2>Erro ao carregar produtos: {JSON.stringify(error)}</h2>

  return (
    <>
      <S.Produtos>
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            favoritar={() => dispatch(favoritar(produto))}
            aoComprar={() => dispatch(adicionarAoCarrinho(produto))}
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
