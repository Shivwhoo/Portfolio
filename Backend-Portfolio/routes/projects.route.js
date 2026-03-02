import express from 'express'
import {getProjectBySlug,getProjects} from '../controllers/project.controler.js'

const router=express.Router();
router.get('/',getProjects);
router.get('/:slug',getProjectBySlug);

export default router