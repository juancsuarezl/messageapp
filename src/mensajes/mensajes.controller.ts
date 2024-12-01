import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';
import { Mensaje } from './entities/mensaje.entity';

@Controller('mensajes')
export class MensajesController {

    constructor(private mensajesService: MensajesService){

    }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response): Promise<any>{
        return this.mensajesService.createMensaje(createMensajeDto)
        .then(
            mensaje => { response.status(HttpStatus.CREATED).json(mensaje)
        })
        .catch( () => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ mensaje: 'Ocurrió un error al intentar crear el mensaje'})
        })
    }

    @Get()
    getAll(@Res() response): Promise<any>{
        return this.mensajesService.getAll()
        .then( mensajesList => {
            response.status(HttpStatus.OK).json(mensajesList);
        })
        .catch( () => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ mensaje: 'Error al obtener la lista de mensajes'})
        })
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje):Promise<any>{ 
        return this.mensajesService.updateMensaje(idMensaje, updateMensajeDto)
        .then( mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        })
        .catch( () => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ mensaje: 'Ocurrió un error al intentar actualizar el mensaje'})
        })
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje):Promise<any>{
        return this.mensajesService.deleteMensaje(idMensaje)
        .then( res => {
            response.status(HttpStatus.OK).json({ res: 'Mensaje eliminado correctamente'})
        })
        .catch( () => {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ mensaje: 'Ocurrió un error al intentar eliminar el mensaje'})
        })
    }

}
