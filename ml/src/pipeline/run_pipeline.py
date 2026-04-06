from src.data.fetch_data import fetch_stock_data
from src.features.build_features import build_features

if __name__ == "__main__":
    tickers = ["AAPL", "MSFT", "GOOGL"]

    prices = fetch_stock_data(tickers)
    features = build_features(prices)

    print("Expected Returns:\n", features["expected_return"])
    print("\nVolatility:\n", features["volatility"])