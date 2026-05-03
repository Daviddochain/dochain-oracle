import fetch from 'lib/fetch'
import { errorHandler } from 'lib/error'
import * as logger from 'lib/logger'
import { num } from 'lib/num'
import { toQueryString } from 'lib/fetch'
import { Quoter } from 'provider/base'

type Response = Record<string, { usd: number }>

export class CoinGecko extends Quoter {
  private async updatePrices(): Promise<void> {
    const params = {
      vs_currencies: 'usd',
      precision: 18,
      ids: this.symbols.map((symbol) => COIN_GECKO_IDS[symbol]).join(','),
    }

    const response: Response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?${toQueryString(params)}`,
      {
        timeout: this.options.timeout,
      },
    ).then((res) => res.json())

    if (!response) {
      logger.error(
        `${this.constructor.name}: wrong api response`,
        response ? JSON.stringify(response) : 'empty',
      )
      throw new Error('Invalid response from Coingecko')
    }

    for (const key of Object.keys(response)) {
      for (const symbol in COIN_GECKO_IDS) {
        if (COIN_GECKO_IDS[symbol] === key) {
          const price = response[key].usd
          this.setPrice(symbol, num(price))
        }
      }
    }
  }

  protected async update(): Promise<boolean> {
    await this.updatePrices().catch(errorHandler)

    return true
  }
}

const COIN_GECKO_IDS: Record<string, string> = {
  'DO/USD': 'lunc-cookie-do-coin',
  'BTC/USD': 'bitcoin',
  'ETH/USD': 'ethereum',
  'BNB/USD': 'binancecoin',
  'USDT/USD': 'tether',
  'USDC/USD': 'usd-coin',
  'DAI/USD': 'dai',
  'XRP/USD': 'ripple',
  'DOGE/USD': 'dogecoin',
  'ADA/USD': 'cardano',
  'MATIC/USD': 'matic-network',
  'DOT/USD': 'polkadot',
  'LTC/USD': 'litecoin',
  'ATOM/USD': 'cosmos',
  'OSMO/USD': 'osmosis',
  'KAVA/USD': 'kava',
  'SCRT/USD': 'secret',
  'AKT/USD': 'akash-network',
}

export default CoinGecko