export default function queryDOMElement<T extends typeof Element>(
    parent: Document | Element,
    type: T,
    selector: string
): InstanceType<T> {
    const elem = parent.querySelector(selector);
    if (!elem || !(elem instanceof type)) {
        throw new Error(`Error of query selector ${selector}`);
    }
    return elem as InstanceType<T>;
}
