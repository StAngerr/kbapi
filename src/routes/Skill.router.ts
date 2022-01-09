import {Router} from 'express'

const router = Router();

router.use((req, res, next) => {
    console.log('Skill router logged')
    next()
});


router.get('/', (req, res) => {
    res.send([{id: 'skill 1'}])
})

router.get('/:skillId', (req, res) => {
    res.send(req.params.skillId)
})

router.post('/:skillId', (req, res) => {
    res.send(req.params.skillId)
})

router.put('/:skillId', (req, res) => {
    res.send(`Skill updated ${req.params.skillId}`)
})


export default router;