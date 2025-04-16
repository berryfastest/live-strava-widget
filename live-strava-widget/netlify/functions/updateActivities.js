const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const newActivity = JSON.parse(event.body);
  const filePath = path.join(__dirname, "../../data/activities.json");

  let activities = [];
  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, "utf-8");
    activities = JSON.parse(file);
  }

  activities.unshift(newActivity);
  activities = activities.slice(0, 5);

  fs.writeFileSync(filePath, JSON.stringify(activities, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Activity added" }),
  };
};