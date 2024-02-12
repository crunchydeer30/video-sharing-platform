import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { JSONSchema } from 'class-validator-jsonschema';

export class PaginationQuery {
  @JSONSchema({
    type: 'integer',
    default: 1,
    description: 'Pagination page'
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  page?: number;

  @JSONSchema({
    type: 'integer',
    default: 50,
    description: 'The number of items to return per page'
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(1000)
  @IsInt()
  per_page?: number;
}

export const buildPaginationQuery = (query: PaginationQuery) => {
  let { page, per_page } = query;

  page = page ? Number(page) : 1;
  per_page = per_page ? Number(per_page) : 50;

  return {
    skip: (page - 1) * per_page,
    take: per_page
  };
};

export const PaginationSchemas = validationMetadatasToSchemas();
