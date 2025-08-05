# Pattern 9: Generate Synthetic Data - Test with AI-Created Samples

## The Safe Testing Pattern

When you need to test data processing logic but don't have access to real data, or when real data is too sensitive/complex, generate synthetic data that matches your requirements.

**Flow**: Define Data Requirements → Generate Realistic Samples → Test Logic → Apply to Real Data

---

## Example 1: E-commerce Analytics Testing

### The Challenge
Building analytics for an e-commerce platform, but production data is sensitive and development database is empty.

### Synthetic Data Generation

#### Step 1: Define Data Requirements
```
"I need realistic e-commerce data to test my analytics dashboard. Generate sample data that includes:

Customer Data (1000 customers):
- Realistic names and email addresses
- Age distribution: 18-65, weighted toward 25-45
- Geographic distribution across US states
- Registration dates over past 2 years
- Customer segments: new, returning, VIP

Product Data (200 products):
- Product categories: electronics, clothing, home, books, sports
- Price ranges appropriate for each category
- Product ratings and review counts
- Stock levels and availability
- SKU numbers and descriptions

Order Data (5000 orders):
- Order dates distributed over past year with seasonal patterns
- Realistic order values based on customer segments
- Multiple items per order (1-8 items typical)
- Order statuses: completed, pending, shipped, cancelled, returned
- Payment methods: credit card, PayPal, digital wallet
- Shipping addresses and methods

Requirements:
- Data should follow realistic business patterns
- Include edge cases: high-value orders, bulk purchases, refunds
- Seasonal trends: higher sales in Q4, back-to-school in August
- Customer behavior patterns: repeat customers, cart abandonment
- Export as JSON files"
```

#### Step 2: Generated Synthetic Data Structure
```json
{
  "customers": [
    {
      "id": "CUST_001",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@email.com",
      "age": 32,
      "state": "CA",
      "city": "San Francisco",
      "registration_date": "2023-03-15T10:30:00Z",
      "segment": "returning",
      "total_orders": 12,
      "lifetime_value": 1250.75,
      "last_order_date": "2024-07-22T14:20:00Z"
    }
  ],
  "products": [
    {
      "id": "PROD_001",
      "sku": "ELEC-LAP-001",
      "name": "UltraBook Pro 15-inch Laptop",
      "category": "electronics",
      "subcategory": "laptops",
      "price": 1299.99,
      "rating": 4.5,
      "review_count": 127,
      "stock_level": 15,
      "description": "High-performance laptop with 16GB RAM and 512GB SSD"
    }
  ],
  "orders": [
    {
      "id": "ORD_001",
      "customer_id": "CUST_001",
      "order_date": "2024-07-22T14:20:00Z",
      "status": "completed",
      "total_amount": 156.78,
      "tax_amount": 12.54,
      "shipping_amount": 8.99,
      "payment_method": "credit_card",
      "shipping_address": {
        "street": "123 Main St",
        "city": "San Francisco",
        "state": "CA",
        "zip": "94105"
      },
      "items": [
        {
          "product_id": "PROD_045",
          "quantity": 2,
          "unit_price": 29.99,
          "total_price": 59.98
        }
      ]
    }
  ]
}
```

#### Step 3: Testing Analytics Logic
```python
# Test the analytics functions with synthetic data
def test_customer_segmentation():
    # Load synthetic data
    customers = load_synthetic_data('customers.json')
    orders = load_synthetic_data('orders.json')
    
    # Test RFM analysis
    rfm_scores = calculate_rfm_scores(customers, orders)
    
    # Validate results with known synthetic patterns
    assert len(rfm_scores) == 1000  # All customers processed
    assert all(score['recency'] >= 0 for score in rfm_scores)
    assert any(score['segment'] == 'VIP' for score in rfm_scores)
    
    print("✅ RFM analysis working correctly")

def test_seasonal_trends():
    orders = load_synthetic_data('orders.json')
    
    # Test seasonal analysis
    monthly_sales = calculate_monthly_sales(orders)
    
    # Validate synthetic seasonal patterns
    q4_sales = sum(monthly_sales[month] for month in ['Oct', 'Nov', 'Dec'])
    q1_sales = sum(monthly_sales[month] for month in ['Jan', 'Feb', 'Mar'])
    
    assert q4_sales > q1_sales, "Q4 should have higher sales (synthetic pattern)"
    
    print("✅ Seasonal analysis working correctly")

# Run tests
test_customer_segmentation()
test_seasonal_trends()
```

