import * as config from 'config'
import { Provider, ProviderOptions } from 'provider/base'
import {
  Upbit,
  Bithumb,
  Binance,
  Huobi,
  Bitfinex,
  Kraken,
  Kucoin,
  CoinGecko,
} from './quoter'

class CryptoProvider extends Provider {
  constructor(options: ProviderOptions = {} as ProviderOptions) {
    super(options)

    const { fallbackPriority = ['coinGecko'] } = options as any
    const cryptoProviderConfig = (config as any).cryptoProvider || {}

    // sort by fallback priority
    for (const name of fallbackPriority) {
      const option = cryptoProviderConfig[name]

      if (!option) {
        continue
      }

      name === 'upbit' && this.quoters.push(new Upbit(option))
      name === 'bithumb' && this.quoters.push(new Bithumb(option))
      name === 'binance' && this.quoters.push(new Binance(option))
      name === 'huobi' && this.quoters.push(new Huobi(option))
      name === 'bitfinex' && this.quoters.push(new Bitfinex(option))
      name === 'kraken' && this.quoters.push(new Kraken(option))
      name === 'kucoin' && this.quoters.push(new Kucoin(option))
      name === 'coinGecko' && this.quoters.push(new CoinGecko(option))
    }
  }
}

export default CryptoProvider