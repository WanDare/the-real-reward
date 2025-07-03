export const withBasePath = (path: string) =>
  `${process.env.NODE_ENV === "production" ? "/the-real-reward" : ""}${path}`;
