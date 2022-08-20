async function add(req, res) {

    const first = Number(req.body.first);
    const second = Number(req.body.second);

    const sum = first + second;

    try {
        await res.json({ sum });
      } catch (err) {
        res.status(400).json(err);
      }
}



module.exports = {
    add,
  };