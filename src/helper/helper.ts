export const splitWords = (text: string): Array<string> => {
  text = text.replace(/(^\s*)|(\s*$)/gi, '') //exclude  start and end white-space
  text = text.replace(/\n/g, ' ')
  text = text.replace(/[ ]{2,}/gi, ' ') //2 or more space to 1
  return text.split(' ').filter((s) => !!s.trim()).map((s) => s.trim()).map((s) => s.replace(/(^[^a-z0-9])|([^a-z0-9]$)/gi, ''))
}

export const splitSentences = (text: string): string[] => {
  const regex = /(?<![A-Z].)[.?!;:\n]\s+/
  let sentences: string[] = text.split(regex);
  sentences.forEach((sentence, index) => {
    sentences[index] = sentence.replace(/(\.|\?|\!)+$/g, '') // Remove trailing punctuation if present
  })
  return sentences;
}

export const countWords = (text: string): number => {
  return splitWords(text).length
}

export const countSentences = (text: string): number => {
  return splitSentences(text).length
}

export const getDensity = (
  text: string,
  keyword: string
): [result: number, keywordFound: number] => {
  const s = splitWords(text)
  if (s.length <= 0 || !keyword) return [0, 0]

  const numOfKeyword = text.match(new RegExp(keyword, 'g'))?.length || 0

  return [Math.round((numOfKeyword * 100) / s.length), numOfKeyword]
}

export const countChar = (str: string): number => {
  return str.trim().length
}

export const wordExists = (
  text: string,
  keyword: string,
  firstNumChar?: number
): boolean => {
  text = text.toLowerCase()
  const arrKeyword = splitWords(keyword.toLowerCase())
  if (firstNumChar) {
    let i = firstNumChar - 1
    while (text[i] && text[i]?.trim()) {
      i++
    }
    return (
      arrKeyword.length > 0 &&
      arrKeyword.every((k) => splitWords(text.slice(0, i)).includes(k))
    )
  }
  return (
    arrKeyword.length > 0 &&
    arrKeyword.every((k) => splitWords(text).includes(k))
  )
}

export const insertText = (
  text: string,
  index: number,
  addText: string
): string => {
  return text.slice(0, index) + addText + text.slice(index)
}

export const removeCharOfString = (
  text: string,
  bottomIndex: number,
  topIndex: number
): string => {
  return text.slice(0, bottomIndex) + text.slice(topIndex + 1)
}

export const countSyllables = (word: string): number => {
  let count: number = 0;
  let vowels: string = "aeiouy"
  word = word.toLowerCase();
  if (vowels.includes(word.charAt(0))) {
    count += 1;
  }
  for (let index = 0; index < word.length; index++) {
    if (vowels.includes(word.charAt(index)) && !vowels.includes(word.charAt(index-1))) {
      count += 1;
    }
  }
  if (word.slice(-1) === "e") {
    count -= 1;
  }
  if (count == 0) {
    count += 1;
  }

  return count;
}

export const longSectionExists = (elements: Array<Element>): boolean => {
  let longSectionExists: boolean = false
  let sectionLength: number = 0

  elements.forEach((element) => {
    if (element.tagName.startsWith('H')) {
      sectionLength = 0
    } else {
      const elementText = element.textContent || ''
      sectionLength += countWords(elementText)
    }
    
    if (sectionLength > 300) {
      longSectionExists = true
    }
  })
  return longSectionExists;
}
