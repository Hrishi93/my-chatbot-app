import { IamAuthenticator } from 'ibm-watson/auth';
import AssistantV2 from 'ibm-watson/assistant/v2';

const assistant = new AssistantV2({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: 'jXpMSg8ZtAfE0fHwCfGt1SNbcLXgJ8k5nW56bL3Lou0G', // Replace with your actual API key
  }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/38975403-23eb-448a-a181-add70cec2d66', // Replace with your actual URL
});

let sessionId = null;

export const createSession = async () => {
  if (!sessionId) {
    const session = await assistant.createSession({ assistantId: 'YOUR_ASSISTANT_ID' }); // Replace with your Assistant ID
    sessionId = session.result.session_id;
  }
  return sessionId;
};

export const sendMessage = async (message) => {
  await createSession();
  const response = await assistant.message({
    assistantId: 'YOUR_ASSISTANT_ID', // Replace with your Assistant ID
    sessionId: sessionId,
    input: {
      'message_type': 'text',
      'text': message,
    },
  });
  return response.result.output.generic;
};
