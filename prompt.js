function genReviewPRPrompt(title, body, diff) {
  const prompt = `你能帮我检查这个 pull request 的改动存在什么问题？如果存在问题，请给我一些改动建议。 
  pull request 的标题是 ${title}，代码变动如下：
  ${diff}`;
  return prompt;
}

function genReviewPRSplitedPrompt(title, body, diff, limit) {
  let splits = [];
  diff
    .split(/(diff --git .+\n)/g)
    .slice(1)
    .reduce((prev, cur, i) => {
      if (i % 2 == 1) {
        let dif = prev + cur;
        if (dif.length > limit) {
          const header = diff.split("\n", 1)[0];
          const info = "这个改动有点大，这里省略掉一些";
          splits.push(`${header}\n${info}`);
        } else splits.push(dif);
      }
      return cur;
    });

  return {
    welcomePrompts: [
      `这是一个 pull request，标题是 ${title}，现在假设你是这个 pull request 的代码评审人。`,
      `现在我将把这个 pull request 里的代码改动一条条告诉你。如果代码改动过多，我将省略掉部分改动并告知你。`,
    ],
    diffPrompts: splits,
    endPrompt: `基于你已知的信息，你能告诉我这个 pull request 里存在什么问题吗？请指出具体的代码并提供改动建议。`,
  };
}

module.exports = { genReviewPRPrompt, genReviewPRSplitedPrompt };
