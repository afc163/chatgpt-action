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
          const info = "这个改动有点大，这里省略掉。";
          splits.push(`
          此处代码改动如下，你是否有评审建议：
          ${header}\n${info}`);
        } else splits.push(dif);
      }
      return cur;
    });

  return {
    welcomePrompts: [
      `这里有一个标题是 ${title} 的 GitHub pull request，现在假设你是它的代码评审人，可以么？`,
      `接下来我将把 pull request 里的代码改动一条条告诉你。如果代码变化过多，我将省略掉改动内容并告知你。`,
    ],
    diffPrompts: splits,
    endPrompt: `基于以上信息，你能告诉我这个 pull request 存在什么问题吗？有何改动建议？`,
  };
}

module.exports = { genReviewPRPrompt, genReviewPRSplitedPrompt };
