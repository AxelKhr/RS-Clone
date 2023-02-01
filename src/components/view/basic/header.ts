export default function createHeader() {
    const box = document.createElement('header');
    box.classList.add('header');
    const wrapper = document.createElement('div');
    wrapper.classList.add('body__wrapper');
    box.append(wrapper);
    const content = document.createElement('div');
    content.classList.add('header__content');
    wrapper.append(content);
    const title = document.createElement('h1');
    title.textContent = 'RS-Clone';
    content.append(title);
    return box;
}
