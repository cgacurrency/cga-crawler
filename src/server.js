import os from 'os'

import { Nano } from 'nanode'
import express from 'express'
import cors from 'cors'

import redisFetch from './server/redisFetch'
import config from '../server-config.json'

const nano = new Nano({ url: config.nodeHost })

const app = express();
app.use(cors())

app.get('/', (req, res) => {
  res.send("Hello, world!")
});

app.get('/account', async (req, res) => {
  res.json({ account: config.account })
});

app.get('/weight', async (req, res) => {
  const weight = await redisFetch('weight', 300, async () => {
    return nano.convert.fromRaw(await nano.accounts.weight(config.account), 'mrai')
  })

  res.json({ weight });
});

app.get('/block_count', async (req, res) => {
  const blockCount = await redisFetch('blockCount', 10, async () => {
    return await nano.blocks.count();
  })

  res.json({ blockCount });
})

app.get('/version', async (req, res) => {
  const version = await redisFetch('version', 3600, async () => {
    return await nano.rpc('version');
  })

  res.json(version);
});

app.get('/delegators_count', async (req, res) => {
  const delegatorsCount = await redisFetch('delegatorsCount', 300, async () => {
    return await nano.rpc('delegators_count', { account: config.account });
  })

  res.json(delegatorsCount);
});

app.get('/balance', async (req, res) => {
  const balances = await redisFetch('balance', 300, async () => {
    const resp = await nano.rpc('account_balance', { account: config.account })
    return {
      balance: nano.convert.fromRaw(resp.balance, 'mrai'),
      pending: nano.convert.fromRaw(resp.pending, 'mrai')
    }
  });

  res.json(balances);
});

app.get('/history', async (req, res) => {
  const history = await redisFetch('history', 60, async () => {
    const resp = await nano.accounts.history(config.account);
    return resp.map(block => {
      if (block.amount) {
        block.amount = nano.convert.fromRaw(block.amount, 'mrai');
      }

      return block;
    })
  });

  res.json(history);
});

app.get('/system_info', async (req, res) => {
  res.json({
    uptime: os.uptime(),
    loadAvg: os.loadavg(),
    memory: {
      free: os.freemem(),
      total: os.totalmem()
    }
  });
});

app.listen(3001);
