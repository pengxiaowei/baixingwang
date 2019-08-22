import { Controller, Post, Get, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PlanModel } from './plan.model';
import { PlansDto, SearchPlansDto } from './plans.dto';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import axios from 'axios';
// import SC from 'sendcloud'


@ApiUseTags('计划')
@Controller('plans')
export class PlansController {
  @Get('ip')
  async getIp() {
    const res = await axios.get('http://www.baidu.com/s?wd=ip')
    return {
      ip: res.data.match(/(\d+\.\d+\.\d+\.\d+)</).pop()
    }
  }

  @Post('send')
  async sendEmail() {
    // return await SC.send('a@qq.com', '注册', `asdfasdfsadf`)
    return await axios.post('http://api.sendcloud.net/apiv2/mail/send', {
      apiUser: '',
      apiKey: '',
      to: 'aaa@qq.com',
      subject: '欢迎注册',
      html: `<h1>asdfasdf</h1>`
    })
  }

  @Get()
  @ApiOperation({ title: '计划列表' })
  async getPlans(@Query() query: SearchPlansDto) {

    const where = { keyword: new RegExp(query.keyword) }
    // const data = await PlanModel.find().where(where).limit(limit).skip(parseInt(query.page) * limit - limit)
    // console.log(query)
    return await PlanModel.paginate(where, query)
  }

  @Post()
  @ApiOperation({ title: '创建计划' })
  async plan(@Body() data: PlansDto) {
    return await PlanModel.create(data)
  }

  @Get(':id')
  @ApiOperation({ title: '计划详情' })
  async getPlan(@Param('id') id: string) {
    return await PlanModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({ title: '修改计划' })
  async update(@Param('id') id: string, @Body() data: PlansDto) {
    return await PlanModel.findByIdAndUpdate(id, data, { new: true })
  }

  @Delete(':id')
  @ApiOperation({ title: '删除计划' })
  async delete(@Param('id') id: string) {
    return await PlanModel.findByIdAndDelete(id)
  }

  @Put(':id/stop')
  @ApiOperation({ title: '停止计划' })
  async stop(@Param('id') id: string) {
    return await PlanModel.findByIdAndUpdate(id, { status: 0 }, { new: true })
  }

  @Put(':id/startup')
  @ApiOperation({ title: '启用计划' })
  async startUp(@Param('id') id: string) {
    return await PlanModel.findByIdAndUpdate(id, { status: 1 }, { new: true })
  }

  
}
