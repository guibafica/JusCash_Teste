export function getValidationErrors(err: unknown) {
  const validationErrors = {};

  // @ts-expect-error type error
  err.inner.forEach((error) => {
    // @ts-expect-error type error
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
