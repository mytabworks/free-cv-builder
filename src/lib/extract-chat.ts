export function extractChat(inputString: string) {
  const regex = /```json([\s\S]*?)```/; // Regex to match content between ```json and ```
  const match = inputString.match(regex); // Execute the regex on the input string

  if (match && match[1]) {
      return match[1].trim(); // Return the extracted data, trimming whitespace
  } else {
      return null; // Return null if no match is found
  }
}