---

## Example 2: API Load Testing

### The Challenge
Need to test API performance but don't want to use real user data or create test accounts manually.

### Synthetic Data Generation

#### Step 1: Define API Test Requirements
```
"Generate realistic test data for API load testing:

User Registration Data (10,000 users):
- Varied email domains (gmail, yahoo, corporate domains)
- Realistic names from different cultures/regions
- Password complexity following our rules
- Phone numbers in international formats
- Profile data: job titles, companies, bio descriptions
- Account types: free, premium, enterprise

Content Data (50,000 posts):
- Realistic post content in various languages
- Different content types: text, images, videos, links
- Hashtags and mentions following social media patterns
- Post lengths varying from short tweets to long articles
- Timestamps distributed over past 6 months
- Engagement data: likes, shares, comments

API Request Patterns:
- Authentication requests with realistic failure rates
- CRUD operations with typical usage patterns
- Search queries with realistic terms
- File uploads with various sizes and types
- Pagination requests across large datasets

Export as:
- JSON files for data import
- CSV files for load testing tools
- SQL insert statements for database seeding"
```

#### Step 2: Generated Load Test Data
```json
{
  "users": [
    {
      "email": "alex.murphy@techcorp.com",
      "password": "SecurePass123!",
      "first_name": "Alex",
      "last_name": "Murphy", 
      "phone": "+1-555-0123",
      "country": "US",
      "job_title": "Software Engineer",
      "company": "TechCorp Industries",
      "account_type": "premium",
      "bio": "Passionate developer with 5 years experience in full-stack development"
    }
  ],
  "api_test_scenarios": [
    {
      "scenario": "user_registration",
      "requests_per_minute": 100,
      "expected_success_rate": 95,
      "expected_response_time_ms": 200
    },
    {
      "scenario": "content_creation", 
      "requests_per_minute": 500,
      "expected_success_rate": 98,
      "expected_response_time_ms": 150
    }
  ]
}
```

#### Step 3: Load Testing with Synthetic Data
```javascript
// Load test script using synthetic data
import { check } from 'k6';
import http from 'k6/http';

// Load synthetic user data
const users = JSON.parse(open('./synthetic-users.json'));
const posts = JSON.parse(open('./synthetic-posts.json'));

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 0 },
  ],
};

export default function() {
  // Use random synthetic user
  const user = users[Math.floor(Math.random() * users.length)];
  
  // Test user registration
  let registrationResponse = http.post('https://api.example.com/register', {
    email: user.email,
    password: user.password,
    name: `${user.first_name} ${user.last_name}`
  });
  
  check(registrationResponse, {
    'registration status is 201': (r) => r.status === 201,  
    'registration time < 500ms': (r) => r.timings.duration < 500,
  });
  
  // Test content creation with synthetic post
  const post = posts[Math.floor(Math.random() * posts.length)];
  
  let postResponse = http.post('https://api.example.com/posts', {
    title: post.title,
    content: post.content,
    tags: post.tags
  });
  
  check(postResponse, {
    'post creation status is 201': (r) => r.status === 201,
    'post creation time < 300ms': (r) => r.timings.duration < 300,
  });
}
```

---

## Example 3: Financial Data Analysis

### The Challenge
Building financial analysis tools but can't use real financial data due to regulations and privacy concerns.

### Synthetic Financial Data

