export const noop = () => { /** NOOP */ };

export type Handler = () => void;

export const isAlphaNumeric = (s: string): boolean => [...s].every(c => {
    const code = c.toLowerCase().charCodeAt(0);
    return (97 <= code && code <= 122);
});

export const positiveMod = (n: number, modulo: number) => ((n % modulo) + modulo) % modulo;

type Listener<Event> = (_: Event) => void;
export class Observer<Event> {
    private listeners: Set<Listener<Event>> = new Set();

    public register = (listener: Listener<Event>) => { this.listeners.add(listener); }

    public unregister = (listener: Listener<Event>) => { this.listeners.delete(listener); }

    public broadcast = (event: Event) => { this.listeners.forEach(listener => listener(event)); }
}