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
  )
    .then((res) => res.json())
    .then((data) => {
      const grade = data.content;

      const split = grade
        .split("\n")
        .map((s: string) => s.trim())
        .filter((s: string) => s);

      const regex = /[0-6]/;
      const score = split[0].match(regex) || split[0].match(/NS/);
      const feedback = split[1];

      console.log({ score, feedback });

      return { score, feedback };
    });
};
