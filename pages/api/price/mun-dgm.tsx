import type { NextApiRequest, NextApiResponse } from 'next'
import { get_DGM_USD_Price } from '../../../services/pool'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    let price = await get_DGM_USD_Price()
    res.status(200).json({ 'mun-dgm': { 'usd': price } })
}