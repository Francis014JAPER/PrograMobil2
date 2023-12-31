import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Alumno} from '../models';
import {AlumnoRepository} from '../repositories';

export class AlumnoControllerController {
  constructor(
    @repository(AlumnoRepository)
    public alumnoRepository : AlumnoRepository,
  ) {}

  @post('/alumnos')
  @response(200, {
    description: 'Alumno model instance',
    content: {'application/json': {schema: getModelSchemaRef(Alumno)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, {
            title: 'NewAlumno',
            exclude: ['idAlumno'],
          }),
        },
      },
    })
    alumno: Omit<Alumno, 'idAlumno'>,
  ): Promise<Alumno> {
    return this.alumnoRepository.create(alumno);
  }

  @get('/alumnos/count')
  @response(200, {
    description: 'Alumno model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Alumno) where?: Where<Alumno>,
  ): Promise<Count> {
    return this.alumnoRepository.count(where);
  }

  @get('/alumnos')
  @response(200, {
    description: 'Array of Alumno model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Alumno, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Alumno) filter?: Filter<Alumno>,
  ): Promise<Alumno[]> {
    return this.alumnoRepository.find(filter);
  }

  @patch('/alumnos')
  @response(200, {
    description: 'Alumno PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, {partial: true}),
        },
      },
    })
    alumno: Alumno,
    @param.where(Alumno) where?: Where<Alumno>,
  ): Promise<Count> {
    return this.alumnoRepository.updateAll(alumno, where);
  }

  @get('/alumnos/{id}')
  @response(200, {
    description: 'Alumno model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Alumno, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Alumno, {exclude: 'where'}) filter?: FilterExcludingWhere<Alumno>
  ): Promise<Alumno> {
    return this.alumnoRepository.findById(id, filter);
  }

  @patch('/alumnos/{id}')
  @response(204, {
    description: 'Alumno PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, {partial: true}),
        },
      },
    })
    alumno: Alumno,
  ): Promise<void> {
    await this.alumnoRepository.updateById(id, alumno);
  }

  @put('/alumnos/{id}')
  @response(204, {
    description: 'Alumno PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() alumno: Alumno,
  ): Promise<void> {
    await this.alumnoRepository.replaceById(id, alumno);
  }

  @del('/alumnos/{id}')
  @response(204, {
    description: 'Alumno DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alumnoRepository.deleteById(id);
  }
}
