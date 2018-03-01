module.exports = function getZerosCount(number, base) {
    // your implementation
    var k,
        zeroCount,
        powerOfEachMultiplier = [],
        multipliers = [2, 3, 5, 7],
        countOfMultiplier,
        multipliersCount = new Map(),
        countOfCurrentMultiplier,
        baseMultipliers,
        computeMultipliers;
    
    computeMultipliers = function (base, arrayOfBaseMultipliers, baseMultipliers) {
        var initialValue = base,
            remainder;

        for (var i = 0; i < arrayOfBaseMultipliers.length; i++) {
            remainder = base % arrayOfBaseMultipliers[i];
            if (remainder === 0) {
                baseMultipliers.push(arrayOfBaseMultipliers[i]);
                base = base / arrayOfBaseMultipliers[i];
                return computeMultipliers(base, arrayOfBaseMultipliers, baseMultipliers);//рекурсия
            }
        }

        if (initialValue === base && initialValue !== 1) {
            baseMultipliers.push(initialValue);
        }

        return baseMultipliers;
    };

    //находим множители base
    baseMultipliers = computeMultipliers(base, multipliers, []);

    //считаем, сколько каждый множитель встречается в полученном массиве множителей base
    for (var i = 0; i < multipliers.length; i++) {
        countOfMultiplier = 0;

        for (var j = 0; j < baseMultipliers.length; j++) {
            if (multipliers[i] === baseMultipliers[j]) {
                countOfMultiplier++;
            }
        }

        if (countOfMultiplier !== 0) {
            multipliersCount.set(multipliers[i], countOfMultiplier);
        }
    }

    //вычисляем силу каждого множителя с учетом его количества
    for (var i = 0; i < baseMultipliers.length; i++) {
        zeroCount = 0;
        k = 1;

        while (Math.pow(baseMultipliers[i], k) <= number) {
            zeroCount = zeroCount + parseInt(number / Math.pow(baseMultipliers[i], k));
            k++;
        }

        countOfCurrentMultiplier = multipliersCount.get(baseMultipliers[i]);
        if (countOfCurrentMultiplier >= 2) {
            zeroCount = parseInt(zeroCount/countOfCurrentMultiplier);
        }

        powerOfEachMultiplier.push(zeroCount);
    }

    //сортируем и возвращаем наименьшую силу
    return powerOfEachMultiplier.sort((a, b) => a-b)[0];
}