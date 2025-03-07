const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// CORSを有効化（開発中は全てのオリジンを許可）
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ヘルスチェック用エンドポイント
app.get('/', (req, res) => {
  res.send('Dental Chart AI API Proxy is running');
});

// 歯科画像解析APIエンドポイント
app.post('/api/analyze-dental-images', async (req, res) => {
  try {
    const { prompt, imageContentArray } = req.body;
    
    if (!prompt || !imageContentArray || !Array.isArray(imageContentArray)) {
      return res.status(400).json({ error: 'Invalid request body. Required: prompt and imageContentArray' });
    }

    console.log('Processing request with images:', imageContentArray.length);
    
    // Anthropic API リクエストの準備
    const requestBody = {
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            ...imageContentArray
          ]
        }
      ]
    };
    
    // API キーのチェック
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is not configured on the server' });
    }

    // Anthropic APIへのリクエスト
    const response = await axios.post('https://api.anthropic.com/v1/messages', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      }
    });
    
    console.log('Received response from Claude API');
    res.json(response.data);
  } catch (error) {
    console.error('Error in API request:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'API request failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API key configured: ${process.env.CLAUDE_API_KEY ? 'Yes' : 'No'}`);
});