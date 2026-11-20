/** Section id from an exercise id such as "1.3.4" or "1.3.4" part cards that share that prefix. */
export const secOf = (id: string) => id.split(".").slice(0, 2).join(".");
