import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateAssignmentDTO, GetAssignmentDTO } from './dto/assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './entities/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private assignmentRepository: Repository<AssignmentEntity>,
  ) {}

  async findIfExists(id: number): Promise<AssignmentEntity>{
    const assignment = await this.assignmentRepository.findOneBy({assignmentId : id});
    if(!assignment)
      throw new NotFoundException('Assignment not found!');
    else
      return assignment;
  }
  async create(createAssignment: CreateAssignmentDTO, assignmentFile: Express.Multer.File): Promise<any> {
    createAssignment.assignmentFile = assignmentFile.filename;
    const {course,...response} = await this.assignmentRepository.save(createAssignment);
    return response;
  }

  async getFile(id: number, res) {
    const assignment = await this.findIfExists(id);
    res.sendFile(assignment.assignmentFile, { root: './upload' });
  }

  async findAll(): Promise<any> {
    return await this.assignmentRepository.find();
  }

  async findOne(id: number): Promise<any>{
    const assignment = await this.findIfExists(id);
    const response = await this.assignmentRepository.findOneBy({ assignmentId: id });
    return response;
  }

  async remove(id: number) {
    const assignment = await this.findIfExists(id);
    return await this.assignmentRepository.delete(id);
  }
}
