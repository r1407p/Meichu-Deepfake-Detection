import requests
from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
from openai import OpenAI



def fetch_article(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        paragraphs = soup.find_all('p')
        article_text = ' '.join([para.get_text() for para in paragraphs])
        return article_text
    else:
        print("Failed to fetch the article")
        return None

def summarize_text(text):
    load_dotenv()
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY")
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user", 
            "content": f"This is a news about America politics: {text}\n Please summarize this article and return it as an array of strings. The length of array should less than 5."}
        ],
    )
    # print(f'Response: {response}')
    summary = response.choices[0].message.content
    return summary

def main():
    url = "https://edition.cnn.com/2024/10/18/politics/trump-al-smith-harris-wisconsin/index.html"
    article_text = fetch_article(url)
    print(f'Article: {article_text}')
    
    if article_text:
        print("Article fetched successfully.")
        summary = summarize_text(article_text)
        print("Summary:\n", summary)

if __name__ == "__main__":
    main()