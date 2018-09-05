var fs = require("fs");
var dd = `{
    "name": "AAisha",
    "id": 52,
    "address": { "city": "Delhi", "country": "India" }
  }`;

fs.readFileSync("../data/file.json", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  fs.writeFileSync("../data/temp.json", JSON.stringify(data));
  //   console.log(js);
});
