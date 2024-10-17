/**
 * @description 객체에서 조건에 부합하는 key를 반환합니다.
 *
 * @param obj - 검색하고자 하는 객체입니다.
 * @param condition - 검색하고자 하는 조건입니다.
 * @returns {string | undefined} - 검색하고자 하는 조건에 부합하는 key를 반환합니다. 만약 조건에 부합하는 key가 없다면 undefined를 반환합니다.
 *
 * @example
 *
 * const obj = {
 *   bike: { active: true },
 *   plane: { active: true },
 *   car: { active: false },
 * };
 *
 *  findKey(obj, (item) => item.active); // 'bike'
 */

export function findKey<T extends Record<PropertyKey, any>>(
  obj: T,
  condition: (value: T[keyof T]) => boolean,
) {
  const keys = Object.keys(obj);
  
  for (const key of keys) {
    const value = obj[key];

    if (condition(value)) {
      return key;
    }
  }

  return undefined;
}
