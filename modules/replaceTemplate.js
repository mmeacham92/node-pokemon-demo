module.exports = (temp, object) => {
    let output = temp.replace(/{%FIRST_NAME%}/g, object.first_name);
    output = output.replace(/{%LAST_NAME%}/g, object.last_name);
    output = output.replace(/{%EMAIL%}/g, object.email);
    output = output.replace(/{%GENDER%}/g, object.gender);

    return output;
}