import { isElement } from './guards';

/**
 * Convert a given string of markup to an HTMLElement.
 * @param str The string to convert to an HTMLElement.
 * @returns HTMLElement
 */
export const str2el = (str: string): Element => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.firstChild as Element;
};

/**
 * Assign an attribute to an element -- regardless of key conformance.
 * @param el The element to which the named attribute will be assigned.
 * @param attrib The name of the attribute to be assigned.
 * @param value The value of the attribubte to be assigned.
 */
export const assignAttrib = (
  el: HTMLElement,
  attrib: string,
  value: string
): void => {
  el.setAttributeNode(
    <Attr>(
      (<Attr>(
        str2el(`<div ${attrib}="${value}"></div>`).getAttributeNode(attrib)
      )).cloneNode(true)
    )
  );
};

/**
 * Convert a NamedNodeMap or Element's attributes into a keyed object.
 * @param attribsOrElement The named node map or Element from which to build the output object.
 * @returns Object
 */
export const attribs2obj = (
  attribsOrElement: NamedNodeMap | HTMLElement
): Object => {
  let attribs = attribsOrElement;
  if (isElement(attribsOrElement)) {
    attribs = attribsOrElement.attributes;
  }
  // TODO: fix this when typescript can support it
  return [...(<any>attribs)].reduce(
    (acc, cur) => Object.assign(acc, { [cur.name]: cur.value }),
    {}
  );
};

/**
 * Given a prefix, remove any class names which match.
 * @param target The element on which to modify classes, a string of class names, or an array of class names.
 * @param prefix The prefixed class to drop from the element.
 * @returns HTMLElement | Array<string> | string
 */
export const rmPrefixedClass = (
  target: string | Array<string> | HTMLElement,
  prefix: string
): HTMLElement | Array<string> | string => {
  let classes = target;
  if (isElement(classes)) classes = [...classes.classList];
  if (Array.isArray(classes)) classes = classes.join(' ');
  const regex = new RegExp(
    `((^${prefix}[^\\s]+$)|(\\s${prefix}[^\\s]+\\s)|(^${prefix}[^\\s]+\\s)|(\\s${prefix}[^\\s]+$))`,
    'gi'
  );

  const replaced = classes.replace(regex, ' ');

  return isElement(target)
    ? (target.setAttribute('class', replaced), target)
    : Array.isArray(target)
    ? replaced.split(' ')
    : replaced;
};

/**
 * Shorthand for target.addEventListener()
 * @param el The element to which the event listener is attached
 * @param event The key of the event for which to listen.
 * @param fn The function to call on event firing.
 */
export const listen = (
  el: Element,
  event: keyof HTMLElementEventMap,
  fn: Function
): void => {
  el.addEventListener(event, (e) => fn(e));
};
