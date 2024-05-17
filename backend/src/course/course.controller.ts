import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/course.dto';
import { CourseEntity } from './entities/course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCourseDto: CreateCourseDTO): Promise<CourseEntity> {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll(): Promise<any> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }
}

