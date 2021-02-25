import { Router} from 'express'
import * as recordsCtrl from './../controllers/records.controller'
const router = Router()

router.get('/records',recordsCtrl.getRecord)
router.get('/record/:id',recordsCtrl.getRecordById)
router.post('/record',recordsCtrl.createRecord)
router.delete('/record/:id',recordsCtrl.deleteRecordById)


export default router