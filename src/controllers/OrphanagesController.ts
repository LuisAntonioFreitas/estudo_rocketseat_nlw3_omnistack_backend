import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default {

  // GET ALL
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    }); 

    // Status: 200 (Sucesso)
    // return response.status(200).json(orphanages); // sem view
    return response.status(200).json(orphanageView.renderMany(orphanages)); // com view
  },

  // GET ID
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    }); 

    // Status: 200 (Sucesso)
    // return response.status(200).json(orphanage); // sem view
    return response.status(200).json(orphanageView.render(orphanage)); // com view
  },

  // POST
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    // Salvar imagens
    const requestImagens = request.files as Express.Multer.File[];
    const images = requestImagens.map(image => {
      return { path: image.filename }
    })
  
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    // Validar dados
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é um campo obrigatório'),
      latitude: Yup.number().required('Latitude é um campo obrigatório'),
      longitude: Yup.number().required('Longitude é um campo obrigatório'),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });
    
    await schema.validate(data, {
      abortEarly: false
    });

    const orphanage = orphanagesRepository.create(data);
    
    await orphanagesRepository.save(orphanage);
  
    // Status: 201 (Criado com sucesso)
    return response.status(201).json(orphanage);
  }

}