export const noop = () => { /** NOOP */ };

export type Handler = () => void;

export const isAlphaNumeric = (s: string): boolean => [...s].every(c => {
    const code = c.toLowerCase().charCodeAt(0);
    return (97 <= code && code <= 122);
});

export const positiveMod = (n: number, modulo: number) => ((n % modulo) + modulo) % modulo;

export interface Observer<Event> {
    observe: (fn: (_: Event) => void) => void;
}

export interface ReifiedFunction<T extends Function> {
    fn: T;
}