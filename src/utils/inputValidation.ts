/**
 * Validates user input for length and possible security issues (like control characters or scripts).
 *
 * @param text - Raw user input text
 * @returns A validation error message if invalid, or null if valid
 */
export function validateTextInput(text: string): string | null {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return "Please enter some text before checking.";
  }

  if (trimmed.length < 3) {
    return "Your message is too short to check.";
  }

  if (trimmed.length > 300) {
    return "Your message is too long. Please limit it to 300 characters.";
  }

  // Check for harmful scripts
  const scriptPattern = /<script.*?>|<\/script>|javascript:/i;
  if (scriptPattern.test(trimmed)) {
    return "Invalid input.";
  }

  // Check for control characters
  const controlCharPattern = new RegExp("[\\\\x00-\\\\x1F\\\\x7F-\\\\x9F]");
  if (controlCharPattern.test(trimmed)) {
    return "Invalid input.";
  }

  return null; // valid input
}
