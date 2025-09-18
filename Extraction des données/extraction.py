'''
Extraction des données de cryptomonnaies depuis l'API CoinGecko
   - Prix, Market Cap, Volume
   - Période : 01/01/2025 - 30/06/2025
'''

# Librairies
import requests
import pandas as pd
import time
from datetime import datetime

# Fonction pour obtenir les top N cryptos
def get_top_coins(n=10, vs_currency="usd"):
    '''
    Récupère les N cryptomonnaies les plus capitalisées.
    '''
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": vs_currency,
        "order": "market_cap_desc",
        "per_page": n,
        "page": 1,
        "sparkline": False
    }
    response = requests.get(url, params=params)
    data = response.json()
    # Extraire les IDs CoinGecko
    top_coins = [coin["id"] for coin in data]
    return top_coins

coins = get_top_coins()
# print(coins)

# Dates de la plage
start_date = "2025-01-01"
end_date   = "2025-06-30"

# Conversion en timestamp Unix (secondes)
def to_unix(date_str):
    '''
    Convertit une date "YYYY-MM-DD" en timestamp Unix (secondes).
    '''
    return int(datetime.strptime(date_str, "%Y-%m-%d").timestamp())

start_ts = to_unix(start_date)
end_ts   = to_unix(end_date)

def fetch_data(coin):
    '''
    Récupère les données de prix, market cap et volume pour une crypto donnée
    sur la période définie.
    '''
    # Requête API
    url = f"https://api.coingecko.com/api/v3/coins/{coin}/market_chart/range"
    # Paramètres
    params = {
        "vs_currency": "usd",
        "from": start_ts,
        "to": end_ts
    }
    # Requête
    r = requests.get(url, params=params)
    data = r.json()

    # Dataframes pour prix, market cap et volume
    prices = pd.DataFrame(data.get("prices", []), columns=["timestamp", "price"])
    market_caps = pd.DataFrame(data.get("market_caps", []), columns=["timestamp", "market_cap"])
    volumes = pd.DataFrame(data.get("total_volumes", []), columns=["timestamp", "volume"])

    # Fusion sur timestamp
    df = prices.merge(market_caps, on="timestamp").merge(volumes, on="timestamp")

    # Conversion timestamp en date
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms").dt.date
    df["coin"] = coin

    return df

# Récupérer pour chaque coin et concaténer
all_dfs = []
for coin in coins:
    try:
        df = fetch_data(coin)
        all_dfs.append(df)
        time.sleep(1)  # Sécurité pour respecter la limite API (50 calls/minute)
    except Exception as e:
        print(f"Erreur pour {coin}: {e}")

# Filtrer les DataFrames vides
all_dfs = [df for df in all_dfs if not df.empty]

# Concaténer toutes les données
if all_dfs:
    result = pd.concat(all_dfs, ignore_index=True)
    result = result[["timestamp", "coin", "price", "market_cap", "volume"]]
    # print(result.head())
    # print(result.tail())

# Sauvegarder en CSV et Excel
result.to_csv("Extraction des données/data_crypto.csv", index=False)
result.to_excel("Extraction des données/data_crypto.xlsx", index=False)
