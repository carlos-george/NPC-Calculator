
export const calculate = (totalPromotors: number, totalDetractors: number, totalAnswers: number) => {

    return Number((((totalPromotors - totalDetractors) / totalAnswers) * 100).toFixed(2));

}
