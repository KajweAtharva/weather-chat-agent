export const sendMessageToWeatherAgent = async (
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  const response = await fetch(
    'https://brief-thousands-sunset-9fcb1c78-485f-4967-ac042759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream',
    {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'x-mastra-dev-playground': 'true',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        runId: 'weatherAgent',
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId: '2022200060',
        resourceId: 'weatherAgent',
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get response from weather agent');
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('No response body');
  }

  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'text-delta' && data.textDelta) {
            fullText += data.textDelta;
            onChunk(fullText);
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
};