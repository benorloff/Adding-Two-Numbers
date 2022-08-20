async function add(req, res) {
    console.log(req.body, "<-- req.body from calculate ctrl")

    const first = Number(req.body.first);
    const second = Number(req.body.second);

    const sum = first + second;
    console.log(sum, '<-- sum')

    try {
        await res.json({ sum });
      } catch (err) {
        res.status(400).json(err);
      }
}



module.exports = {
    add,
  };