#### Step 1: Define Financial Requirements
```
"Generate realistic synthetic financial data for testing portfolio analysis tools:

Stock Market Data:
- 500 fictional companies with realistic stock symbols (TECH, HLTH, BANK, etc.)
- Daily stock prices for past 2 years with realistic volatility
- Market sectors: technology, healthcare, finance, energy, consumer goods
- Market cap ranges: small-cap, mid-cap, large-cap
- Dividend yields and ex-dividend dates
- Trading volumes following realistic patterns

Portfolio Data (100 portfolios):
- Portfolio values ranging from $10K to $10M
- Asset allocation across different sectors and asset types
- Buy/sell transactions with realistic timing
- Rebalancing events and tax considerations
- Performance benchmarks and risk metrics

Economic Indicators:
- Interest rates, inflation rates, unemployment rates
- Currency exchange rates for major pairs
- Commodity prices (gold, oil, agricultural products)
- Economic events and their market impact dates

Requirements:
- Follow realistic market correlations and patterns
- Include market crashes, bull/bear cycles
- Seasonal patterns and calendar effects
- No insider trading or illegal patterns
- Include edge cases: penny stocks, bankruptcies, IPOs"
```

#### Step 2: Generated Financial Data
```json
{
  "companies": [
    {
      "symbol": "TECH001",
      "name": "InnovateTech Solutions",
      "sector": "Technology",
      "industry": "Software",
      "market_cap": "large_cap",
      "ipo_date": "2018-03-15",
      "employees": 12500,
      "headquarters": "San Francisco, CA"
    }
  ],
  "stock_prices": [
    {
      "symbol": "TECH001",
      "date": "2024-08-05",
      "open": 145.20,
      "high": 148.75,
      "low": 144.80,
      "close": 147.65,
      "volume": 2456789,
      "adjusted_close": 147.65
    }
  ],
  "portfolios": [
    {
      "id": "PORT_001",
      "owner": "Conservative Investor",
      "total_value": 250000.00,
      "risk_profile": "conservative",
      "holdings": [
        {
          "symbol": "TECH001",
          "shares": 500,
          "purchase_date": "2024-01-15",
          "purchase_price": 142.50,
          "current_value": 73825.00
        }
      ]
    }
  ]
}
```

#### Step 3: Testing Financial Algorithms
```python
import pandas as pd
import numpy as np

def test_portfolio_optimization():
    # Load synthetic data
    prices = pd.read_json('synthetic_stock_prices.json')
    portfolios = pd.read_json('synthetic_portfolios.json')
    
    # Test Modern Portfolio Theory implementation
    expected_returns = calculate_expected_returns(prices)
    risk_matrix = calculate_risk_matrix(prices)
    
    # Optimize portfolio with synthetic data
    optimal_weights = optimize_portfolio(expected_returns, risk_matrix)
    
    # Validate results
    assert sum(optimal_weights) == 1.0  # Weights sum to 100%
    assert all(w >= 0 for w in optimal_weights)  # No short selling
    
    # Test with edge cases from synthetic data
    crash_period = prices[prices['date'] >= '2024-03-01']  # Synthetic crash
    stress_test_results = stress_test_portfolio(optimal_weights, crash_period)
    
    print(f"✅ Portfolio optimization working correctly")
    print(f"📊 Stress test max drawdown: {stress_test_results['max_drawdown']:.2%}")

def test_risk_metrics():
    portfolios = pd.read_json('synthetic_portfolios.json')
    
    for portfolio in portfolios:
        # Calculate VaR using synthetic data
        var_95 = calculate_var(portfolio['holdings'], confidence=0.95)
        
        # Calculate Sharpe ratio
        sharpe = calculate_sharpe_ratio(portfolio['returns'], risk_free_rate=0.02)
        
        # Test that metrics are reasonable for synthetic data
        assert 0 <= var_95 <= portfolio['total_value'] * 0.5
        assert -2 <= sharpe <= 5  # Reasonable Sharpe ratio range
    
    print("✅ Risk metrics calculation working correctly")

# Run financial analysis tests
test_portfolio_optimization()
test_risk_metrics()
```

