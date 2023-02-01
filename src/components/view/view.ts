import queryDOMElement from '../utils/queryDOMElement';
import createHeader from './basic/header';
import createMain from './basic/main';
import createFooter from './basic/footer';

function createView() {
    const body = queryDOMElement(document, HTMLBodyElement, 'body');
    const header = createHeader();
    header.classList.add('body__block');
    const main = createMain();
    main.classList.add('body__block');
    const footer = createFooter();
    footer.classList.add('body__block');
    body.append(header, main, footer);
}

export default createView;
