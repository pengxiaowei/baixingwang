import { Controller, Post, Body, Get, Put, Param, Query, Delete } from '@nestjs/common';
import { SiteModel } from './site.model';
import { CreateSiteDto, SearchSiteDto } from './sites.dto';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { async } from 'rxjs/internal/scheduler/async';

@ApiUseTags('站点')
@Controller('sites')
export class SitesController {
  @Get()
  @ApiOperation({ title: '站点列表' })
  async sites(@Query() query: SearchSiteDto) {
    const where = { keyword: new RegExp(query.keyword) }
    return await SiteModel.find().where({ where }).limit(3).skip(parseInt(query.page) * 3 - 3)
  }

  @Post()
  @ApiOperation({ title: '新建站点' })
  async site(@Body() data: CreateSiteDto) {
    return await SiteModel.create(data)
  }

  @Get(':id')
  @ApiOperation({ title: '站点详情' })
  async getsite(@Param('id') id: String) {
    return await SiteModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({ title: '编辑站点' })
  async update(@Param('id') id: string, @Body() data: CreateSiteDto) {
    return await SiteModel.findByIdAndUpdate(id, data, { new: true })
  }

  @Delete(':id')
  @ApiOperation({ title: '删除站点' })
  async delete(@Param('id') id: string) {
    return await SiteModel.findByIdAndDelete(id)
  }

}

