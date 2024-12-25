import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFieldRequired(
  schema: z.ZodObject<any>,
  fieldName: string
): boolean {
  const fieldParts = fieldName.split(".");
  let currentSchema: any = schema;

  for (let i = 0; i < fieldParts.length; i++) {
    const part = fieldParts[i];
    if (!(part in currentSchema.shape)) {
      throw new Error(`Field "${fieldName}" does not exist in the schema.`);
    }
    currentSchema = currentSchema.shape[part];

    // If we're at the last part, check if it's required
    if (i === fieldParts.length - 1) {
      if (currentSchema instanceof z.ZodOptional) {
        return false;
      }
      if (currentSchema instanceof z.ZodDefault) {
        return false;
      }
      if (currentSchema instanceof z.ZodUnion) {
        return !currentSchema._def.options.some(
          (option: z.ZodTypeAny) =>
            option instanceof z.ZodUndefined || option instanceof z.ZodNull
        );
      }
      return true;
    }

    // If it's not the last part, it should be an object
    if (!(currentSchema instanceof z.ZodObject)) {
      throw new Error(`Field "${fieldName}" is not a valid nested field.`);
    }
  }

  // This line should never be reached
  throw new Error(`Unexpected error checking field "${fieldName}"`);
}

export function snakeToNormalText(snakeStr: string) {
  return snakeStr
    .toLowerCase() // Convert the entire string to lowercase
    .split("_") // Split by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with a space
}

export const toTitleCase = (text: string) => {
  const smallWords = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "if",
    "in",
    "of",
    "on",
    "or",
    "the",
    "to",
    "via",
    "with",
  ]);

  return text
    .split(" ")
    .map((word, index, array) => {
      // If the word is already in all caps (like CPA), preserve it
      if (word === word.toUpperCase()) {
        return word;
      }

      const lowerWord = word.toLowerCase();

      if (
        // Always capitalize the first and last word
        index === 0 ||
        index === array.length - 1 ||
        // Don't capitalize small words
        !smallWords.has(lowerWord)
      ) {
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
      }
      return lowerWord;
    })
    .join(" ");
};

export function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function kebabToNormal(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
