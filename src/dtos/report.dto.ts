/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from '../data';
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class ResponseReportDto {
    id: string;
    source: string;
    amount: number;

    @Expose({name: 'createdAt'})
    transformCreatedAt(){
      return this.create_at;
    }

    @Exclude()
    create_at: Date;

    @Exclude()
    update_at: Date;
    type: ReportType;


    constructor(partial: Partial<ResponseReportDto>){
      Object.assign(this, partial);
    }
}