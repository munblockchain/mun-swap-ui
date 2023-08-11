export type CW20Coin = {
  address: string;
  amount: number | string;
}

export type MinterResponse = {
  minter: string;
  cap?: string;
};

export type InstantiateMarketingInfo = {
  project: string;
  description: string;
  marketing: string;
  logo: string;
};

export type CW20BaseInstantiateMsg = {
  name: string;
  symbol: string;
  decimals: number;
  initial_balances: CW20Coin[];
  mint?: MinterResponse;
  marketing?: InstantiateMarketingInfo;
};