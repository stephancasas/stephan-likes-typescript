/**
 * Test whether a given string matches as a URL.
 * @param str The string to check for URL characteristics.
 * @returns boolean
 */
export const isUrl = (str: string): boolean =>
  str.substr(0, 5).includes('http') || str.substr(0, 10).includes('/');

/**
 * Test whether a given HTMLElement has a given named attribute.
 * @param el The element on which to verify attribute presence.
 * @param attr The attribute name fow which to test.
 * @returns boolean
 */
export const hasAttr = (el: HTMLElement, attr: string): boolean =>
  [...el.attributes].map((attrib) => attrib.name).includes(attr);

/**
 * Test whether a given object is an HTMLElement of any or a specific type.
 * @param arg The object to test as an element
 * @param type The type of element for which to test.
 * @returns boolean
 */
export const isElement = (arg: any, type: string = ''): arg is HTMLElement =>
  // TODO: the type guard on this is incomplete
  !!Object.getPrototypeOf(arg)
    .toString()
    .match(!!type ? new RegExp(`HTML${type}Element`, 'gi') : /HTML.*Element/);
