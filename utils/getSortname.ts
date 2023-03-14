/**
 * Used for converting the sorter name format.
 * @param name *{string}
 * @returns 
 */

export const getSorterName = (name: string): string => {
    const splitName = name.split(' ');
    let newName = '';
    for (let index = 0; index < splitName.length; index++) {
        const element = splitName[index];
        if (splitName.length - 1 === index) {
            newName += ' ' + element;
        } else {
            let charSys = newName === '' ? '' : '.';
            newName += charSys + element.charAt(0).toUpperCase();

        }
    }

    return newName;
}