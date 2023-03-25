import LifeMatrix from './service/LifeMatrix'

describe('testCases', () => {
    test('Should return correct dynamic LifeMatrix.ts implementation', () => {
        const matrixInitial = new LifeMatrix([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const matrixExpected = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        expect(matrixInitial.nextStep()).toEqual(matrixExpected);
    });
    test('Should return correct static LifeMatrix.ts implementation', () => {
        const matrixInitial = new LifeMatrix([
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const matrixExpected = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        expect(matrixInitial.nextStep()).toEqual(matrixExpected);
    });
    test('Should return correct complex LifeMatrix.ts implementation', () => {
        const matrixInitial = new LifeMatrix([
            [1, 1, 0, 0, 0],
            [0, 1, 0, 0, 1],
            [0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
        ]);
        const matrixExpected = [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0],
        ];
        expect(matrixInitial.nextStep()).toEqual(matrixExpected);
    });
});