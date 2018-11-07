import _ from "lodash";
import redisFetch from "../../helpers/redisFetch";
import { processBlock, getTimestampForHash } from "../../helpers/util";

export default function(app, nano) {
  app.get("/block/:hash", async (req, res) => {
    try {
      const block = await redisFetch(
        `block/v4/${req.params.hash}`,
        2592000,
        async () => {
          const blocks = (await nano.rpc("blocks_info", {
            hashes: [req.params.hash],
            pending: true,
            source: true
          })).blocks;

          let block = blocks[req.params.hash];
          block.timestamp = await getTimestampForHash(req.params.hash);
          return await processBlock(req.params.hash, block);
        }
      );

      res.json(block);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  app.get("/blocks/active", async (req, res) => {
    try {
      const data = await redisFetch("confirmation_active", 5, async () => {
        const hashes = (await nano.rpc("confirmation_active")).confirmations;
        if (hashes === "") return [];

        let hydratedData = [];
        for (let i = 0; i < hashes.length; i++) {
          const info = await nano.rpc("confirmation_info", {
            root: hashes[i],
            contents: false
          });

          if (!info.error) hydratedData.push(info);
        }

        return hydratedData;
      });

      res.json({ blocks: data });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  app.get("/block/:hash/confirmation", async (req, res) => {
    try {
      const data = nano.rpc("confirmation_info", {
        root: req.params.hash,
        contents: false,
        representatives: true
      });

      res.json(data);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  app.get("/block_count", async (req, res) => {
    try {
      const blockCount = await redisFetch("blockCount", 10, async () => {
        return await nano.blocks.count();
      });

      res.json({ blockCount });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  app.get("/block_count_by_type", async (req, res) => {
    try {
      const blockCount = await redisFetch("blockCountByType", 10, async () => {
        return await nano.blocks.count(true);
      });

      res.json(blockCount);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
}
