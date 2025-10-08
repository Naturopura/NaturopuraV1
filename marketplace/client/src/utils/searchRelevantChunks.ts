export function getRelevantChunks(docs: string, query: string, maxChunks = 2): string[] {
  const chunks = docs.split(/\n(?=## )|(?=#### )|(?=---)/g); // break on sections
  const scored = chunks
    .map(chunk => ({
      chunk,
      score: getScore(chunk, query),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, maxChunks).map((c) => c.chunk.trim());
}

function getScore(text: string, query: string): number {
  return query
    .toLowerCase()
    .split(/\s+/)
    .reduce((acc, word) => acc + (text.toLowerCase().includes(word) ? 1 : 0), 0);
}
