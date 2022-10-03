export const safeValue = (envVariable: string) => {
  return envVariable === 'undefined' ? undefined : envVariable;
};
