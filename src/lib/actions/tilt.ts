import VanillaTilt, { type HTMLVanillaTiltElement, type TiltOptions } from 'vanilla-tilt';
import type { ActionReturn } from 'svelte/action';

export function tilt(
    node: HTMLElement, 
    options: TiltOptions = {}
): ActionReturn<TiltOptions> {
    
    const defaultOptions: TiltOptions = {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        ...options
    };

    VanillaTilt.init(node, defaultOptions);

    return {
        update(newOptions) {
            (node as HTMLVanillaTiltElement).vanillaTilt.destroy();
            VanillaTilt.init(node, { ...defaultOptions, ...newOptions });
        },
        destroy() {
            (node as HTMLVanillaTiltElement).vanillaTilt.destroy();
        }
    };
}