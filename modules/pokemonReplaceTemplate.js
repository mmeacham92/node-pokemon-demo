module.exports = (temp, obj) => {
  let output = temp.replace(/{%IMAGE_URL%}/g, obj.art_url);
  output = output.replace(/{%NAME%}/g, obj.name);
  output = output.replace(/{%DESCRIPTION%}/g, obj.description);
  output = output.replace(/{%ID%}/g, obj.pkdx_id);

  let dexNum = obj.pkdx_id;
  if (dexNum < 10) dexNum = `00${dexNum}`;
  else if (dexNum < 100) dexNum = `0${dexNum}`;
  output = output.replace(/{%POKEDEX%}/g, dexNum);

  if (obj.evolutions.length > 0) {
    const evolutions = obj.evolutions.map((el) => el.to).join('');

    if (!evolutions.includes("mega")) {
      output = output.replace(/{%EVOLUTION%}/g, evolutions);
      output = output.replace(/{%EVOLUTIONID%}/g, obj.pkdx_id + 1);
    } else output = output.replace(/{%NO-EVOLUTION%}/g, "hide");

  } else output = output.replace(/{%NO-EVOLUTION%}/g, "hide");

  const types = obj.types
    .map((el) => `${el[0].toUpperCase()}${el.substr(1, el.length - 1)}`)
    .join(", ");
  output = output.replace(/{%TYPES%}/g, types);

  if (obj.pkdx_id < 151) output = output.replace(/{%NEXT%}/g, obj.pkdx_id + 1);
  if (obj.pkdx_id > 1) output = output.replace(/{%PREVIOUS%}/g, obj.pkdx_id - 1);

  return output;
};
