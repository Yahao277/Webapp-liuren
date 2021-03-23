import { Response, RequestHandler } from "express";
import Record from './../models/records.model';
import {ObjectId} from 'mongoose'

export const getRecord: RequestHandler = async (req, res) => {
  try {
    const data = req.body
    const record = await Record.find()

    return res.json({result:record});
  } catch (error) {
    return res.json({message:error});
  }
};

export const getRecordById : RequestHandler = async (req,res) => {
  try{
    const id = req.params.id
    const record = await Record.findById(id)

    return res.json({result:record})
  }catch(e){
    return res.json({message:e})
  }

}

/**
 * 
 * @param req verify the body has next fields:
 * example:
 *  {
    "title": "Today",
    "description": "today",
    "yueJiang": "亥",
    "hour": "子",
    "dayZhi": "寅",
    "dayGan": "壬",
    "night": true 
    }
 * @param res 
 */
export const createRecord: RequestHandler = async (req,res) => {
  const {title, description, yueJiang,hour,dayZhi,dayGan,night } = req.body;
  //TODO: verification data fields
  try{
    const record = await new Record({
      title,
      description,
      yueJiang,
      hour,
      dayZhi,
      dayGan,
      night
    })

    const saved = await record.save()

    return res.status(200).json({message:'Record created',_id:saved._id})
  }catch(error){ 
    return res.status(500).json({message:error})
  }
}

export const deleteRecordById: RequestHandler  = async (req,res) => {
  
  try{
    const id = req.params.id
    const record = await Record.findByIdAndRemove(id)

    return res.json({result:record})
  }catch(e){
    return res.json({message:e})
  }
}
