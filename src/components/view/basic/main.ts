export default function createMain() {
    const box = document.createElement('main');
    box.classList.add('main');
    const wrapper = document.createElement('div');
    wrapper.classList.add('body__wrapper');
    box.append(wrapper);
    const content = document.createElement('div');
    content.classList.add('main__content');
    wrapper.append(content);
    content.textContent = 'Content';
    return box;
}
