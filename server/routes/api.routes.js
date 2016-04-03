import { Router } from 'express';
import * as NoodleController from '../controllers/noodle.controller';
const router = new Router();

// Crawl a new site
router.route('/crawl').post(NoodleController.crawlSite);

// Crawl a new site
router.route('/getPages').get(NoodleController.getPages);

router.route('/search/:query').get(NoodleController.search);

export default router;
