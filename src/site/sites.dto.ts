import { ApiModelProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";


export class CreateSiteDto {
  @ApiModelProperty({ description: '网址链接', example: 'http://mjfc123.mvp.baixing.com' })
  @Matches(/^http/, { message: 'url不正确' })
  url: string
}

export class SearchSiteDto {
  @ApiModelProperty({ required: false })
  page?: string

  @ApiModelProperty({ required: false })
  keyword?: string
}