import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    // Status: 400 (Solicitação inválida)
    return response.status(400).json({ message: 'Validation fails', errors });
  }


  console.error(error);

  // Status: 500 (Erro no servidor)
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;