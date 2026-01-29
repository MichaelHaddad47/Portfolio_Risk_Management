"""
Yahoo Finance Info Viewer
Fetches and prints the FULL info dictionary for each ticker
"""

import yfinance as yf
from pprint import pprint

# -----------------------------
# CONFIG
# -----------------------------
TICKERS = ["AAPL", "MSFT", "TSLA", "VTI", "BND", "GLD", "XOM"]


# -----------------------------
# MAIN SCRIPT
# -----------------------------
def main():
    print("\n🚀 FETCHING FULL YAHOO FINANCE INFO\n")

    all_info = {}

    for ticker in TICKERS:
        print("=" * 80)
        print(f"📊 {ticker} — FULL INFO")
        print("=" * 80)

        try:
            info = yf.Ticker(ticker).info
            all_info[ticker] = info

            # Print the FULL dictionary (no truncation)
            pprint(info, sort_dicts=False)

        except Exception as e:
            print(f"❌ Error fetching {ticker}: {e}")
            all_info[ticker] = {}

        print("\n")

    print("✅ DONE — ALL INFO FETCHED\n")
    return all_info


# -----------------------------
# ENTRY POINT
# -----------------------------
if __name__ == "__main__":
    main()
