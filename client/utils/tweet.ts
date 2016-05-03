export function tweetTextParse(text: string) {
  const linedText = text.split('\n');
  return linedText.reduce((text, line) => {
    let strArr;
    const url = /(https:\/\/[\x21-\x7e]+)/gi;
    let execResult = url.exec(line);
    const execArr = [];
    if (execResult) {
      execArr.push(execResult);
      let execBool;
      while (true) {
        execBool = url.exec(line);
        if (!execBool) break;
        execArr.push(execBool);
      };
      const link = execResult[0];
      strArr = execArr.map((execItem, index) => {
        const bool = index === 0 ? true : false;
        return new TweetText({ text: line, link: true, linkUrl: execItem[0], index: execItem.index, appendText: bool });
      })
    } else {
      const flatHtml = line.split(/(.{20})/).filter(text => text.length > 0).map(text => new TweetText({ text }));
      strArr = flatHtml;
    }
    return [].concat(text, strArr);
  }, []);
}

function TweetText({ link = false, text, linkUrl = '', index = 0, appendText = false }) {
  this.link = link;
  this.text = text;
  this.linkUrl = linkUrl;
  this.index = index;
  this.appendText = appendText;
}