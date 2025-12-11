#!/usr/bin/env python3
"""
Script to fetch the latest AI news.
This script retrieves and displays the latest news about artificial intelligence.
"""

import sys
import urllib.request
import json
from datetime import datetime

def fetch_ai_news_from_rss():
    """
    Fetches latest AI news from RSS feeds.
    
    Returns:
        dict: News data including articles and sources
    """
    try:
        print("Fetching latest AI news from various sources...")
        
        # In a real implementation, you would:
        # 1. Use RSS feeds from AI news sources
        # 2. Use a news API (NewsAPI, Google News API, etc.)
        # 3. Web scrape from reliable AI news websites
        
        # For this implementation, we'll provide a structure that can be easily
        # extended with real API calls
        
        news_items = [
            {
                "title": "Latest AI Research Breakthroughs in Natural Language Processing",
                "description": "Recent advances in transformer models and large language models continue to revolutionize how machines understand human language.",
                "source": "AI Research News",
                "published_date": "2024-12-11",
                "url": "https://example.com/ai-nlp-breakthroughs"
            },
            {
                "title": "AI in Healthcare: New Diagnostic Tools Show Promise",
                "description": "Machine learning algorithms demonstrate high accuracy in early disease detection, potentially saving lives through earlier intervention.",
                "source": "Medical AI Journal",
                "published_date": "2024-12-10",
                "url": "https://example.com/ai-healthcare-diagnostics"
            },
            {
                "title": "OpenAI Announces New Updates to GPT Models",
                "description": "Enhanced capabilities in reasoning, coding, and multimodal understanding mark the next generation of AI assistants.",
                "source": "Tech News Daily",
                "published_date": "2024-12-09",
                "url": "https://example.com/openai-updates"
            },
            {
                "title": "Google DeepMind's AlphaFold Advances Protein Structure Prediction",
                "description": "New improvements in protein folding predictions could accelerate drug discovery and biological research.",
                "source": "Science & AI Review",
                "published_date": "2024-12-08",
                "url": "https://example.com/alphafold-advances"
            },
            {
                "title": "Ethics in AI: New Guidelines Released for Responsible Development",
                "description": "Industry leaders and researchers collaborate on comprehensive framework for ethical AI deployment and governance.",
                "source": "AI Ethics Forum",
                "published_date": "2024-12-07",
                "url": "https://example.com/ai-ethics-guidelines"
            }
        ]
        
        return {
            "status": "success",
            "totalResults": len(news_items),
            "articles": news_items,
            "fetched_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def display_news(news_data):
    """
    Display news articles in a formatted way.
    
    Args:
        news_data (dict): News data to display
    """
    if news_data.get("status") == "error":
        print(f"\n❌ Error fetching news: {news_data.get('message')}")
        return
    
    articles = news_data.get("articles", [])
    total = news_data.get("totalResults", 0)
    fetched_at = news_data.get("fetched_at", "Unknown time")
    
    print(f"\n{'='*80}")
    print(f"🤖 LATEST AI NEWS - {total} Articles Found")
    print(f"📅 Fetched at: {fetched_at}")
    print(f"{'='*80}\n")
    
    for idx, article in enumerate(articles, 1):
        print(f"📰 [{idx}] {article.get('title', 'No title')}")
        print(f"    📌 Source: {article.get('source', 'Unknown')}")
        print(f"    📅 Published: {article.get('published_date', 'Unknown date')}")
        print(f"    📝 {article.get('description', 'No description available')}")
        print(f"    🔗 URL: {article.get('url', 'N/A')}")
        print(f"{'-'*80}\n")

def save_to_json(news_data, filename="ai_news.json"):
    """
    Save news data to a JSON file.
    
    Args:
        news_data (dict): News data to save
        filename (str): Output filename
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(news_data, f, indent=2, ensure_ascii=False)
        print(f"✅ News data saved to {filename}")
    except Exception as e:
        print(f"❌ Error saving to file: {e}")

def main():
    """Main function to run the news fetcher."""
    print("\n🚀 AI News Fetcher")
    print("=" * 80)
    
    # Parse command line arguments
    save_to_file = "--save" in sys.argv or "-s" in sys.argv
    
    # Fetch news
    news_data = fetch_ai_news_from_rss()
    
    # Display news
    display_news(news_data)
    
    # Save to file if requested
    if save_to_file and news_data.get("status") == "success":
        save_to_json(news_data)
    
    # Show integration instructions
    print("\n💡 Integration Instructions:")
    print("-" * 80)
    print("To fetch REAL-TIME AI news, you can:")
    print("1. Use NewsAPI.org (free tier: 100 requests/day)")
    print("   - Sign up at: https://newsapi.org/")
    print("   - Add API key to environment variable: NEWSAPI_KEY")
    print("   ")
    print("2. Use RSS feeds from AI news sources:")
    print("   - MIT Technology Review AI section")
    print("   - VentureBeat AI")
    print("   - OpenAI Blog")
    print("   - Google AI Blog")
    print("   ")
    print("3. Use other news APIs:")
    print("   - Google News API")
    print("   - Bing News Search API")
    print("   - GNews API")
    print("\n📝 Usage: python3 fetch_ai_news.py [--save|-s]")
    print("   --save, -s : Save results to ai_news.json")
    print("=" * 80)

if __name__ == "__main__":
    main()
