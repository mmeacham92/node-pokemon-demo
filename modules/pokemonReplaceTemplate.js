module.exports = (temp, obj) => {
    let output = temp.replace(/{%IMAGE_URL%}/g, obj.art_url);
    output = output.replace(/{%NAME%}/g, obj.name);
    output = output.replace(/{%DESCRIPTION%}/g, obj.description);
    
    if (obj.evolutions.length > 0) {
        const array = obj.evolutions.map(el => el.to);
        const evolutions = array.join(', ');
        output = output.replace(/{%EVOLUTION%}/g, evolutions);
    }
    else output = output.replace(/{%NO-EVOLUTION%}/g, 'no-evolution');
    
    return output;
}