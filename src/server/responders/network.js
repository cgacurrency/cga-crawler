import _ from "lodash";
import redisFetch from "../helpers/redisFetch";
import tpsCalculator from "../helpers/tpsCalculator";

export default function(app, nano) {
  // nanoNodeMonitor network data
  app.get("/network_data", async (req, res) => {
    try {
      const data = await redisFetch("nanoNodeMonitorPeerData", 10, async () => {
        return [];
      });

      res.json({ network: data });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  app.get("/tps/:period", async (req, res) => {
    try {
      const calc = await tpsCalculator(req.params.period);
      res.json({ tps: calc || 0.0 });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
}
