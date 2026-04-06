from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import pandas as pd
import numpy as np
from src.simulation.monte_carlo import monte_carlo_simulation
from src.data.loader import load_stock_data
from src.data.preprocess import compute_returns
from src.metrics.risk_metrics import (
    portfolio_return, portfolio_volatility,
    sharpe_ratio
)
from src.models.risk_model import risk_score, explain_risk

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API is running 🚀"}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    tickers = df["ticker"].tolist()
    weights = np.array(df["weight"].tolist())

    data = load_stock_data(tickers, "2020-01-01", "2024-01-01")
    returns = compute_returns(data)

    port_return = portfolio_return(returns, weights)
    port_vol = portfolio_volatility(returns, weights)
    sharpe = sharpe_ratio(returns.mean())

    score = risk_score(port_vol, sharpe)
    explanation = explain_risk(port_vol, sharpe)
    sim_results = monte_carlo_simulation(returns, weights)
    return {
    "portfolio_return": float(port_return),
    "volatility": float(port_vol),
    "risk_score": score,
    "explanation": explanation,
    "monte_carlo_sample": sim_results[:10]
}