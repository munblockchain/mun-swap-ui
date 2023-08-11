import { TokenInfo } from 'queries/usePoolsListQuery'

import { fetchDollarPriceByTokenIds, fetchDollarPriceFromMunSwapPool } from './fetchDollarPriceByTokenIds'
import { pricingServiceIsDownAlert } from './pricingServiceIsDownAlert'

export async function tokenDollarValueQuery(tokenIds: Array<TokenInfo['id']>) {
  if (!tokenIds?.length) {
    throw new Error('Provide token ids in order to query their price')
  }

  try {
    let prices = await fetchDollarPriceByTokenIds(tokenIds)

    // todo: usd prices for mun tokens are hardcoded for test purpose since they are not registered on coingecko
    if (tokenIds.findIndex((tokenId) => tokenId === 'mun-network') != -1) {
      let mun_price = await fetchDollarPriceFromMunSwapPool('mun-network');
      prices = { ...prices, ...mun_price }
    }

    if (tokenIds.findIndex((tokenId) => tokenId === 'mun-dgm') != -1) {
      let dgm_price = await fetchDollarPriceFromMunSwapPool('mun-dgm');
      prices = { ...prices, ...dgm_price }
    }

    // console.log(prices)
    return tokenIds.map((id): number => prices[id]?.usd || 0)
  } catch (e) {
    pricingServiceIsDownAlert()

    throw e
  }
}
