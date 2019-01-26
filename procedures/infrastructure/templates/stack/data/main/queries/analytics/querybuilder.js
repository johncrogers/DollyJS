const { writeFileSync } = require("fs");

let colors = [
  '["White","Blue","Black","Red","Green"]',
  '["Blue"]',
  '["White","Black","Green"]',
  '["White","Red","Green"]',
  '["Green"]',
  '["White","Green"]',
  '["Black","Red","Green"]',
  '["White","Black","Red","Green"]',
  '["White","Blue","Black","Green"]',
  '["White","Red"]',
  '["White"]',
  '["White","Blue","Green"]',
  '["Blue","Red"]',
  '["White","Blue"]',
  '["White","Blue","Red"]',
  '["White","Blue","Black"]',
  '["Black"]',
  '["Blue","Black","Red","Green"]',
  '["White","Black","Red"]',
  '["Blue","Black","Green"]',
  '["White","Black"]',
  '["Blue","Black"]',
  '["Red","Green"]',
  '["Black","Green"]',
  '["Black","Red"]',
  '["Blue","Black","Red"]',
  '["White","Blue","Red","Green"]',
  '["Blue","Green"]',
  '["Red"]',
  '["White","Blue","Black","Red"]',
  '["Blue","Red","Green"]',
  "Colorless"
];
function parseColorLine(line) {
  let result;
  line = line.split('","');
  if (line.length === 1 && line[0] !== "Colorless") {
    let singleColor = line[0].split('["')[1];
    singleColor = singleColor.split('"]')[0];
    result = [singleColor];
  } else if (line.length > 1) {
    result = line;
    result[0] = result[0].split('["')[1];
    result[result.length - 1] = result[result.length - 1].split('"]')[0];
  } else {
    result = line;
  }
  return result;
}

let statement = "";
for (let line of colors) {
  let parsedColors = parseColorLine(line);
  if (parsedColors.length) {
    let colorTag = parsedColors.join("_").toLowerCase();
    statement += `SUM(CASE WHEN colors='${line}' THEN card ELSE NULL END) AS ${colorTag},\n`;
  }
}
writeFileSync("colorCounts.sql", statement);
