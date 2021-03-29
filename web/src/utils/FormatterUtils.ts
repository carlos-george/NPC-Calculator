import { toPattern } from 'vanilla-masker'

export const unMask = (value: any) => value.replace(/\W/g, '');

const masker = (value: any, pattern: any, options: any) =>
    toPattern(value, { pattern, ...options });

const multimasker = (value: any, patterns: any[], options: any) =>
    masker(
        value,
        patterns.reduce(
            (memo, pattern) => (value.length <= unMask(memo).length ? memo : pattern),
            patterns[0]
        ),
        options
    );

export const mask = (value: any, pattern: any, options?: any) =>
    typeof pattern === 'string'
        ? masker(value, pattern || '', options)
        : multimasker(value, pattern, options);

