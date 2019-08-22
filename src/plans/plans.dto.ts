import { ApiProduces, ApiModelProperty } from "@nestjs/swagger";
import { MinLength, Matches, IsInt } from "class-validator"
import { Transform } from 'class-transformer'

export class PlansDto {
  @ApiModelProperty({ description: '网址链接', example: 'http://mjfc123.mvp.baixing.com' })
  @Matches(/^http/, { message: 'url不正确' })
  url: string

  @ApiModelProperty({ description: '关键词', example: '银行贷款' })
  @MinLength(2, { message: '关键词太短' })
  keyword: string

  @ApiModelProperty({ description: '平台', example: 'pc' })
  platform: string

}

export class SearchPlansDto {
  @ApiModelProperty({ required: false })
  keyword?: string

  @ApiModelProperty({ required: false, default: 1 })
  @Transform(val => parseInt(val, 10)) //字符串转数字
  page: number = 1

  @ApiModelProperty({ required: false, default: 10 })
  @Transform(val => parseInt(val, 10))
  limit?: number = 10
}