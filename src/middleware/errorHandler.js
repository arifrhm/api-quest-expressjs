export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function globalErrorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err.type === 'validation') {
    return res.status(422).json({
      detail: err.message
    });
  }

  if (err.type === 'not_found') {
    return res.status(404).json({
      detail: err.message
    });
  }

  res.status(500).json({
    detail: 'Internal server error'
  });
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.type = 'validation';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.type = 'not_found';
  }
}