---

## Example 4: Machine Learning Model Training

### The Challenge
Training ML models but need more diverse training data that represents edge cases not present in real dataset.

### Synthetic Training Data

#### Step 1: Define ML Data Requirements
```
"Generate synthetic training data for a customer churn prediction model:

Customer Features:
- Demographics: age (18-80), income (20K-500K), education level, location
- Account info: tenure (0-10 years), account type, payment method
- Usage patterns: monthly usage hours, feature adoption, support tickets
- Engagement: last login, app opens per week, email open rates
- Financial: monthly spend, payment delays, discount usage

Churn Labels:
- 70% retained customers (churned = 0)
- 30% churned customers (churned = 1)
- Include realistic churn patterns:
  - New customers more likely to churn
  - High-value customers less likely to churn  
  - Customers with recent support issues more likely to churn
  - Seasonal churn patterns

Edge Cases to Include:
- High-value customers who churned unexpectedly
- Long-tenure customers with sudden usage drops
- Customers who churned then returned
- Customers with missing data points
- Outliers in usage and spending patterns

Generate 50,000 samples with realistic correlations between features and churn."
```

#### Step 2: Generated ML Training Data
```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Generate synthetic customer data
np.random.seed(42)  # For reproducible results

def generate_synthetic_customers(n_samples=50000):
    customers = []
    
    for i in range(n_samples):
        # Base customer features
        age = np.random.randint(18, 81)
        income = np.random.lognormal(10.5, 0.8)  # Log-normal distribution
        tenure_months = np.random.randint(0, 121)  # 0-10 years
        
        # Usage patterns correlated with demographics
        monthly_usage = np.random.gamma(2, 10) * (1 + income/100000) * (1 + tenure_months/120)
        support_tickets = np.random.poisson(0.5 + (monthly_usage/100))
        
        # Financial patterns
        monthly_spend = max(0, np.random.normal(50 + income/10000, 20))
        payment_delays = np.random.poisson(0.2 + max(0, (50-monthly_spend)/100))
        
        # Engagement metrics
        days_since_login = np.random.exponential(3)
        app_opens_per_week = max(0, np.random.normal(7 - days_since_login/5, 3))
        
        # Calculate churn probability based on features
        churn_prob = calculate_churn_probability(
            age, income, tenure_months, monthly_usage, 
            support_tickets, monthly_spend, payment_delays,
            days_since_login, app_opens_per_week
        )
        
        # Generate churn label based on probability
        churned = np.random.binomial(1, churn_prob)
        
        customers.append({
            'customer_id': f'CUST_{i:06d}',
            'age': age,
            'income': min(income, 500000),  # Cap at 500K
            'tenure_months': tenure_months,
            'monthly_usage_hours': round(monthly_usage, 2),
            'support_tickets_3m': support_tickets,
            'monthly_spend': round(monthly_spend, 2),
            'payment_delays_6m': payment_delays,
            'days_since_login': round(days_since_login, 1),
            'app_opens_per_week': round(app_opens_per_week, 1),
            'churned': churned
        })
    
    return pd.DataFrame(customers)

def calculate_churn_probability(age, income, tenure, usage, tickets, spend, delays, last_login, app_opens):
    """Calculate realistic churn probability based on features"""
    
    # Base probability
    prob = 0.3
    
    # Age factor (younger customers more likely to churn)
    prob += max(0, (35 - age) / 100)
    
    # Income factor (higher income = lower churn)
    prob -= min(0.15, income / 1000000)
    
    # Tenure factor (longer tenure = lower churn)
    prob -= min(0.2, tenure / 600)
    
    # Usage factor (more usage = lower churn)
    prob -= min(0.1, usage / 1000)
    
    # Support tickets factor (more tickets = higher churn)
    prob += min(0.2, tickets / 10)
    
    # Spend factor (higher spend = lower churn)
    prob -= min(0.1, spend / 500)
    
    # Payment delays factor (delays = higher churn)
    prob += min(0.3, delays / 5)
    
    # Engagement factors
    prob += min(0.2, last_login / 30)  # Recent login = lower churn
    prob -= min(0.1, app_opens / 50)   # More app opens = lower churn
    
    return max(0.01, min(0.99, prob))  # Keep between 1% and 99%

# Generate the synthetic dataset
synthetic_customers = generate_synthetic_customers(50000)

# Validate the synthetic data
print("Synthetic Dataset Summary:")
print(f"Total samples: {len(synthetic_customers)}")
print(f"Churn rate: {synthetic_customers['churned'].mean():.1%}")
print(f"Average tenure: {synthetic_customers['tenure_months'].mean():.1f} months")
print(f"Average monthly spend: ${synthetic_customers['monthly_spend'].mean():.2f}")

# Check correlations make sense
print("\nFeature Correlations with Churn:")
correlations = synthetic_customers.corr()['churned'].sort_values(ascending=False)
for feature, correlation in correlations.items():
    if feature != 'churned':
        print(f"{feature}: {correlation:.3f}")
```

