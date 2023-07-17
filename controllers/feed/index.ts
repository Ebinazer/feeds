import { Router } from 'express'
import { authenticate } from '../../system/helpers/authenticate';
import { createFeed } from './createFeed';
import { updateFeed } from './updateFeed';
import { loadFeeds } from './loadFeeds';
import { deleteFeed } from './deleteFeeds';
import { assignFeedAccess } from './assignFeedAccess';
import { readLogs } from './readLogs';

const router = Router()

router.post("/create-feed", authenticate, createFeed)
router.post("/update-feed", authenticate, updateFeed)
router.get("/load-feed", authenticate, loadFeeds)
router.post("/assign-feed-access", authenticate, assignFeedAccess )
router.delete("/delete-feed/:uuid", authenticate, deleteFeed)
router.get("/read-logs", authenticate, readLogs)

export const feedRouter = router;