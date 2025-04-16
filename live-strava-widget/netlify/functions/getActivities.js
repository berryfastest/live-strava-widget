const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  const filePath = path.join(__dirname, "../../data/activities.json");

  let activities = [];
  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, "utf-8");
    activities = JSON.parse(file);
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(activities),
  };
};