#### Step 3: Model Training and Validation
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

def train_and_validate_model():
    # Load synthetic data
    data = synthetic_customers.copy()
    
    # Prepare features and target
    feature_cols = [col for col in data.columns if col not in ['customer_id', 'churned']]
    X = data[feature_cols]
    y = data['churned']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate on synthetic test set
    y_pred = model.predict(X_test)
    
    print("Model Performance on Synthetic Data:")
    print(classification_report(y_test, y_pred))
    
    # Feature importance
    importance = pd.DataFrame({
        'feature': feature_cols,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nTop Feature Importances:")
    print(importance.head(10))
    
    # Test on edge cases
    edge_cases = data[
        (data['monthly_spend'] > data['monthly_spend'].quantile(0.95)) & 
        (data['churned'] == 1)
    ]  # High-spend churners
    
    if len(edge_cases) > 0:
        edge_predictions = model.predict_proba(edge_cases[feature_cols])[:, 1]
        print(f"\nEdge case prediction accuracy: {np.mean(edge_predictions > 0.5):.2%}")
    
    return model

# Train and validate the model
trained_model = train_and_validate_model()
```

---

## Synthetic Data Best Practices

### 1. Maintain Realistic Relationships
```python
def ensure_realistic_correlations():
    """Ensure synthetic data maintains logical relationships"""
    
    # Examples of realistic correlations:
    # - Higher income → Higher spending potential
    # - Longer tenure → Lower churn probability  
    # - More support tickets → Higher churn risk
    # - Recent engagement → Lower churn risk
    
    # Validate these relationships exist in synthetic data
    correlations = data.corr()
    
    assert correlations['income']['monthly_spend'] > 0.3, "Income should positively correlate with spending"
    assert correlations['tenure_months']['churned'] < -0.1, "Tenure should negatively correlate with churn"
    assert correlations['support_tickets_3m']['churned'] > 0.1, "Support tickets should positively correlate with churn"
```

### 2. Include Edge Cases and Outliers
```python
def add_edge_cases(data, edge_case_ratio=0.05):
    """Add realistic edge cases to synthetic data"""
    
    n_edge_cases = int(len(data) * edge_case_ratio)
    
    edge_cases = []
    for i in range(n_edge_cases):
        # Create edge case scenarios
        if i % 4 == 0:
            # High-value customer who churned
            case = create_high_value_churner()
        elif i % 4 == 1:
            # Long-tenure customer with sudden change
            case = create_tenure_anomaly()
        elif i % 4 == 2:
            # Customer with missing data
            case = create_missing_data_case()
        else:
            # Extreme usage patterns
            case = create_usage_outlier()
        
        edge_cases.append(case)
    
    return pd.concat([data, pd.DataFrame(edge_cases)], ignore_index=True)
```

### 3. Validate Statistical Properties
```python
def validate_synthetic_data(data):
    """Validate that synthetic data has realistic statistical properties"""
    
    # Check distributions
    assert 18 <= data['age'].min() <= 25, "Age minimum too low"
    assert 75 <= data['age'].max() <= 80, "Age maximum too high"
    
    # Check for outliers (should have some, but not too many)
    outlier_ratio = len(data[data['monthly_spend'] > data['monthly_spend'].quantile(0.99)]) / len(data)
    assert 0.005 <= outlier_ratio <= 0.02, f"Outlier ratio {outlier_ratio:.3f} not realistic"
    
    # Check target distribution
    churn_rate = data['churned'].mean()
    assert 0.25 <= churn_rate <= 0.35, f"Churn rate {churn_rate:.1%} not realistic"
    
    print("✅ Synthetic data validation passed")
```

---

## Common Synthetic Data Mistakes

### Mistake 1: Unrealistic Correlations
```python
# ❌ Bad: No correlation between related features
income = np.random.normal(50000, 20000, 1000)
spending = np.random.normal(100, 50, 1000)  # Independent of income

# ✅ Good: Logical correlation
income = np.random.normal(50000, 20000, 1000)
spending = np.random.normal(income/500, income/2000)  # Correlated with income
```

### Mistake 2: No Edge Cases
```python
# ❌ Bad: All data follows normal patterns
ages = np.random.normal(40, 10, 1000)  # Everyone near 40

# ✅ Good: Include realistic outliers
ages = np.concatenate([
    np.random.normal(40, 10, 950),  # Most people
    np.random.uniform(18, 25, 25),  # Young adults
    np.random.uniform(65, 80, 25)   # Seniors
])
```

### Mistake 3: Perfect Data
```python
# ❌ Bad: No missing values or inconsistencies
data = pd.DataFrame({'income': incomes, 'age': ages})  # Perfect data

# ✅ Good: Realistic data quality issues
data = pd.DataFrame({'income': incomes, 'age': ages})
missing_mask = np.random.random(len(data)) < 0.05  # 5% missing
data.loc[missing_mask, 'income'] = np.nan
```

---

## Measuring Synthetic Data Quality

### Similarity to Real Data
```python
def compare_distributions(real_data, synthetic_data):
    """Compare statistical properties of real vs synthetic data"""
    
    from scipy import stats
    
    for column in real_data.columns:
        if column in synthetic_data.columns:
            # Compare distributions using KS test
            ks_stat, p_value = stats.ks_2samp(real_data[column], synthetic_data[column])
            
            print(f"{column}: KS statistic = {ks_stat:.3f}, p-value = {p_value:.3f}")
            
            if p_value > 0.05:
                print(f"✅ {column} distributions are similar")
            else:
                print(f"⚠️ {column} distributions differ significantly")
```

### Model Performance Validation
```python
def validate_model_transfer():
    """Test if model trained on synthetic data works on real data"""
    
    # Train on synthetic data
    model_synthetic = train_model(synthetic_train_data)
    
    # Test on real data (if available)
    real_performance = model_synthetic.score(real_test_data)
    
    # Compare to model trained on real data
    model_real = train_model(real_train_data)
    real_baseline = model_real.score(real_test_data)
    
    performance_ratio = real_performance / real_baseline
    
    print(f"Synthetic→Real transfer: {performance_ratio:.2%} of baseline performance")
    
    if performance_ratio > 0.8:
        print("✅ Good transfer learning")
    else:
        print("⚠️ Poor transfer - improve synthetic data")
```

Remember: The goal of synthetic data is not to perfectly replicate real data, but to create realistic test cases that help you build robust systems!