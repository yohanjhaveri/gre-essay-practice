export const essayFeedbackAndScore = async (
  type: string,
  prompt: string,
  answer: string
) => {
  return fetch(
    "https://poyl2znryjwl7hdxrhfcxedpke0dpbhc.lambda-url.us-east-1.on.aws",
    {
      method: "POST",
      body: JSON.stringify({
        type,
        prompt,
        answer,
      }),
    }
  ).then((res) => res.json());
};
