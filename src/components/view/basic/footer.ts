export default function createFooter() {
    const box = document.createElement('footer');
    box.classList.add('footer');
    const wrapper = document.createElement('div');
    wrapper.classList.add('body__wrapper');
    box.append(wrapper);
    const content = document.createElement('div');
    content.classList.add('footer__content');
    wrapper.append(content);
    content.textContent = 'Footer';
    return box;
}
