export const weatherConditionKeyGenerator = (
  conditionDescription: string
): string => {
  const words = conditionDescription.split(" ");

  const processedWords = words.map((word, index) => {
    if (word.length > 0) {
      return index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  const key = processedWords.join("");

  return key;
};
