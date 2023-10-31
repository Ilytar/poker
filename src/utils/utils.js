export function isEqualArrays(arr1, arr2) {
    // Проверяем, являются ли arr1 и arr2 массивами
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return false;
    }

    // Проверяем, имеют ли arr1 и arr2 одинаковую длину
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Проверяем, равны ли элементы arr1 и arr2 по индексу
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    // Если все проверки пройдены, то arr1 и arr2 равны
    return true;
}
