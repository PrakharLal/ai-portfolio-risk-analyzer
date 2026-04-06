from src.data.loader import load_stock_data
from src.data.preprocess import compute_returns
from src.metrics.risk_metrics import (
    volatility, sharpe_ratio,
    portfolio_return, portfolio_volatility
)
import numpy as np
from src.simulation.monte_carlo import monte_carlo_simulation
from src.models.risk_model import risk_score
from src.models.risk_model import risk_score, explain_risk
from src.models.train import train_kmeans, map_clusters_to_risk




tickers = ["AAPL", "MSFT", "GOOG"]

data = load_stock_data(tickers, "2020-01-01", "2024-01-01")
returns = compute_returns(data)

print("Data:\n", data.head())
print("\nReturns:\n", returns.head())
print("\nVolatility:\n", returns.apply(volatility))
print("\nSharpe Ratio:\n", returns.apply(sharpe_ratio))

weights = np.array([0.4, 0.3, 0.3])

port_return = portfolio_return(returns, weights)
port_vol = portfolio_volatility(returns, weights)

print("\nPortfolio Return:", port_return)
print("Portfolio Volatility:", port_vol)

sim_results = monte_carlo_simulation(returns, weights)

print("\nMonte Carlo Sample:", sim_results[:10])

import matplotlib.pyplot as plt

plt.hist(sim_results, bins=50)
plt.title("Monte Carlo Simulation - Portfolio Returns")
plt.xlabel("Returns")
plt.ylabel("Frequency")
plt.show()

score = risk_score(port_vol, sharpe_ratio(returns.mean()))

print("\nFinal Risk Score:", score)

explanation = explain_risk(port_vol, sharpe_ratio(returns.mean()))

print("\nExplanation:", explanation)



model, clustered_data = train_kmeans(returns)

print("\nKMeans Clusters:\n", clustered_data)

model, clustered_data = train_kmeans(returns)
clustered_data = map_clusters_to_risk(clustered_data)

print("\nClustered Data with Risk Labels:\n", clustered_data)
