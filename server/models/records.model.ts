import { Schema, model } from "mongoose";
import Liuren,{LiurenParams} from './../core/liuren/liuren'
import {
  Zhi,
  TianGan as T,
  DiZhi as D,
  GanZhiPair,
  Gan
} from './../core/liuren/GanZhi';

const recordSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    yueJiang:{
      type: String,
      required: true
    },
    hour:{
      type:String,
      required:true
    },
    dayGan:{
      type: String,
      required:true
    },
    dayZhi:{
      type:String,
      required: true
    },
    night:{
      type: Boolean,
      required:true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }  
)

export default model('Record',recordSchema)


/*
const recordSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    yueJiang:{
      type: Zhi,
      required: true
    },
    hour:{
      type:Zhi,
      required:true
    },
    day:{
      type: {
        gan: Gan,
        zhi: Zhi
      },
      required:true
    },
    night:{
      type: Boolean,
      required:true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
*/