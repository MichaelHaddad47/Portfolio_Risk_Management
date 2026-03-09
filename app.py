from flask import Flask, request, jsonify
from flask_cors import CORS

from dataload.data_loader import PortfolioLoader
from dataload.portfolio_analyzer import PortfolioAnalyzer

app = Flask(__name__)

# Enable CORS with explicit configuration
CORS(app, 
     origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"],
     allow_headers=["Content-Type"],
     methods=["GET", "POST", "OPTIONS"],
     supports_credentials=True)

@app.route('/api/portfolio/analyze', methods=['POST', 'OPTIONS'])
def analyze_portfolio():
    if request.method == "OPTIONS":
        return "", 204
    
    try:
        data = request.json
        risk_tolerance = data.get("risk_tolerance", "medium")
        lookback_days = data.get("lookback_days", 504)
        
        # Use provided portfolio or create mock
        portfolio_data = data.get("portfolio_data")
        if not portfolio_data:
            df = PortfolioLoader.create_mock_portfolio()
        else:
            import pandas as pd
            df = pd.DataFrame(portfolio_data)
        
        analyzer = PortfolioAnalyzer(
            portfolio_data=df,
            risk_tolerance=risk_tolerance,
            lookback_days=lookback_days
        )
        
        report = analyzer.get_summary_report()
        return jsonify({"success": True, "data": report}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/mock-portfolio', methods=['GET', 'OPTIONS'])
def get_mock_portfolio():
    if request.method == "OPTIONS":
        return "", 204
    
    try:
        df = PortfolioLoader.create_mock_portfolio()
        portfolio = dict(zip(df['Ticker'], df['Weight']))
        return jsonify(portfolio)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
