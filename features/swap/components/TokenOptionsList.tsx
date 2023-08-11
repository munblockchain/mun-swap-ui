import { TokenSelectList, TokenSelectListProps } from 'components'
import { useTokenList } from 'hooks/useTokenList'

export const TokenOptionsList = ({
  activeTokenSymbol,
  onSelect,
  ...props
}: Omit<TokenSelectListProps, 'tokenList' | 'fetchingBalanceMode'>) => {
  const [tokenList] = useTokenList()
  // const nonIBCTokens = tokenList.tokens.filter(token => token.symbol == 'MUN' || token.symbol == 'DGM')
  return (
    <TokenSelectList
      {...props}
      tokenList={tokenList.tokens}
      activeTokenSymbol={activeTokenSymbol}
      onSelect={onSelect}
      fetchingBalanceMode="native"
    />
  )
}
