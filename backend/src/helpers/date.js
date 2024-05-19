//formata date format d/m/Y H:m to iso date
const formatDate = (date) => {
    const inputDateParts = date.split(" ");
    const dateParts = inputDateParts[0].split("/");
    const timeParts = inputDateParts[1].split(":");
    const outputDate = new Date(Date.parse(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts.join(":")}`));
    const isoDate = outputDate.toISOString();
    return isoDate;
};

//verifica se é uma data iso
const isIso = (date) => {
    const d = new Date(date);
    return !Number.isNaN(d.valueOf()) && d.toISOString() === date;
};

//verifica se é um valor válido
const checkIsDate = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
    return regex.test(date);
};


module.exports = { formatDate, isIso, checkIsDate };