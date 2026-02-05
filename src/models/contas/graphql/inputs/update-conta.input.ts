import { IsEnum, IsOptional } from 'class-validator';
import { StatusConta } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AtualizarContaInput {
  @Field(() => StatusConta, {
    nullable: true,
    description: 'Status da conta'
  })
  @IsEnum(StatusConta)
  @IsOptional()
  status?: StatusConta;
}
