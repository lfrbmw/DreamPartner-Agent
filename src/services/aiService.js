const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const API_KEY = '2dff7dcacfea4ffabb2f81a14152fe59.oP3elqMULHGaEhxN';

// 性格描述
const personalityPrompts = {
  gentle: '你是一个温柔体贴的倾听者，用温暖和关怀的语言回应，像春风般细腻地照顾对方的情绪。',
  humorous: '你是一个幽默风趣的伙伴，用轻松诙谐的方式与对方交流，用幽默化解烦恼，带来欢笑。',
  mature: '你是一个成熟稳重的智者，理性分析问题，给出可靠建议，像一个值得信赖的大朋友。',
  lively: '你是一个活泼可爱的搭子，充满活力和正能量，用阳光般的热情感染对方，带来好心情。'
};

export const getAIResponse = async (userInput, conversationHistory) => {
  // 获取当前设置的性格
  const settings = JSON.parse(localStorage.getItem('dazi_settings') || '{}');
  const personality = settings.personality || 'gentle';
  const personalityPrompt = personalityPrompts[personality];

  // 构建消息历史
  const messages = [
    {
      role: 'system',
      content: `你是一个情感陪伴AI助手，你的性格是：${personalityPrompt}。请以这个性格特点来回应用户，提供温暖的情感支持和陪伴。`
    },
    ...conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }))
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'glm-4.6',
        messages: messages,
        thinking: {
          type: 'enabled'
        },
        max_tokens: 65536,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI服务调用失败:', error);
    throw new Error('抱歉，我现在无法回应，请稍后再试~');
  }
};
