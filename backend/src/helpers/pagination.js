require('dotenv').config();

const pagination = (route, currentPage, count, perPage) => {
    const links = [];

    // Adiciona o link "Anterior" para todas as páginas, exceto para a página 1
    if (currentPage > 1) {
        links.push({
            url: `${process.env.BASE_URL}/${route}?page=${currentPage - 1}`,
            label: '&laquo; Anterior',
            active: false
        });
    }
  
    // Adiciona os links das páginas anteriores à página ativa
    for (let page = 1; page < currentPage; page++) {
        links.push({
            url: `${process.env.BASE_URL}/${route}?page=${page}`,
            label: page.toString(),
            active: false
        });
    }
  
    // Adiciona o link da página ativa
    links.push({
        url: `${process.env.BASE_URL}/${route}?page=${currentPage}`,
        label: currentPage.toString(),
        active: true
    });
  
    // Adiciona os links das páginas posteriores à página ativa
    for (let page = currentPage + 1; page <= Math.ceil(count / perPage); page++) {
        links.push({
            url: `${process.env.BASE_URL}/${route}?page=${page}`,
            label: page.toString(),
            active: false
        });
    }
  
    // Adiciona o link "Próxima" para todas as páginas, exceto para a última página
    if (currentPage < Math.ceil(count / perPage)) {
        links.push({
            url: `${process.env.BASE_URL}/${route}?page=${currentPage + 1}`,
            label: 'Próxima &raquo;',
            active: false
        });
    }

    return links;
};

const paginationInfo = (route, currentPage, count, perPage) => {
    const links = {
        first: `${process.env.BASE_URL}/${route}?page=1`,
        last: `${process.env.BASE_URL}/${route}?page=${Math.ceil(count / perPage)}`,
        prev: currentPage > 1 ? `${process.env.BASE_URL}/${route}?page=${currentPage - 1}` : null,
        next: currentPage < Math.ceil(count / perPage) ? `${process.env.BASE_URL}/${route}?page=${currentPage + 1}` : null
    }

    return links;
};

module.exports = { pagination, paginationInfo };