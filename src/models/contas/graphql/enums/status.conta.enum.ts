import { registerEnumType } from '@nestjs/graphql';
import { StatusConta } from '@prisma/client';

registerEnumType(StatusConta, {
  name: 'StatusConta',
  description: 'Status da conta',
});
